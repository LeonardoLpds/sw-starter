FROM php:8.4-fpm

RUN apt-get update -y && apt-get upgrade -y && apt-get install -y openssl zip unzip git cron
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /app
COPY . /app

COPY ./docker/schedule /etc/cron.d/schedule
RUN chmod 0644 /etc/cron.d/schedule
RUN crontab /etc/cron.d/schedule

RUN composer install --no-progress --no-interaction
EXPOSE 8000
ENTRYPOINT [ "docker/entrypoint.sh" ]