FROM openjdk:15-alpine

RUN apk add wget unzip git

WORKDIR /src

CMD git clone --depth 1 file:///repo && cd repo && ./gradlew orgarif-server:bootRun --args='--spring.profiles.active=dev,dev-docker' --no-daemon
