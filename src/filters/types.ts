export interface LooseObject {
  [key: string]: any
}

export interface ExceptionObject {
  getStatus(): number
}

export interface LooseExceptionsObject extends LooseObject, ExceptionObject {}
