const contacts = [
  {
    nom:        "Sophie Martin",
    entreprise: "TechVision",
    email:      "s.martin@techvision.fr",
    telephone:  "+33 6 12 34 56 78",
    ville:      "Paris",
    adresse: {
      rue:         "14 avenue des Champs-Élysées",
      code_postal: "75008",
      ville:       "Paris",
      pays:        "France"
    }
  },
  {
    nom:        "Karim Benali",
    entreprise: "DataFlow",
    email:      "k.benali@dataflow.io",
    telephone:  "+33 6 98 76 54 32",
    ville:      "Lyon",
    adresse: {
      rue:         "3 rue de la République",
      code_postal: "69002",
      ville:       "Lyon",
      pays:        "France"
    }
  },
  {
    nom:        "Clara Dupont",
    entreprise: "GreenSpark",
    email:      "c.dupont@greenspark.fr",
    telephone:  "+33 7 45 23 89 10",
    ville:      "Bordeaux",
    adresse: {
      rue:         "27 cours Victor Hugo",
      code_postal: "33000",
      ville:       "Bordeaux",
      pays:        "France"
    }
  },
  {
    nom:        "Lucas Weber",
    entreprise: "AlphaCode",
    email:      "l.weber@alphacode.de",
    telephone:  "+49 151 234 567 89",
    ville:      "Berlin",
    adresse: {
      rue:         "Unter den Linden 22",
      code_postal: "10117",
      ville:       "Berlin",
      pays:        "Allemagne"
    }
  },
  {
    nom:        "Amina Rhouti",
    entreprise: "NovaMed",
    email:      "a.rhouti@novamed.ma",
    telephone:  "+212 6 61 23 45 67",
    ville:      "Casablanca",
    adresse: {
      rue:         "Boulevard Anfa 58",
      code_postal: "20050",
      ville:       "Casablanca",
      pays:        "Maroc"
    }
  },
  {
    nom:        "James O'Brien",
    entreprise: "FinEdge",
    email:      "j.obrien@finedge.co.uk",
    telephone:  "+44 7911 123456",
    ville:      "Paris",
    adresse: {
      rue:         "10 Canary Wharf",
      code_postal: "E14 5AB",
      ville:       "Paris",
      pays:        "France"
    }
  }
];


contacts.forEach(e=>{
  console.log(e.nom, e.ville)
})

let contactsPerCity = []

function check(ville) {
    return contactsPerCity.filter(a => {
        return a.ville == ville
    })
}
function indexOfCity(ville) {
    let city = contactsPerCity.filter(a => {
        return a.ville == ville
    })
    return contactsPerCity.indexOf(city[0])
}
contacts.forEach(e => {
    let city = check(e.ville)
    if (city.length == 0) {
        contactsPerCity.push({ ville: e.ville, contacts:[]})
    }
    index = indexOfCity(e.ville)
    contactsPerCity[index]['contacts'].push( {
      nom: e.nom, 
      entreprise: e.entreprise,
      email: e.email,
      telephone: e.telephone
    })
})
console.log(JSON.stringify(contactsPerCity))


console.log(contacts.filter(a=>{
  return a.entreprise == "NovaMed"
}))



contacts[0].adresse = {
        rue: 'Green hill',
      code_postal: '101',
      ville: 'Casablanca',
      pays: 'Maroc'
}

console.log(contacts[0])

contacts.forEach(e=>{
  e["dernierContact"] = "date"
})
