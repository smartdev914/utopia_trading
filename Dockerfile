FROM mhart/alpine-node:11 AS builder
WORKDIR /app

COPY . /app

RUN apk --no-cache add pkgconfig autoconf automake libtool nasm build-base zlib-dev
RUN yarn && yarn build

ARG PORT=3000
ENV PORT=$PORT

EXPOSE ${PORT}

CMD [ "yarn", "start" ]