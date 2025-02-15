#!/bin/bash

if [ ! -f ".env" ]; then cp .env.example .env; fi

echo "Waiting for MySQL to be ready..."
# Wait for MySQL using a PHP script
until php -r "try { new PDO('mysql:host=db;dbname=swstarter', 'laravel', 'laravel'); } catch (Exception \$e) { exit(1); }"; do
  echo "Waiting for database connection..."
  sleep 2
done
echo "MySQL is up!"

# Start cron service
service cron start

php artisan migrate:fresh
php artisan key:generate
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan queue:work &
php artisan serve --host=0.0.0.0

exec docker-php-entrypoint "$@"