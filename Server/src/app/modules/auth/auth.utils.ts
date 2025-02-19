import jwt from 'jsonwebtoken';

export const createToken = (
  payload: Record<string, unknown>,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
}; 

