let table = [{
  'firstname' : "ahmed",
  "lastname" : "ahmed",
  'age': 25,
  'moyen':10
},{
  'firstname' : "hmza",
  "lastname" : "hmza",
  'age': 47,
  'moyen':14
},{
  'firstname' : "mohamed",
  "lastname" : "mohamed",
  'age': 27,
  'moyen':15
},{
  'firstname' : "goku",
  "lastname" : "goku",
  'age': 58,
  'moyen':100
},{
  'firstname' : "vegeta",
  "lastname" : "vegeta",
  'age': 20,
  'moyen':17
},{
  'firstname' : "sonic",
  "lastname" : "sonic",
  'age': 14,
  'moyen':8
},]

table.forEach(e=>{
  if(e.moyen >= 12){
    console.log(`${e.firstname} ${e.lastname} ${e.age} ${e.moyen}`)
  }
})

table.sort((a,b)=>{
  return a.age - b.age
})
console.log(table)

let person = table.find((e)=>{return e.firstname == 'sonic'})

if(!person){
  person = 'Étudiant non trouvé'
}
console.log(person)