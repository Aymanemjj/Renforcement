
const reservations = [
    { id: 1, nom_client: "Martin Sophie", nombre_personnes: 4, date: "2024-03-15", heure: "12:00", statut: "confirmée", telephone: "+33 6 12 34 56 78" },
    { id: 2, nom_client: "Benali Karim", nombre_personnes: 2, date: "2024-03-15", heure: "12:30", statut: "confirmée", telephone: "+33 6 98 76 54 32" },
    { id: 3, nom_client: "Dupont Clara", nombre_personnes: 6, date: "2024-03-15", heure: "13:00", statut: "annulée", telephone: "+33 7 45 23 89 10" },
    { id: 4, nom_client: "Weber Lucas", nombre_personnes: 3, date: "2024-03-15", heure: "13:30", statut: "en attente", telephone: "+33 6 11 22 33 44" },
    { id: 5, nom_client: "Rhouti Amina", nombre_personnes: 5, date: "2024-03-15", heure: "19:00", statut: "confirmée", telephone: "+33 6 55 66 77 88" },
    { id: 6, nom_client: "Leclerc Paul", nombre_personnes: 2, date: "2024-03-15", heure: "19:30", statut: "confirmée", telephone: "+33 7 99 88 77 66" },
    { id: 7, nom_client: "Moreau Julie", nombre_personnes: 8, date: "2024-03-15", heure: "20:00", statut: "en attente", telephone: "+33 6 44 55 66 77" },
    { id: 8, nom_client: "Petit Thomas", nombre_personnes: 1, date: "2024-03-15", heure: "20:30", statut: "confirmée", telephone: "+33 6 33 22 11 00" },
    { id: 9, nom_client: "Simon Léa", nombre_personnes: 6, date: "2024-03-16", heure: "19:00", statut: "confirmée", telephone: "+33 7 12 98 34 56" },
    { id: 10, nom_client: "Garcia Hugo", nombre_personnes: 3, date: "2024-03-16", heure: "19:00", statut: "annulée", telephone: "+33 6 87 65 43 21" },
    { id: 11, nom_client: "Bernard Inès", nombre_personnes: 2, date: "2024-03-16", heure: "19:00", statut: "en attente", telephone: "+33 6 23 45 67 89" },
    { id: 12, nom_client: "Rousseau Marc", nombre_personnes: 6, date: "2024-03-16", heure: "19:00", statut: "en attente", telephone: "+33 7 34 56 78 90" },
    { id: 13, nom_client: "Laurent Emma", nombre_personnes: 6, date: "2024-03-16", heure: "19:00", statut: "confirmée", telephone: "+33 6 45 67 89 01" },
    { id: 14, nom_client: "Michel Antoine", nombre_personnes: 8, date: "2024-03-16", heure: "19:00", statut: "confirmée", telephone: "+33 6 56 78 90 12" },
    { id: 15, nom_client: "Leroy Camille", nombre_personnes: 2, date: "2024-03-16", heure: "19:00", statut: "annulée", telephone: "+33 7 67 89 01 23" },
    { id: 16, nom_client: "David Nathalie", nombre_personnes: 9, date: "2024-03-16", heure: "19:00", statut: "confirmée", telephone: "+33 6 78 90 12 34" }, { id: 17, nom_client: "Bertrand Julien", nombre_personnes: 3, date: "2024-03-17", heure: "12:00", statut: "en attente", telephone: "+33 6 89 01 23 45" },
    { id: 18, nom_client: "Morel Sarah", nombre_personnes: 2, date: "2024-03-17", heure: "12:30", statut: "confirmée", telephone: "+33 7 90 12 34 56" },
    { id: 19, nom_client: "Fournier Alexis", nombre_personnes: 4, date: "2024-03-17", heure: "13:00", statut: "confirmée", telephone: "+33 6 01 23 45 67" },
    { id: 20, nom_client: "Girard Manon", nombre_personnes: 6, date: "2024-03-17", heure: "13:30", statut: "annulée", telephone: "+33 6 13 24 35 46" },
    { id: 21, nom_client: "Bonnet Victor", nombre_personnes: 2, date: "2024-03-17", heure: "19:00", statut: "confirmée", telephone: "+33 7 24 35 46 57" },
    { id: 22, nom_client: "Dupuis Chloé", nombre_personnes: 5, date: "2024-03-17", heure: "19:30", statut: "en attente", telephone: "+33 6 35 46 57 68" },
    { id: 23, nom_client: "Lambert Nicolas", nombre_personnes: 3, date: "2024-03-17", heure: "20:00", statut: "confirmée", telephone: "+33 6 46 57 68 79" },
    { id: 24, nom_client: "Chevalier Alice", nombre_personnes: 4, date: "2024-03-17", heure: "20:30", statut: "confirmée", telephone: "+33 7 57 68 79 80" },
    { id: 25, nom_client: "Fontaine Romain", nombre_personnes: 2, date: "2024-03-18", heure: "12:00", statut: "en attente", telephone: "+33 6 68 79 80 91" },
];



