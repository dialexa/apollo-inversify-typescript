#!/bin/sh

. bin/console.sh

info "🌱 Populating the database with seed data"
docker-compose run -e NODE_ENV=development server npm run seed:run
