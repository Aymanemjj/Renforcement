let songs = [
  
  {
    titre:    "Bohemian Rhapsody",
    artiste: "Queen",
    duree:   354,
    genre:   "Rock"
  },
  
  {
    titre:    "Blinding Lights",
    artiste: "The Weeknd",
    duree:   200,
    genre:   "Pop"
  },
  
  {
    titre:    "Lose Yourself",
    artiste: "Eminem",
    duree:   326,
    genre:   "Hip-Hop"
  },
  
  {
    titre:    "Levitating",
    artiste: "Dua Lipa",
    duree:   203,
    genre:   "Pop"
  },
  
  {
    titre:    "Hotel California",
    artiste: "Eagles",
    duree:   391,
    genre:   "Rock"
  },
  
  {
    titre:    "Bad Guy",
    artiste: "Billie Eilish",
    duree:   194,
    genre:   "Electropop"
  },
  
  {
    titre:    "Smells Like Teen Spirit",
    artiste: "Nirvana",
    duree:   301,
    genre:   "Grunge"
  },
  
  {
    titre:    "Shape of You",
    artiste: "Ed Sheeran",
    duree:   234,
    genre:   "Pop"
  },
  
  {
    titre:    "Superstition",
    artiste: "Stevie Wonder",
    duree:   245,
    genre:   "Funk"
  },
  
  {
    titre:    "HUMBLE.",
    artiste: "Kendrick Lamar",
    duree:   177,
    genre:   "Hip-Hop"
  }
];
songs.forEach(e=>{
  console.log("title: " + e.titre)
})
let total = 0
songs.forEach(e=>{
  total += e.duree
})

songs.sort((a,b)=>{
  return a.duree - b.duree
})

let plusLong = songs[songs.length-1]
console.log("\n","longest song: ", plusLong, "\n")

let minutes = true;
songs.forEach(e=>{
  if(e.duree> 360){
    console.log('this song is longer than 6 minutes: ', e, "\n")
    minutes = false
  }
})

if(minutes){
  console.log("all songs are under 6 minutes", "\n")
}



let jazz = true;
songs.forEach(e=>{
  if(e.genre == "Jazz"){
    console.log('this song is Jazz: ', e, "\n")
    jazz = false
  }
})

if(jazz){
  console.log("no song is of the genre Jazz", "\n")
}

let rock = songs.filter((e)=>{return e.genre == "Rock"})
console.log("Rock songs: " ,rock, "\n")

let formated = []
songs.forEach(e=>{
  let temp = `${e.duree %60}`
  if(temp.length < 2){
    temp=temp + '0'
  }
  e.duree = `${Math.floor(e.duree/60)}` + ':' + temp
  //e.duree = e.duree.slice(0,4)
  
  formated.push(e)
})

console.log("time formated playlist: ", formated, "\n")





  let temp = `${total%60}`
  if(temp.length < 2){
    temp=temp + '0'
  }
  total = `${Math.floor(total/60)}` + ':' + temp

  console.log("total playtime: ", total, "\n")
