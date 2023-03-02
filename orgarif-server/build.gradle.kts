import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm")
    id("io.spring.dependency-management") version "1.0.12.RELEASE"
    id("org.springframework.boot") version "2.7.1"
    // so we don't need to open Spring components classes
    id("org.jetbrains.kotlin.plugin.spring")
    id("com.google.devtools.ksp") version "1.7.10-1.0.6"
}

val kotlinVersion = "1.7.10"

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
    gradlePluginPortal()
}

configurations.all { exclude("junit") }

ksp {
    arg("ktToTs:clientDirectory", "$rootDir/orgarif-client")
    // arg("ktToTs:srcDirectory", "src")
    // arg("ktToTs:generatedDirectory", "src/generated")
    arg("ktToTs:mappings", "$rootDir/orgarif-client/kt-to-ts-mappings.json")
    arg(
        "ktToTs:nominalStringMappings",
        "orgarif.domain.SerializeAsString" +
            "|orgarif.domain.OrgarifId" +
            "|orgarif.domain.PlainStringPassword")
    // can  arg("ktToTsNominalStringImport", "utils/nominal-class.ts.MyNominalString")
    arg("ktToTs:nominalStringImport", "utils/nominal-class.ts")
    arg("ktToTs:debugFile", "$rootDir/orgarif-client/build/debug-generation.html")
}

dependencies {
    implementation(project(":jooq-lib"))
    implementation(project(":kt-to-ts-annotations"))

    // kotlin
    implementation(kotlin("stdlib-jdk8"))
    implementation("org.jetbrains.kotlin:kotlin-reflect:$kotlinVersion")
    implementation(project(":tooling"))
    ksp(project(":tooling"))

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
