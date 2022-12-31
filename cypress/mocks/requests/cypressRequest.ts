export interface CypressRequest<T> {
  alias:string;
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  response: CypressBody<T>;
  expectedBody?: unknown;
}
export interface CypressBody<T> {
  statusCode: number;
  body: T;
}