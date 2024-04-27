import { BinaryOperation } from "./group"

type Field<F> = {
  addition: BinaryOperation<F>
  subtraction: BinaryOperation<F>
  multiplication: BinaryOperation<F>
  division: BinaryOperation<F>
}

type GaloisField<F> = Field<F> & { set: F[] }
type FinitFieild<F> = GaloisField<F>

export {
  Field,
  FinitFieild,
}