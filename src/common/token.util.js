import jwt from 'jsonwebtoken';

const secret = 'b3f84d67f22c4200bf99f23f4db6db681a3fd3a4edccaa6bc21f83b7aa520527';

export class GenerateTokenError extends Error {}
export class CheckTokenError extends Error {}

export const generateToken = user => new Promise((resolve, reject) => {
  jwt.sign({ userId: user.id, userRole: user.role }, secret, { expiresIn: 3600 }, (error, token) => {
    if (error) {
      reject(new GenerateTokenError());
    } else {
      resolve(token);
    }
  });
});

export const checkToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, secret, (error, payload) => {
    if (error) {
      reject(new CheckTokenError());
    } else {
      resolve(payload);
    }
  })
});
