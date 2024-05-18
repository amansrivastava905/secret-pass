'use server';

import { db } from '@/lib/db';
import { encrypt } from '@/lib/encryption';
import { CommonResponse } from '@/types/common';
import { Secret } from '@prisma/client';

export const generateSecret = async (
  message: string,
  password: string,
): Promise<CommonResponse<string | null>> => {
  try {
    const encryptedMessage = await encrypt(message, password);

    const record = await db.secret.create({
      data: {
        isProtected: password.length > 0,
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
      data: null,
      error: errorObj.message,
    };
  }
};

export const fetchSecret = async (
  id: string,
): Promise<CommonResponse<Secret | null>> => {
  try {
    const secret = await db.secret.findFirst({
      where: {
        id: id,
        isRead: false,
      },
    });
    return {
      success: true,
      data: secret,
    };
  } catch (error: any) {
    const errorObj = new Error(error.message || 'Something went wrong');
    return {
      success: false,
      data: null,
      error: errorObj.message,
    };
  }
};

export const expireSecret = async (
  id: string,
): Promise<CommonResponse<string | null>> => {
  try {
    await db.secret.update({
      where: {
        id: id,
      },
      data: {
        isRead: true,
      },
    });
    console.log('Record with ID: ' + id + ' read and hence expired now');
    return {
      success: true,
      data: 'Successfully expired secret',
    };
  } catch (error: any) {
    const errorObj = new Error(error.message || 'Something went wrong');
    return {
      success: false,
      data: null,
      error: errorObj.message,
    };
  }
};
