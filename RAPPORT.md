# Partie 1
On crée une arborescence de dossier pour préparer la création de notre machine docker apache avec php.
Dans cette arborescence, on crée un fichier Dockerfile dans lequel on écrit les lignes suivantes :

FROM php:7.0-apache
COPY src/ /var/www/html/

Ces lignes indiquent que l'on va chercher la machine docker qui se nomme php:7.0-apache (sur DockerHub en l'occurence) et que l'on copie le contenu du dossier src/ dans le dossier /var/www/html/ de la machine docker crée.

Une fois le Dockerfile créé, on crée un nouveau dossier src/ au même endroit que le Dockerfile.
Dans "src/" on crée un fichier index.html qu'on édite avec le contenu html qu'on veut.

Si l'on veut faire une page un peu plus jolie rapidement. Il suffit de télécharger un template d'un framework web (comme bootstrap par exemple) et d'en copier le contenu dans src/. On peut modifier le contenu du fichier index.html si ça nous chante aussi.

On peut maintenant build l'image docker et run un container en faisant du port mapping. 
Pour voir le résultat, ouvrir un navigateur web et aller à l'adresse 192.168.99.100:port_mappé_précédemment.