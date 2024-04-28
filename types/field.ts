import { BinaryOperation } from "./group"

type Field<F> = {
  add: BinaryOperation<F>
  sub: BinaryOperation<F>
  mul: BinaryOperation<F>
  div: BinaryOperation<F>
}

type GaloisField<F> = Field<F> & { set: F[] }
type FinitFieild<F> = GaloisField<F>

export {
  Field,
  FinitFieild,
}