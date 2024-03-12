**Jouer avec les données:**

- Convertir de CSV en JSON; (~ 400k lignes)
- Concat le JSON pour mettre en place les objects avec leurs clés/valeurs; (~ 1M3 lignes)
- Trier par Pays Européen; (~ 18k lignes)
- Trier du plus récent au plus ancien;
- Mettre toutes les clés des objects en minuscule;
- Ajouter un ID à chaque object; (1539 IDs au total)

+++++

- Retrier sur base des pays retenu;
- Redéfinir les IDs de chaque object;
- Déplacer le nom des pays dans une nouvelle clé générée "country"; 

+++++

- Retirer les espaces dans les clés;
- Supprimer state/provinces;

+++++

- Réorganiser l'ordre des clés/valeurs;
- Modifier le format de date de "MM/jj/aaaa" à "jj/MM/aaaa";
- Regrouper certaines clés/valeurs dans de nouveaux objets (objets dans objets);
- Rajouter la clé "posted" sur tous les objets qui ne l'ont pas;
- Restructurer les clés/valeurs dans le même ordre pour chaque objet JSON;