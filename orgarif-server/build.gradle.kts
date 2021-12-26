import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    val kotlinVersion = "1.6.0"
    kotlin("jvm") version kotlinVersion
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    id("org.springframework.boot") version "2.6.1"
    // so we don't need to open Spring components classes
    id("org.jetbrains.kotlin.plugin.spring") version kotlinVersion
}

// TODO[build] find a way to declare it just once
// don't forget to change the second one until then !
val kotlinVersion = "1.6.0"

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

    implementation("org.postgresql:postgresql:42.2.22")

    // logs
    implementation("io.github.microutils:kotlin-logging:1.4.6")

    // utils
    implementation("org.apache.commons:commons-lang3:3.6")
    implementation("org.apache.commons:commons-text:1.9")
    implementation("commons-codec:commons-codec:1.14")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.0")
    implementation("org.reflections:reflections:0.10.2")
    implementation("com.squareup.okhttp3:okhttp:4.2.2")
    implementation("org.json:json:20210307")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:5.7.2")
    //    testImplementation("org.junit.jupiter:junit-jupiter-api")
    //    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")
}
