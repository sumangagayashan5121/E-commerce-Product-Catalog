export interface IResponse<T> {
  status: boolean;
  message: string | null;
  data: T;
}
