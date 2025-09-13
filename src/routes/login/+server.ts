// src/routes/api/send-magic-link/+server.ts
import { storeToken } from '$lib/magicLinkStore';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';
import type { RequestEvent } from '@sveltejs/kit';
import { ADMIN_EMAIL, REDIRECT_EMAIL, REDIRECT_PASSWORD }from '$env/static/private';

export const POST = async ({ request }: RequestEvent) => {
  const { email } = await request.json();

  // Only allow specific emails
  const allowedEmails = [ADMIN_EMAIL];
  if (!allowedEmails.includes(email)) {
    return new Response('Forbidden', { status: 403 });
  }

  // Generate a token valid for 24 hours
  const token = randomBytes(32).toString('hex');
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  storeToken(token, email, expires);

  const link = `http://localhost:5173/auth?token=${token}`;

  // Create transporter for sending email (example: Gmail)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
      user: REDIRECT_EMAIL,       // your email
      pass: REDIRECT_PASSWORD,          // Gmail App Password
    },
  });

  // Send the email
  await transporter.sendMail({
    from: '"My App" <your.email@gmail.com>',
    to: email,
    subject: 'Your Magic Login Link',
    text: `Click this link to login: ${link}`,
    html: `<p>Click this link to login: <a href="${link}">${link}</a></p>`
  });

  return new Response('Magic link sent to your email.');
};
