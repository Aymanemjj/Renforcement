1-
SELECT nom, ville
FROM gares
WHERE id IN (
    SELECT gare_id FROM arrets
    WHERE ligne_id = (SELECT id FROM lignes WHERE nom = 'TGV Paris-Lyon')
);

2-
SELECT l.nom,
    (SELECT COUNT(*) FROM billets b WHERE b.ligne_id = l.id) AS nb_billets
FROM lignes l;

3-
SELECT v.nom AS voyageur, l.nom AS ligne, gd.nom AS depart, ga.nom AS arrivee
FROM billets b
JOIN voyageurs v  ON v.id  = b.voyageur_id
JOIN lignes l     ON l.id  = b.ligne_id
JOIN gares gd     ON gd.id = b.gare_depart_id
JOIN gares ga     ON ga.id = b.gare_arrivee_id;

4-
SELECT g.nom, g.ville
FROM gares g
LEFT JOIN arrets a ON a.gare_id = g.id
WHERE a.id IS NULL;

5-
SELECT v.nom, SUM(b.prix) AS total,
    RANK() OVER (ORDER BY SUM(b.prix) DESC) AS classement
FROM voyageurs v
JOIN billets b ON b.voyageur_id = v.id
GROUP BY v.id, v.nom;