let table = [12, 8, 15, 6, 18, 9, 14];

let total = 0;
let above = 0
table.forEach(e=>{
  total+=e
  if(e>=10){
    above++
  }
})

for(let i =0; i<table.length; i++){
  for(let y = i+1; y<=table.length; y++){
    if(table[i]<table[y]){
      let temp = table[y];
      table[y] = table[i];
      table[i]= temp
    }
    
  }
}

let moyen = total/table.length
let bigger = table[0]
let smallest= table[table.length-1]
console.log(`total: ${total}
\nabove or equale to 10: ${above}
\nmoyen:${moyen}
\nbiggest:${bigger}
\nsmallest:${smallest}`)