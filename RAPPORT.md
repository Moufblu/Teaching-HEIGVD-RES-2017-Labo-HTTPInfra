# Partie 1

## Objectif
Le but de cette partie est de créer un serveur apache2 httpd tournant sur un container docker.

## Création de l'arborescence de dossier
On crée une arborescence de dossier pour préparer la création de notre machine docker apache avec php.

```
mkdir docker-images
cd docker-images
mkdir apache-php-image
cd apache-php-image
```

## Création du Dockerfile

Dans cette arborescence, on crée un fichier **Dockerfile** dans lequel on écrit les lignes suivantes :

```
FROM php:7.0-apache
COPY src/ /var/www/html/
```

Ces lignes indiquent que l'on va chercher l'image docker qui se nomme php:7.0-apache (sur *DockerHub* en l'occurence) et que l'on copie le contenu du dossier **src** dans le dossier **/var/www/html/** de la machine docker créée.

## Création des données web statiques
### Site web simple

Une fois le **Dockerfile** créé, on crée un nouveau dossier **src** au même endroit que le **Dockerfile**.
Dans **src** on crée un fichier **index.html** qu'on édite avec le contenu html qu'on veut (par exemple : ```<h1>Hello World!</h1>```).

On peut déjà build une image docker à partir de l'état actuel du projet. Exécuter ensuite un container de cette image avec du port mapping, puis ouvrir un navigateur web à l'adresse 192.168.99.100:port_mappé pour voir le résultat.

### Notes sur la configuration de Apache2
#### Sites web fournis par le serveur
Le dossier **/var/www/html/** du serveur Apache2 est le dossier dans lequel est stocké le site web affiché lorsque l'on se connecte au serveur. Il pourrait y avoir plusieurs dossier s'il y a plusieurs sites sur le serveur.

#### Fichiers de configurations Apache2
Les fichiers de configuration des sites fournis et stockés sur le serveur sont stockés dans le dossier **/etc/apache2/**.
Ce dossier contient en particulier :

- Un fichier apache2.conf
- Un dossier sites-available
- Un dossier sites-enabled

Si l'on veut stocker de nouveaux fichiers de configurations, ils seront supprimé dés que le container Docker sera supprimé.
Il faudra donc ajouter une ligne dans notre **Dockerfile** afin de copier des fichiers locaux dans l'arborescence de dossier de l'image Docker. Par exemple :

```
COPY config/ /etc/apache2/sites-available/
```

### Site web joli

Si l'on veut faire une page un peu plus jolie rapidement. Il suffit de télécharger un template d'un framework web (comme bootstrap par exemple) et d'en copier le contenu dans src/. On peut modifier le contenu du fichier index.html si ça nous chante aussi.

## Résultat final

On peut maintenant build l'image docker et run un container en faisant du port mapping. 
Pour voir le résultat, ouvrir un navigateur web et aller à l'adresse 192.168.99.100:port_mappé.

# Partie 2
## Partie 2a
### Création de l'arborescence de dossier
On crée une arborescence de dossier pour préparer la création de notre image docker node.js.

```
cd docker-images
mkdir express-image
cd express-image
```

### Création du Dockerfile

Dans cette arborescence, on crée un fichier **Dockerfile** dans lequel on écrit les lignes suivantes :

```
FROM node:4.4
COPY src /opt/app
CMD ["node", "/opt/app/index.js"]
```

Ces lignes indiquent blablu

### Ajout des dépendances npm
On crée un dossier **src** dans **express-image** et on s'y introduit.
Dans ce dossier on exécute ensuite un ```npm init```. On rempli les champs comme il se doit et un fichier **package.json** est créé.
Ce fichier contient les dépendances de bla blu.

Une fois ce fichier généré, on exécute la commande ```npm install --save chance``` afin de créer le dossier **node_modules** et mettre à jour le fichier **package.json** avec une dépendance vers la librairie **chance**.
Le module **chance** est un générateur de données aléatoires.

### Création du fichier index.js
Il faut maintenant créer le fichier **index.js** dans le dossier **src** de **express-image**. Ce fichier va être édité avec le code suivant :

```
var Chance = require('chance');
var chance = new Chance();

console.log("Bonjour " + chance.name());
```

Ce code permet d'afficher en console un nom généré aléatoirement précédé d'une salutation.

Une fois ce fichier créé, il suffit de build l'image à partir du **Dockerfile** créé précédemment et d'exécuter un container pour voir le résultat.
Remarque notable : le container fini immédiatement son exécution, il ne s'affichera donc pas dans la liste des containers fournie par ```docker ps```.

## Partie 2b
### Création d'un serveur HTTP avec express
On crée une dépendance dans le **package.json** du dossier **src** pour le framework **express** en faisant ```npm install --save express```.
On édite ensuite le fichier **index.js** comme suit : 
```
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send("Hello RES =D");
});

app.listen(3000, function() {
	console.log('Accepting HTTP requests on port 3000 !');
});
```

Ce code permet de répondre à une requête GET HTTP par le message "Hello RES =D" si la requête se fait sur le répertoire /. Le serveur écoute sur le port 3000 et affiche le message "Accepting HTTP requests on port 3000 !" lorsque la communication peut commencer.

### Contenu dynamique
On désire répondre à l'utilisateur avec du contenu dynamique lors d'un GET sur le répertoire /. On remplace alors ```res.send("Hello RES =D");``` par ```res.send("generateProfile()");```.
On appelle donc une méthode qui génère des profiles. Le code la méthode generateProfile est le suivant :
```
function generateProfile() 
{
	var numberOfProfiles = chance.integer({
		min: 0,
		max: 10
	});
	console.log(numberOfProfiles);
	var profiles = [];
	for (var i = 0; i < numberOfProfiles; i++)
	{
		var avatar = chance.avatar({fileExtension: 'jpg'});
		var email = chance.email({domain: "res.com"});
		var year = chance.integer({
			min: 2000,
			max: 2017
		})
		var lastConnection = chance.date({string: true, year: year});
		profiles.push({
			avatar: avatar,
			email: email,
			lastConnection: lastConnection
		});
	};
	console.log(profiles);
	return profiles;
}
```

Pour voir le résultat une fois le fichier exécuté grâce à **Node**, se connecter en telnet sur localhost sur le port 3000 et envoyer une requête GET sur le répertoire / ou alors ouvrir un navigateur à l'adresse localhost:3000.

Une fois que ce test fonctionne, build à nouveau l'image à partir du **Dockerfile**. En faisant un ```docker run``` avec port mapping, il devient alors possible de se connecter en telnet à l'adresse 192.168.99.100 sur le port mappé. On peut alors envoyer une requête GET et obtenir une réponse dynamique sous la forme d'un payload JSON.
Il est aussi possible de se connecter à la même adresse depuis un navigateur WEB.

# Partie 3

* Container apache_php : 172.17.0.2
* Container express_dynamic : 172.17.0.3
* Mapping du reverse proxy : 8080:80

** Dockerfile

```
FROM php:7.0-apache

COPY conf/ /etc/apache2

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```

On crée l'image en se basant sur l'image officielle php apache.
On copie le contenu du dossier conf dans **/etc/apache2**
On a besoin d'activer les modules **proxy** et **proxy_http** au démarrage des containers.
On a besoin d'activer les configurations pour les virtualhosts commençant par **000-** et **001-**.

Le dossier **conf** contient un dossier **sites-available** qui va être remplacé dans l'image docker une fois qu'on lancera le build.
Dans ce dossier **sites-available** on peut trouver 2 fichiers :

* 000-default.conf
* 001-reverse-proxy.conf

Le premier est le virtualhost par défaut, ce qui nous permet de renvoyer une erreur si on essaie de se connecter sur 192.168.99.100 sans préciser le header Host.
Le second est le virtualhost de notre reverse-proxy qui va rediriger les requêtes vers le répertoire **/api/profiles/** vers le container fournissant du contenu dynamique (express_dynamic) ou alors traiter les requêtes à destination du dossier **/** vers le container fournissant du contenu static (apache_static).

Le nom de domaine associé au reverse proxy est : demo.res.ch.

Voici le contenu du fichier 001-reverse-proxy.conf :

```
<VirtualHost *:80>
	ServerName demo.res.ch

	ProxyPass "/api/profiles/" "http://172.17.0.3:3000/"
	ProxyPassReverse "/api/profiles/" "http://172.17.0.3:3000/"

	ProxyPass "/" "http://172.17.0.2:80/"
	ProxyPassReverse "/" "http://172.17.0.2:80/"
</VirtualHost>
```

Nous avons également modifié le fichier host en y ajoutant la ligne suivante :

```192.168.99.100	demo.res.ch	#reverse-proxy, labo res http-infra```

La nouvelle image docker faisant office de reverse proxy se nomme **res/apache_rp**.

# Partie 4
## Modification des Dockerfiles
On ajoute ces lignes dans les Dockerfiles des images créées précédemments :

```
RUN apt-get update && \
	apt-get install -y vim
```

Ces lignes permettent d'installer vim sur les images.

## Script de récupération des profiles

blabla

```
<!-- Custom script to load profiles -->
<script src="js/profiles.js"></script>
```
blabla


blabla

```
function loadProfiles()
{
	$.getJSON("/api/profiles/", function( profiles ) {
		console.log(profiles);
		var message = "Nobody is here";
		if (profiles.length > 0)
		{
			message = profiles[0].avatar + " " + profiles[0].email;
		}
		$(".text-muted").text(message);
	});
};

loadProfiles();

setInterval( loadProfiles, 3000);
```

# Partie 5
## Modification du Dockerfile du reverse proxy

```COPY apache2-foreground /usr/local/bin/```

## Ajout du fichier apache2-foreground
À partir du fichier de référence de l'image officiell : php 7.0

Ajout de la récupération de deux variables d'environnement nommées :

- STATIC_APP
- DYNAMIC_APP

## Ajout du fichier config-template.php

blabla

```
<?php 
	$static = $getenv('STATIC_APP');
	$dynamic = $getenv('DYNMAIC_APP');
 ?>

<VirtualHost *:80>
	ServerName demo.res.ch

	ProxyPass '/api/profiles/' 'http://<?php print "$dynamic" ?>/'
	ProxyPassReverse '/api/profiles/' 'http://<?php print "$dynamic" ?>/'

	ProxyPass '/' 'http://<?php print "$static" ?>/'
	ProxyPassReverse '/' 'http://<?php print "$static" ?>/'
</VirtualHost>
```

Pour run avec les variables d'environnement et en intéractif :

```docker run -e STATIC_APP=172.17.0.2:80 -e DYNAMIC_APP=172.17.0.3:3000 -it res/apache_rp /bin/bash```