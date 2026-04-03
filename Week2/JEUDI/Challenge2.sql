La liste des consultations avec le nom du médecin, le nom du patient et le diagnostic (3 tables)

SELECT m.nom AS medecin, p.nom, c.diagnostic FROM consultations c
INNER JOIN medecins m ON m.id = c.medecin_id
INNER JOIN patients p ON p.id = c.patient_id



Le nombre de consultations par médecin ce mois-ci

SELECT m.id, m.nom AS medcin, m.specialite, MONTH(c.date_consultation) ,COUNT(c.id) AS total_consultation FROM medecins m 
LEFT JOIN consultations c ON c.medecin_id = m.id
WHERE MONTH(c.date_consultation) = 03
GROUP BY m.id



Le coût total des consultations par patient

SELECT p.nom, SUM(c.cout) FROM patients p
LEFT JOIN consultations c ON c.patient_id = p.id
GROUP BY p.id



Les patients qui nont jamais consulté

SELECT p.id, p.nom
FROM patients p
WHERE p.id NOT IN (
    SELECT c.patient_id
    FROM consultations c
);




Le médecin avec le plus de patients différents

SELECT m.id, m.nom, COUNT(DISTINCT p.id) AS total FROM medecins m
LEFT JOIN consultations c ON c.medecin_id = m.id
LEFT JOIN patients p ON p.id = c.patient_id
GROUP BY m.id
ORDER BY total DESC
LIMIT 1



Les prescriptions dun patient donné avec le nom du médecin prescripteur (4 tables)

SELECT p.id, p.nom AS patient, pr.consultation_id, m.nom AS medecin ,pr.medicament, pr.posologie FROM prescriptions pr
INNER JOIN consultations c ON c.id = pr.consultation_id
INNER JOIN patients p ON p.id = c.patient_id
INNER JOIN medecins m ON m.id = c.medecin_id
WHERE p.nom = "Laura Simon"




La spécialité la plus consultée

SELECT m.specialite, COUNT(m.specialite) AS count  FROM medecins m
LEFT JOIN consultations c ON c.medecin_id = m.id
GROUP BY m.specialite
ORDER BY count DESC
LIMIT 1