function numberOfPeopleInThisDate(request) {
    let activeReservations = reservations.filter(r => { return r.date == request.date && r.heure == request.heure && r.statut == 'confirmée' })

    if (activeReservations.length == 0) {
        return true
    } else {
        let filledPlaces = 0
        activeReservations.forEach(r => {
            filledPlaces += r.nombre_personnes
        })
        if (filledPlaces + request.nombre_personnes > 30) {
            return false
        } else {
            return true
        }
    }
}

function addReservation(request) {
    if (numberOfPeopleInThisDate(request)) {
        let id = reservations[reservations.length - 1].id + 1
        request['id'] = id
        request['statut'] = 'confirmée'
        reservations.push(request);
        console.log(`Reservation confirmed at ${request.date} ${request.heure} for ${request.nombre_personnes} peoples`)
    } else {
        let id = reservations[reservations.length - 1].id + 1
        request['id'] = id
        request['statut'] = 'en attente'
        reservations.push(request);
        console.log(`Reservation is pending at ${request.date} ${request.heure} for ${request.nombre_personnes} peoples, when a space for them is emtied it will be confirmed`)

    }
}

addReservation({ date: "2024-03-16", heure: "19:00", nombre_personnes: 1 })
addReservation({ date: "2024-03-16", heure: "19:00", nombre_personnes: 5 })
cancelReservation({ nom_client: "Laurent Emma", date: '2024-03-16', heure: "19:00" })
addReservation({ date: "2024-03-16", heure: "19:00", nombre_personnes: 5 })

function cancelReservation(request) {
    let reservation = reservations.filter(r => {
        return r.nom_client == request.nom_client && r.date == request.date && r.heure == request.heure
    })
    let index = reservations.indexOf(reservation[0])

    reservations[index].statut = 'annulée'
    reArrange({ date: reservations[index].date, heure: reservations[index].heure })
}

function reArrange(request) {
    let perDateReservationsWaiting = reservations.filter(r => {
        return r.date == request.date && r.heure == request.heure && r.statut == "en attente"
    })

    perDateReservationsWaiting.sort((r1, r2) => {
        return r1.id - r2.id
    })

    perDateReservationsWaiting.forEach(r => {
        if (numberOfPeopleInThisDate({ date: '2024-03-16', heure: '12:00', nombre_personnes: 2 })) {
            r.statut = 'confirmée'
            console.log(`reservation number ${r.id} has become confirmed`)
            return
        }
    })

}

function listReservationPerDate(request) {
    let perDateReservation = (reservations.filter(r => {
        return r.date == request.date
    })).sort((r1, r2) => {
        return sortDate(r1, r2)
    })

    console.log(perDateReservation)
}


function sortDate(reservation1, reservation2) {
    let houre1 = reservation1.heure.split(":")
    let houre2 = reservation2.heure.split(":")


    if (houre1[0] != houre2[0]) {
        return houre1[0] - houre2[0]
    } else {
        return houre1[1] - houre2[1]
    }

}


function totalInADate(request) {
    let present = reservations.filter(r => {
        return r.date == request.date && r.statut == 'confirmée'
    })

    let total = [];
    for (let i = 0; i < 24; i++) {
        total[i] = { houre: i, total: 0, rate: 0 }
    }
    present.forEach(r => {
        let houre = total.filter(h => {
            return h.houre == r.heure.split(':')[0]
        })
        let index = total.indexOf(houre[0])
        total[index].total += r.nombre_personnes
        total[index].rate = Math.round((total[index].total * 100) / 30)
    })
    console.log("occupancy rate per time slot in a date")
    total.forEach(t => {
        console.log(`houre: ${t.houre}:00, present peoples: ${t.total}/30, rate: ${t.rate}%`)
    })

}











