import { Group } from "./groups"

const Z6 = new Group([1, 2, 3, 4, 5, 0], (x, y) => (x + y) % 6)

console.log(Z6 + '')