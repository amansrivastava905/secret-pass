export type CommonResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};
