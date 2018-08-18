#!/bin/sh

. bin/console.sh

info "💣 Killing API Docker container(s)"
docker-compose kill server 2>/dev/null
info "🔥 Removing API Docker container(s)"
docker-compose rm -f server 2>/dev/null
info "🙌 Starting API Docker container"
docker-compose up -d server
docker-compose logs --follow server
