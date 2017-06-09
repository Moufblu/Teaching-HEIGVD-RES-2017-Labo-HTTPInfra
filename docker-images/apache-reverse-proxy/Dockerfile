FROM php:7.0-apache

COPY conf/ /etc/apache2

COPY apache2-foreground /usr/local/bin/

COPY templates /var/apache2/templates

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*

RUN apt-get update && \
	apt-get install -y vim