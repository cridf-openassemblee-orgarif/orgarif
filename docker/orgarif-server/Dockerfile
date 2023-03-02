FROM openjdk:15-alpine

RUN apk add wget unzip git

# copy jooq-utils to maven repository
RUN wget https://mlorber.net/maven/jooq-utils.zip
RUN mkdir /root/.m2
RUN mkdir /root/.m2/repository
RUN unzip jooq-utils.zip -d /root/.m2/repository

WORKDIR /src

CMD git clone --depth 1 file:///repo && cd repo && ./gradlew orgarif-server:bootRun --args='--spring.profiles.active=dev,dev-docker' --no-daemon
