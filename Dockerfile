FROM node:8-alpine
LABEL maintainer="Luke Gordon <luke@dialexa.com>"

WORKDIR /app
ADD . /app

CMD ["npm", "start"]
