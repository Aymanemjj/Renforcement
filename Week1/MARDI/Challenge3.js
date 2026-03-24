const avis = [
  { pseudo: "CuisinierFou",    note: 5, commentaire: "Recette parfaite, toute la famille a adoré !",          date: "2024-01-03" },
  { pseudo: "Marie_B",         note: 4, commentaire: "Très bonne recette, j'ai juste réduit le sucre.",        date: "2024-01-17" },
  { pseudo: "TopChef92",       note: 5, commentaire: "Incroyable, je la refais chaque semaine.",               date: "2024-02-05" },
  { pseudo: "Lulu34",          note: 2, commentaire: "Trop salé à mon goût, pas convaincue.",                  date: "2024-02-19" },
  { pseudo: "GourmetParis",    note: 4, commentaire: "Facile à réaliser et délicieux.",                        date: "2024-03-08" },
  { pseudo: "NoviceCuisine",   note: 3, commentaire: "Correcte mais manque un peu de saveur.",                 date: "2024-03-22" },
  { pseudo: "ChefAmateur",     note: 5, commentaire: "Les instructions sont claires et le résultat bluffant.", date: "2024-04-11" },
  { pseudo: "Isa_Cook",        note: 1, commentaire: "Recette ratée, les temps de cuisson sont faux.",         date: "2024-04-28" },
  { pseudo: "PapaMiamMiam",    note: 4, commentaire: "Mes enfants ont tout dévoré, merci !",                   date: "2024-05-06" },
  { pseudo: "ZenKitchen",      note: 5, commentaire: "Un délice, je recommande vivement.",                     date: "2024-05-20" },
  { pseudo: "Critique123",     note: 2, commentaire: "Décevant, rien de spécial par rapport à d'autres.",      date: "2024-06-03" },
  { pseudo: "BonVivant77",     note: 4, commentaire: "Très bon plat, j'ai ajouté du citron c'est top.",        date: "2024-06-18" },
  { pseudo: "CookingWithLove", note: 5, commentaire: "Magnifique recette, digne d'un restaurant.",             date: "2024-07-02" },
  { pseudo: "Miette_d_or",     note: 3, commentaire: "Sympa mais un peu longue à préparer.",                   date: "2024-07-15" },
  { pseudo: "FoodieNantes",    note: 4, commentaire: "Très satisfait, je la partage à tous mes amis.",         date: "2024-08-01" },
];


let noteMoyen = 0
avis.forEach(e=>{
    noteMoyen+= e.note
})
noteMoyen= Math.round((noteMoyen/avis.length)*10)/10
console.log("Note moyen:", noteMoyen, "\n")

let starCount=[0,0,0,0,0,0]
avis.forEach(e=>{
  starCount[e.note]++
})
for(let i=0;i<starCount.length;i++){
  console.log(`${i} stars count: ${starCount[i]}`)
}

let positive = avis.filter((a)=>{
  return a.note >= 4
})
let negative = avis.filter((a)=>{
  return a.note <= 2
})
let normal = avis.filter((a)=>{
  return a.note <= 2 && a.note >= 4
})

console.log(`positives: `, positive, "\n")
console.log('negatives: ', negative, "\n")

let sortedByComments = avis.toSorted((a,b)=>{
  return a.commentaire.length - b.commentaire.length
})

let longestComment = sortedByComments[sortedByComments.length-1]
console.log("longest comment is:", longestComment)

console.log(`${noteMoyen}/5 basé sure ${avis.length} avis -- ${positive.length} positive, ${negative.length} negative, ${normal.length} neutre`)


