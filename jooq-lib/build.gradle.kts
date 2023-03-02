import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

group = "orgarif"

plugins { kotlin("jvm") }

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
    register<JavaExec>("generateJooq") {
        main = "orgarif.jooqlib.GenerateJooqAndDiffKt"
        classpath = sourceSets["main"].runtimeClasspath
    }
    register<JavaExec>("resetDatabase") {
        main = "orgarif.jooqlib.ResetDatabaseKt"
        classpath = sourceSets["main"].runtimeClasspath
    }
}

sourceSets.getByName("main") { java.srcDir("src/generated/java") }

repositories {
    mavenCentral()
    mavenLocal()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:$kotlinVersion")
    implementation("org.jetbrains.kotlin:kotlin-reflect:$kotlinVersion")

    api("jooq-utils:jooq-utils:0.0.6-SNAPSHOT")

    implementation("io.github.microutils:kotlin-logging:2.1.21")
    implementation("ch.qos.logback:logback-classic:1.2.11")
    implementation("org.yaml:snakeyaml:1.30")

    implementation("org.postgresql:postgresql:42.3.4")
}
