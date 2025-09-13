type TokenData = {
  email: string;
  expires: number;
};

const tokens: Record<string, TokenData> = {};

export function storeToken(token: string, email: string, expires: number) {
  tokens[token] = { email, expires };
}

export function verifyToken(token: string): string | null {
  const data = tokens[token];
  if (!data) return null;
  if (Date.now() > data.expires) {
    delete tokens[token];
    return null;
  }
  return data.email;
}
