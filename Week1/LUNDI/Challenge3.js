let person = {
  'firstname' : "ahmed",
  "lastname" : "ahmed",
  'age': 25,
  'ville': 'agadir',
  'email':'ahmed@email.com'
}

console.log(`my name is ${person.firstname} ${person.lastname}, my age is ${person.age}, I live in ${person.ville}, my email is ${person.email}`)


person.ville = 'casa'
person.tl = 325481210
console.log(person)