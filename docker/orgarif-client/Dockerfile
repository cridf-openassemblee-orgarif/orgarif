FROM node:16-alpine

RUN apk add git

WORKDIR /src

CMD git clone --depth 1 file:///repo && cd repo/orgarif-client && yarn && yarn start
