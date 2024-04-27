const finiteFieldArithmetic = (m: number) => {
  return {
    add: (a: number, b: number) => (a + b) % m,
    sub: (a: number, b: number) => (a - b) % m + m,
    mul: (a: number, b: number) => (a * b) % m,
    div: (a: number, b: number) => void 0,
    mul_inv: multiplicativeInverse(m)
  }
}

/** x.n + m.y = 1, gcd(n, x) = 1, x = ? */
const multiplicativeInverse = (m: number) => (n: number): number | undefined => {
  if (n === 1) return 1;
  if (gcd(m, n) !== 1) return undefined;

  // simple forms
  const sForms = form(m, n)
  // mixed forms
  let mForms: Record<string, string> = {}

  let { a, b, q, r } = abqr(m, n)
  while (r !== 1) {
    mForms = {
      ...mForms,
      ...form(b, r)
    }

      ; ({ b, r } = abqr(b, r));
  }
  const factorRegexp = /([-\d]*)\*([\d]*)/g // -3*21+5*34 -> [-3*21,5*34]
  Object.entries(mForms)
    .sort(([r1], [r2]) => parseInt(r2) - parseInt(r1))
    .forEach(([r, a_qb]) => {
      Object.entries(sForms)
        .forEach(([search, replace]) => {
          a_qb = a_qb
            .replace(new RegExp(`\\*${search}`), `*(${replace})`)
        })

      a_qb = a_qb.replace(/(-?[\d]*)\*\(([^()]*)\)/g, (_, coef, factors) => {
        coef = parseInt(coef)
        factors = factors.match(factorRegexp).map(f => f.split('*').map(s => parseInt(s)))
        const sign = n => Math.sign(n) > 0 ? '+' : '';
        let s = factors.map(([a, x]) => `${sign(a * coef)}${a * coef}*${x}`).join('')
        if (s.charAt(0) === '+') s = s.slice(1)
        return s
      })
      sForms[r] = a_qb
    })

  console.assert(eval(sForms['1']) === 1, 'should be 1 but found ' + eval(sForms['1']))
  const res = sForms['1'].match(factorRegexp)!.map(f => f.split('*').map(s => parseInt(s)))
    .reduce((acc, [a, x]) => {
      if (acc[x] !== undefined) {
        acc[x] = acc[x] + a
        return acc;
      }
      acc[x] = a;
      return acc;
    }, {})
  console.assert(res[n] * n + res[m] * m === 1, 'not satisfied')
  const x = res[n]
  return x < 0 ? x + m : x;
}

const gcd = (a: number, b: number) => {
  return a === 0 ? b : gcd(b % a, a);
}

/** [r, a - q.b] */
const form = (a: number, b: number) => {
  const { q, r } = abqr(a, b)

  return { [String(r)]: `1*${a}-${q}*${b}` };
}

/** a = b.q + r */
const abqr = (a: number, b: number) => {
  const q = Math.floor(a / b)
  const r = a % b;
  return { a, b, q, r }
}

/** a = b.q + r */
// const abqr = (s) => {
//   const reg = /([\d]) = ([\d])\.([\d]) \+ ([\d])/;
//   const [_, a, b, q, r] = [...reg.exec(s)!]
//   return {a,b,q,r}
// }

export {
  finiteFieldArithmetic,
  gcd,
}