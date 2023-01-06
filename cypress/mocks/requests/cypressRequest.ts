export interface CypressRequest<responseType, expectedBodyType = unknown> {
  alias:string;
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  response: CypressBody<responseType>;
  expectedBody?: expectedBodyType;
}
export interface CypressBody<T> {
  statusCode: number;
  body: T;
}