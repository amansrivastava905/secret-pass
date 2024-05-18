export type GenerateSecretResponseType =
  | {
      success: true;
      data: string;
    }
  | {
      success: false;
      error: string;
    };
