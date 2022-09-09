export enum NodeEnvTypes {
  DEVELOPMENT = 'DEVELOPMENT',
  TEST = 'TEST',
  PRODUCTION = 'PRODUCTION',
}

export enum MethodTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface LooseObject {
  [key: string]: any
}

export interface ExceptionObject {
  getStatus(): number
}

export interface RequestObject {
  method: MethodTypes,
  originalUrl: string;
}

export interface LooseExceptionsObject extends LooseObject, ExceptionObject {}
export interface LooseRequestObject extends LooseObject, RequestObject {}

export default NodeEnvTypes;
