FROM httpd:alpine

WORKDIR /usr/src/app

COPY ./dist /usr/local/apache2/htdocs/
COPY ./dist/.htaccess /usr/local/apache2/htdocs/.htaccess

EXPOSE 80
