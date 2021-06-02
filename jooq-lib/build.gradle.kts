plugins {
    kotlin("jvm") version "1.5.0"
}

group = "orgarif"
//version = "1.1.0"

repositories {
    mavenCentral()
    mavenLocal()
}

val kotlinVersion = "1.5.0"

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

    api("jooq-utils:jooq-utils:0.0.2-SNAPSHOT")

    implementation("io.github.microutils:kotlin-logging:1.4.6")
    implementation("ch.qos.logback:logback-classic:1.2.3")
    implementation("org.yaml:snakeyaml:1.27")

    implementation("org.postgresql:postgresql:42.2.18")
}
