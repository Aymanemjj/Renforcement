let table = [{
  'name': 'milk',
  'quantiry': 5,
  'price_per_unit': 1
},{
  'name': 'carrot',
  'quantiry': 7,
  'price_per_unit': 1.2
},{
  'name': 'cookie',
  'quantiry': 1,
  'price_per_unit': 9
},{
  'name': 'laptop',
  'quantiry': 1,
  'price_per_unit': 100
},{
  'name': 'phone',
  'quantiry': 2,
  'price_per_unit': 14
}]
let total = 0
table.forEach(e=>{
  console.log(`${e.name} x${e.quantiry} = ${e.quantiry*e.price_per_unit}$`)
  total += e.quantiry*e.price_per_unit
})

console.log(`sub total is ${total}, total = ${total*1.2}`)