import { Field } from "./field";
import { BinaryOperation } from "./group";

export type VectorSpace<V, F extends Field<any>> = {
    set: V[];
    field: F
  
    adition: BinaryOperation<V>
    scalarMultiplication: (a: F extends Field<infer T> ? T : never, v: V) => V
  }
  