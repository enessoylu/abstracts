import { BinaryOperation } from "./basics"
/** 
For a given field (𝐹,+,×) , these statements hold true:
@example
(A0)   Closure under addition                  ∀𝑥,𝑦∈𝐹: 𝑥+𝑦∈𝐹
(A1)   Associativity of addition               ∀𝑥,𝑦,𝑧∈𝐹: (𝑥+𝑦)+𝑧=𝑥+(𝑦+𝑧)
(A2)   Commutativity of addition               ∀𝑥,𝑦∈𝐹: 𝑥+𝑦=𝑦+𝑥
(A3)   Identity element for addition           ∃0∈𝐹:∀𝑥∈𝐹: 𝑥+0=𝑥=0+𝑥 0 is called the zero
(A4)   Inverse elements for addition           ∀𝑥∈𝐹:∃𝑥′∈𝐹: 𝑥+𝑥′=0=𝑥′+𝑥 𝑥′ is called a negative element
(M0)   Closure under product                   ∀𝑥,𝑦∈𝐹: 𝑥×𝑦∈𝐹
(M1)   Associativity of product                ∀𝑥,𝑦,𝑧∈𝐹: (𝑥×𝑦)×𝑧=𝑥×(𝑦×𝑧)
(M2)   Commutativity of product                ∀𝑥,𝑦∈𝐹: 𝑥×𝑦=𝑦×𝑥
(M3)   Identity element for product            ∃1∈𝐹,1≠0:∀𝑥∈𝐹: 𝑥×1=𝑥=1×𝑥 1 is called the unity
(M4)   Inverse elements for product            ∀𝑥∈𝐹∗:∃𝑥−1∈𝐹∗: 𝑥×𝑥−1=1=𝑥−1×𝑥
(D)    Product is distributive over addition   ∀𝑥,𝑦,𝑧∈𝐹: 𝑥×(𝑦+𝑧)=(𝑥×𝑦)+(𝑥×𝑧)

@see {@link https://proofwiki.org/wiki/Axiom:Field_Axioms|source}
 */
type Field<F> = {
  add: BinaryOperation<F>
  sub: BinaryOperation<F>
  mul: BinaryOperation<F>
  div: BinaryOperation<F>
}

type GaloisField<F> = Field<F> & { set: F[] }
/**  A field with a finite number of members  */
type FinitFieild<F> = GaloisField<F>

export {
  Field,
  FinitFieild,
}
