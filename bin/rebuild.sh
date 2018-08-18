#!/bin/sh

. bin/console.sh

info "💣 Killing all Docker containers"
docker kill $(docker ps -aq) 2>/dev/null
info "🔥 Removing all Docker containers"
docker rm -f $(docker ps -aq) 2>/dev/null
set -e
info "✨ Creating the database"
docker-compose up --no-start
info "👌 Starting the database"
docker-compose start postgres
info "🕐 Waiting for the database to become available"
sleep 5
info "⏩ Migrating the database to the latest schema"
docker-compose run -e NODE_ENV=development server npm run migrate:latest
info "🌱 Populating the database with seed data"
docker-compose run -e NODE_ENV=development server npm run seed:run
info "✨ Creating the test database"
docker-compose run -e NODE_ENV=test server npm run db:create
info "⏩ Migrating the test database to the latest schema"
docker-compose run -e NODE_ENV=test server npm run migrate:latest
info "🙌 Starting the server"
docker-compose start server
docker-compose logs --follow server
