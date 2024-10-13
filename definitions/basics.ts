type UnaryOperation<T> = (s: T) => T
type BinaryOperation<T> = (s: T, t: T) => T
type Map<T, U> = (t: T) => U; 

export {
    UnaryOperation,
    BinaryOperation,
    Map,
}