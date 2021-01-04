import Build_gradle.Versions.kotlinVersion
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

// TODO[build] find a way to declare it just once
// don't forget to change the second one until then !
object Versions {
    val kotlinVersion = "1.4.0"
}

buildscript {
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:2.3.3.RELEASE")
    }
}

plugins {
    val kotlinVersion = "1.4.0"
    id("org.jetbrains.kotlin.jvm") version kotlinVersion
    id("io.spring.dependency-management") version "1.0.9.RELEASE"
    id("org.springframework.boot") version "2.4.0"
    // so we don't need to open Spring components classes
    id("org.jetbrains.kotlin.plugin.spring") version "1.4.0"
}

dependencies {
    implementation(project(":jooq-lib"))

    // kotlin
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:$kotlinVersion")
    implementation("org.jetbrains.kotlin:kotlin-reflect:$kotlinVersion")

    // spring
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-freemarker")
    implementation("org.springframework.boot:spring-boot-starter-jooq")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.session:spring-session-jdbc")

    implementation("mysql:mysql-connector-java:8.0.22")

    // logs
    implementation("io.github.microutils:kotlin-logging:1.4.6")

    // utils
    implementation("org.apache.commons:commons-lang3:3.6")
    implementation("commons-codec:commons-codec:1.14")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.11.0")
    implementation("org.reflections:reflections:0.9.10")
    implementation("com.squareup.okhttp3:okhttp:4.2.2")
    implementation("org.json:json:20201115")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("junit:junit:4.13.1")
//    testImplementation("org.junit.jupiter:junit-jupiter-api")
//    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")
}

repositories {
    mavenLocal()
    mavenCentral()
    maven("https://repo.spring.io/milestone")
    maven("https://repo.spring.io/snapshot")
}

tasks {
    withType<KotlinCompile> {
        kotlinOptions {
            jvmTarget = "13"
        }
    }

    withType<Test> {
        useJUnitPlatform()
    }
}
