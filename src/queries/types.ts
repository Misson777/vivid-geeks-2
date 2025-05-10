export type ActionResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};
