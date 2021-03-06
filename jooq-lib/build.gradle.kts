import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

group = "orgarif"

plugins {
    kotlin("jvm") version "1.5.0"
}

val kotlinVersion = "1.5.0"

tasks {
    register<JavaExec>("generateJooq") {
        main = "orgarif.jooqlib.GenerateJooqAndDiffKt"
        classpath = sourceSets["main"].runtimeClasspath
    }
    register<JavaExec>("resetDatabase") {
        main = "orgarif.jooqlib.ResetDatabaseKt"
        classpath = sourceSets["main"].runtimeClasspath
    }
    withType<KotlinCompile> {
        kotlinOptions.jvmTarget = "15"
    }
}

sourceSets.getByName("main") {
    java.srcDir("src/generated/java")
}

repositories {
    mavenCentral()
    mavenLocal()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:$kotlinVersion")
    implementation("org.jetbrains.kotlin:kotlin-reflect:$kotlinVersion")

    api("jooq-utils:jooq-utils:0.0.3-SNAPSHOT")

    implementation("io.github.microutils:kotlin-logging:1.4.6")
    implementation("ch.qos.logback:logback-classic:1.2.3")
    implementation("org.yaml:snakeyaml:1.27")

    implementation("org.postgresql:postgresql:42.2.18")
}
