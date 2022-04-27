import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const iv = randomBytes(16);
// Password used to generate key
const password = 'wzc520pyf';

// The key length is dependent on the algorithm.
// In this case for aes256, it is 32 bytes.
const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
// const key = promisify(scrypt)(password, 'salt', 32) as unknown as Buffer;
// const cipher = createCipheriv('aes-256-ctr', key, iv);

// const textToEncrypt = 'Nest';
// const encryptedText = Buffer.concat([
//   cipher.update(textToEncrypt),
//   cipher.final(),
// ]);

@Injectable()
export class CryptoUtil {
  // 加密
  encryptPassword(password: string): string {
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedPassword = Buffer.concat([
      cipher.update(password),
      cipher.final(),
    ]);
    return encryptedPassword.toString('hex');
  }
  // 解密
  decryptPassword(password: string): string {
    const decipher = createCipheriv('aes-256-ctr', key, iv);
    const decryptedPassword = Buffer.concat([
      decipher.update(Buffer.from(password, 'hex')),
      decipher.final(),
    ]);
    return decryptedPassword.toString();
  }
}
