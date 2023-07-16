import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm")
    id("io.spring.dependency-management") version "1.1.0"
    id("org.springframework.boot") version "3.1.0"
    // so we don't need to open Spring components classes
    id("org.jetbrains.kotlin.plugin.spring")
    id("com.google.devtools.ksp") version "1.9.0-1.0.11"
}

val kotlinVersion = "1.9.0"

springBoot { mainClass.set("orgarif.OrgarifApplicationKt") }

tasks {
    withType<KotlinCompile> { kotlinOptions.jvmTarget = "17" }
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
}

configurations.all { exclude(group = "junit", module = "junit") }

ksp {
    arg("kt2ts:clientDirectory", "$rootDir/orgarif-client")
    arg("kt2ts:dropPackage", "orgarif")
    arg("kt2ts:mappings", "$rootDir/orgarif-client/kt-to-ts-mappings.json")
    arg(
        "kt2ts:nominalStringMappings",
        listOf(
                "orgarif.domain.SerializeAsString",
                "orgarif.domain.OrgarifId",
                "orgarif.domain.PlainStringPassword")
            .joinToString(separator = "|"))
    arg("kt2ts:nominalStringImport", "utils/nominal-class.ts")
    arg("kt2ts:debugFile", "$rootDir/orgarif-client/build/debug-generation.html")
}

dependencies {
    implementation(project(":database-lib"))

    // kotlin
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:$kotlinVersion")
    implementation("org.jetbrains.kotlin:kotlin-reflect:$kotlinVersion")

    // spring
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-freemarker")
    implementation("org.springframework.boot:spring-boot-starter-jooq")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.session:spring-session-jdbc")

    // kt2ts
    implementation("io.github.kt2ts:kt2ts-annotation:1.0.0")
    ksp("io.github.kt2ts:kt2ts-ksp-generator:0.0.1")

    // database
    implementation("org.postgresql:postgresql:42.5.4")
    implementation("org.jooq:jooq:3.18.3")

    // logs
    implementation("io.github.microutils:kotlin-logging:3.0.5")

    // utils
    implementation("org.apache.commons:commons-lang3:3.12.0")
    implementation("org.apache.commons:commons-text:1.10.0")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.14.2")
    implementation("org.reflections:reflections") {
        // [doc] BEWARE reflections version 0.10.2 breaks id deserialization when deployed
        version { strictly("0.9.12") }
    }
    implementation("com.squareup.okhttp3:okhttp:4.11.0")
    implementation("org.json:json:20230227")

    // tests
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.testcontainers:postgresql:1.17.6")
    testImplementation("org.testcontainers:jdbc:1.17.6")
    testImplementation("org.testcontainers:testcontainers:1.17.6")
    testImplementation("org.testcontainers:junit-jupiter:1.17.6")
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.9.2")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.9.2")
}
