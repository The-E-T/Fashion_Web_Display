import type { RequestHandler } from './$types';
import dresses from '$lib/dress.json';
import fs from 'fs/promises';
import path from 'path';
import { error, json } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';
import type { Dress } from '$lib/dressTemplate';

// Path to your dresses JSON file
const dressesJsonPath = path.resolve('src/lib/dress.json');
// Path to static images folder where dress images are stored
const imagesFolder = path.resolve('static/dress_img/');

function saveDressesFile(dressesData: Dress[]): Promise<void> {
  return fs.writeFile(dressesJsonPath, JSON.stringify(dressesData, null, 2), 'utf-8');
}

// Helper to check admin cookie
function isAdmin(cookies: Cookies): boolean {
  return !!cookies.get('admin');
}

// Utility to delete files safely
async function deleteFileIfExists(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath);
  } catch (e: any) {
    if (e.code !== 'ENOENT') throw e; // ignore if file doesn't exist
  }
}

// Handler for updating a dress, including images
export const POST: RequestHandler = async ({ request, params, cookies }) => {
  if (!isAdmin(cookies)) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dressId = Number(params.id);
  const formData = await request.formData();

  // Find dress index
  const dressIndex = dresses.findIndex((d: Dress) => d.id === dressId);
  if (dressIndex === -1) {
    return json({ error: 'Dress not found' }, { status: 404 });
  }

  // Parse updated dress data (expect JSON string)
  const dressDataString = formData.get('dress');
  if (typeof dressDataString !== 'string') {
    return json({ error: 'Invalid dress data' }, { status: 400 });
  }

  let updatedDress: Dress;
  try {
    updatedDress = JSON.parse(dressDataString) as Dress;
  } catch {
    return json({ error: 'Invalid JSON for dress data' }, { status: 400 });
  }

  // Handle new image uploads
  const newImages: string[] = [];
  for (const file of formData.getAll('newImages')) {
    if (file instanceof File) {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(imagesFolder, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      newImages.push(`/dress_img/${fileName}`); // public path for img src
    }
  }

  // Remove images that were removed by user
  const oldImages: string[] = dresses[dressIndex].images ?? [];
  const remainingImages: string[] = updatedDress.images ?? [];

  for (const oldImg of oldImages) {
    if (!remainingImages.includes(oldImg)) {
      const oldImgFileName = path.basename(oldImg);
      const oldImgPath = path.join(imagesFolder, oldImgFileName);
      await deleteFileIfExists(oldImgPath);
    }
  }

  // Merge images
  updatedDress.images = [...remainingImages, ...newImages];

  // Update dress in array
  dresses[dressIndex] = updatedDress;

  // Save file
  await saveDressesFile(dresses);

  return json({ success: true, dress: updatedDress });
};

// Handler for deleting a dress and its images
export const DELETE: RequestHandler = async ({ params, cookies }) => {
  if (!isAdmin(cookies)) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dressId = Number(params.id);
  const dressIndex = dresses.findIndex((d: Dress) => d.id === dressId);

  if (dressIndex === -1) {
    return json({ error: 'Dress not found' }, { status: 404 });
  }

  const dressToDelete = dresses[dressIndex];

  // Delete images from disk
  for (const img of dressToDelete.images ?? []) {
    const fileName = path.basename(img);
    const filePath = path.join(imagesFolder, fileName);
    await deleteFileIfExists(filePath);
  }

  // Remove dress from array
  dresses.splice(dressIndex, 1);

  // Save file
  await saveDressesFile(dresses);

  return json({ success: true });
};
