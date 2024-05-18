'use server';

import crypto from 'crypto';

// Generate a random Initialization Vector
const generateIV = () => {
  return crypto.randomBytes(16);
};

// Encrypt a message with provided password
export const encrypt = async (message: string, password: string) => {
  // generate IV
  const iv = generateIV();

  // create a key from password
  const key = crypto
    .createHash('sha256')
    .update(password)
    .digest('base64')
    .substring(0, 32);

  // create a cypher instance with key & iv
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  // encrypt the message
  let encrypted = cipher.update(message, 'utf8', 'hex');

  // finalise the encryption
  encrypted += cipher.final('hex');

  // return encrypted message concatenated with IV
  return iv.toString('hex') + ':' + encrypted;
};

// Decrypt an encrypted message with provided password
export const decrypt = async (
  encryptedMessage: string,
  password: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    // split IV and encrypted message
    const [ivHex, encrypted] = encryptedMessage.split(':');

    // convert IV back to buffer
    const iv = Buffer.from(ivHex, 'hex');

    // create the same key from password which was used to encrypt the message
    const key = crypto
      .createHash('sha256')
      .update(password)
      .digest('base64')
      .substring(0, 32);

    // create a decypher instance with key and iv
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    // decrypt the encrypted message
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');

    // finalise decryption
    decrypted += decipher.final('utf8');

    return {
      success: true,
      message: decrypted,
    };
  } catch (error: any) {
    const errorObj = new Error(
      error.message ?? 'Invalid Password / Corrupted Data',
    );

    return {
      success: false,
      message: errorObj.message,
    };
  }
};
