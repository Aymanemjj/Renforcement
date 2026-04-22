1-
SELECT g.nom, g.ville, a.heure_passage
FROM arrets a
JOIN gares g ON g.id = a.gare_id
JOIN lignes l ON l.id = a.ligne_id
WHERE l.nom = 'TGV Paris-Lyon'
ORDER BY a.ordre;

2-
SELECT g.nom, g.ville, COUNT(DISTINCT a.ligne_id) AS nb_lignes
FROM gares g
JOIN arrets a ON a.gare_id = g.id
GROUP BY g.id, g.nom, g.ville
ORDER BY nb_lignes DESC;

3-
SELECT l.nom, SUM(b.prix) AS chiffre_affaires
FROM lignes l
JOIN billets b ON b.ligne_id = l.id
GROUP BY l.id, l.nom
ORDER BY chiffre_affaires DESC;

4-
SELECT g.nom, g.ville
FROM gares g
WHERE g.id NOT IN (
    SELECT a.gare_id
    FROM arrets a
    JOIN lignes l ON l.id = a.ligne_id
    WHERE l.type = 'TGV'
);

5-
SELECT v.nom, SUM(b.prix) AS total_depense
FROM voyageurs v
JOIN billets b ON b.voyageur_id = v.id
WHERE MONTH(b.date_voyage) = MONTH(CURRENT_DATE())
  AND YEAR(b.date_voyage) = YEAR(CURRENT_DATE())
GROUP BY v.id, v.nom
ORDER BY total_depense DESC
LIMIT 1;

6-

SELECT gd.nom AS depart, ga.nom AS arrivee, COUNT(*) AS nb_billets
FROM billets b
JOIN gares gd ON gd.id = b.gare_depart_id
JOIN gares ga ON ga.id = b.gare_arrivee_id
GROUP BY b.gare_depart_id, b.gare_arrivee_id
ORDER BY nb_billets DESC
LIMIT 1;