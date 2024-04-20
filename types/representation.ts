import { BinaryOperation } from "./group"

type Field<F> = {
  set: F[]

  addition: BinaryOperation<F>
  subtraction: BinaryOperation<F>
  multiplication: BinaryOperation<F>
  division: BinaryOperation<F>
}

type Matrix<F extends Field<any>> = F extends Field<infer T> ? T[][] : never

export {
  Field,
  Matrix,
}