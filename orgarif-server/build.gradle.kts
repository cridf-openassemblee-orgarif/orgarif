import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    val kotlinVersion = "1.7.0"
    kotlin("jvm") version kotlinVersion
    id("io.spring.dependency-management") version "1.0.12.RELEASE"
    id("org.springframework.boot") version "2.7.1"
    // so we don't need to open Spring components classes
    id("org.jetbrains.kotlin.plugin.spring") version kotlinVersion
}

val kotlinVersion = "1.7.0"

kotlin {
    sourceSets.all {
        languageSettings.apply {
            languageVersion = "1.6"
            apiVersion = "1.6"
            progressiveMode = true
        }
    }
}

tasks {
    withType<KotlinCompile> { kotlinOptions.jvmTarget = "15" }
    test {
        useJUnitPlatform()
        addTestListener(
            object : TestListener {
                override fun beforeSuite(suite: TestDescriptor) {}
                override fun beforeTest(testDescriptor: TestDescriptor) {}
                override fun afterTest(testDescriptor: TestDescriptor, result: TestResult) {}

                override fun afterSuite(suite: TestDescriptor, result: TestResult) {
                    if (suite.parent == null) {
                        println("\n | Test result: ${result.resultType}")
                        println(
                            " | Test summary: ${result.testCount} tests, " +
                                "${result.successfulTestCount} succeeded, " +
                                "${result.failedTestCount} failed, " +
                                "${result.skippedTestCount} skipped\n")
                    }
                }
            })
    }
}

repositories {
    mavenLocal()
    mavenCentral()
    maven("https://repo.spring.io/milestone")
    maven("https://repo.spring.io/snapshot")
}

configurations.all { exclude("junit") }

dependencies {
    implementation(project(":jooq-lib"))

    // kotlin
    implementation("org.jetbrains.kotlin:kotlin-stdlib:$kotlinVersion")
    implementation("org.jetbrains.kotlin:kotlin-reflect:$kotlinVersion")

    // spring
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-freemarker")
    implementation("org.springframework.boot:spring-boot-starter-jooq")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.session:spring-session-jdbc")

    implementation("org.postgresql:postgresql:42.3.6")

    // logs
    implementation("io.github.microutils:kotlin-logging:2.1.23")

    // utils
    implementation("org.apache.commons:commons-lang3:3.12.0")
    implementation("org.apache.commons:commons-text:1.9")
    implementation("commons-codec:commons-codec:1.15")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.3")
    implementation("org.reflections:reflections") {
        // [doc] BEWARE reflections version 0.10.2 breaks id deserialization when deployed
        version { strictly("0.9.12") }
    }
    implementation("com.squareup.okhttp3:okhttp:4.10.0")
    implementation("org.json:json:20220320")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.8.2")
}
