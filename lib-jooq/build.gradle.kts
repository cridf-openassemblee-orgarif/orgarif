plugins {
    kotlin("jvm") version "1.4.0"
}

group = "orgarif"
//version = "1.1.0"

repositories {
    mavenCentral()
}

val kotlinVersion = "1.4.0"

tasks {
    register<JavaExec>("generateJooq") {
        main = "orgarif.jooq.tools.GenerateJooqKt"
    }
    register<JavaExec>("resetDatabase") {
        main = "orgarif.jooq.tools.ResetDatabaseKt"
    }
}

sourceSets.getByName("main") {
    java.srcDir("src/generated/java")
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:$kotlinVersion")
    implementation("org.jetbrains.kotlin:kotlin-reflect:$kotlinVersion")

    implementation("io.github.microutils:kotlin-logging:1.4.6")
    implementation("ch.qos.logback:logback-classic:1.2.3")

    implementation("com.google.guava:guava:29.0-jre")

    implementation("org.jooq:jooq:3.13.5")
    implementation("org.jooq:jooq-meta:3.13.5")
    implementation("org.jooq:jooq-codegen:3.13.5")

    implementation("mysql:mysql-connector-java:8.0.22")
}
