FROM node:16

USER root

WORKDIR /app

ENV PORT 8080

EXPOSE 8080

COPY . .

RUN yarn

CMD ["yarn", "dev"]