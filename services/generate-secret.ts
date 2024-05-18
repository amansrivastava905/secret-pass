'use server';

import { db } from '@/lib/db';
import { encrypt } from '@/lib/encryption';
import { GenerateSecretResponseType } from '@/types/generate-secret-response';

export const generateSecret = async (
  message: string,
  password: string,
): Promise<GenerateSecretResponseType> => {
  try {
    console.log(message, password);
    const encryptedMessage = await encrypt(message, password);

    const record = await db.secret.create({
      data: {
        encryptedMessage: encryptedMessage,
      },
    });

    const secretLink = `${process.env.BASE_URL}/view/${record.id}`;

    return {
      success: true,
      data: secretLink,
    };
  } catch (error: any) {
    const errorObj = new Error(error.message || 'Something went wrong');
    return {
      success: false,
      error: errorObj.message,
    };
  }
};
