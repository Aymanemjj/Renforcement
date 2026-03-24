const equipes = [
    { nom: "FC Barcelone", points: 70, buts_pour: 1, buts_contre: 28, matchs_joues: 28 },
    { nom: "Real Madrid", points: 70, buts_pour: 68, buts_contre: 31, matchs_joues: 28 },
    { nom: "Bayern Munich", points: 51, buts_pour: 61, buts_contre: 35, matchs_joues: 28 },
    { nom: "PSG", points: 48, buts_pour: 57, buts_contre: 29, matchs_joues: 28 },
    { nom: "AC Milan", points: 70, buts_pour: 44, buts_contre: 38, matchs_joues: 28 },
    { nom: "Ajax", points: 35, buts_pour: 39, buts_contre: 47, matchs_joues: 28 },
    { nom: "Porto", points: 28, buts_pour: 31, buts_contre: 55, matchs_joues: 28 },
    { nom: "Celtic", points: 19, buts_pour: 22, buts_contre: 68, matchs_joues: 28 },
];

let goalDifference = []
equipes.forEach(e => {
    goalDifference.push({
        nom: e.nom,
        buts_pour: e.buts_pour,
        buts_contre: e.buts_contre,
        difference: e.buts_pour - e.buts_contre
    })
})
console.log(goalDifference)
function order(equipes) {
    let orderd = equipes.toSorted((a, b) => {
        let points = b.points - a.points
        let goal = b.buts_pour - a.buts_pour
        return points || goal
    })
    return orderd
}

classement(order(equipes))

function classement(orderd) {
    let i = 1
    orderd.forEach(e => {
        console.log(`${i}.${e.nom}__${e.points} pts (diff: ${e.buts_pour - e.buts_contre})`)
        i++
    })
}
match(equipes[1], equipes[2], 2, 3)
match(equipes[4], equipes[1], 1, 1)
match(equipes[5], equipes[3], 3, 1)
match(equipes[7], equipes[6], 2, 0)
match(equipes[7], equipes[0], 2, 7)

function match(e1, e2, s1, s2) {
    e1.buts_pour += s1
    e1.buts_contre += s2

    e2.buts_pour += s2
    e2.buts_contre += s1

    if (s1 > s2) {
        e1.points += 3
    } else if (s2 > s1) {
        e2.points += 3
    } else {
        e1.points += 1
        e2.points += 1
    }

}
console.log("\n")
classement(order(equipes))

