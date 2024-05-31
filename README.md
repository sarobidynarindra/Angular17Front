# AssignmentApp

Projet front-end pour les étudiants du Master MIAGE MBDS de Madagascar

26 - RAKOTONARIVO Saholintsoa Ravaka
46 - RATSARAEFADAHY	Narindra Sarobidy

Pour que le projet marche sur votre machine, vous devez:
- Clonez ce repository sur votre machine 
- lancer ces commandes dans un terminal autre que powershell:
	- npm install
	- ng serve

Données de Test pour le login admin:
email: admin@gmail.com
motdepasse: admin

Voici les fonctionnalités que nous avons implémentées sur notre site :
1-Ajout du Toolbar et du Sidenav dans toutes les pages
2-Login administrateur avec JWT : Les administrateurs peuvent se connecter en saisissant leur email et mot de passe. Seuls les administrateurs ont le privilège de modifier et supprimer des devoirs (assignments).
3-Ajout des auteurs : Cette fonctionnalité permet d'inclure le nom de l'élève ainsi que sa photo.
4-Liste des auteurs avec pagination et suppression : Nous avons mis en place une liste des auteurs avec une fonction de pagination pour une navigation facilitée, ainsi qu'une option de suppression des auteurs.
5-Ajout des matières : Cette fonctionnalité permet d'inclure le nom et l'image de la matière, ainsi que le nom du professeur et sa photo associée.
6-Liste des matières avec pagination et suppression : Une liste des matières a été ajoutée avec une pagination pour une gestion plus fluide, incluant également une fonction de suppression des matières.
7-Ajout des assignments avec formulaire de types Stepper : Nous avons introduit un formulaire de types Stepper pour créer des devoirs en spécifiant le nom, la date de remise, la sélection de la personne chargée de réaliser le devoir, ainsi que la matière concernée.
8-Optimisation de l'affichage des listes d'assignments sous forme de card et séparations des listes des assignments rendus et non rendus.
9-Fonctionnalité de drag and drop pour les assignments non rendus : Cette amélioration permet de déplacer les devoirs non rendus vers la section "Rendus", puis d'entrer la note et les remarques associées lorsque le devoir se trouve dans cette section.