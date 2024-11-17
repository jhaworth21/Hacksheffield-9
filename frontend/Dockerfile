FROM httpd:alpine

# Enable mod_rewrite by editing the Apache configuration
RUN sed -i 's|#LoadModule rewrite_module modules/mod_rewrite.so|LoadModule rewrite_module modules/mod_rewrite.so|' /usr/local/apache2/conf/httpd.conf \
 && sed -i 's|AllowOverride None|AllowOverride All|' /usr/local/apache2/conf/httpd.conf

WORKDIR /usr/src/app

COPY ./dist /usr/local/apache2/htdocs/

EXPOSE 80
