export interface serverResponse {
  status: number;
  success: string;
  items: object[];
  itemCount:number;
  user:object[]
  token: string;
  message: string;
}
