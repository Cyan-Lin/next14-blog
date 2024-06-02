type BaseResponse<T> = {
  status: string;
  message: string;
  data?: T;
};

export type { BaseResponse };
