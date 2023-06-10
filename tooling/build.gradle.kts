plugins { kotlin("jvm") }

repositories { mavenCentral() }

dependencies {
    implementation(project(":kt-to-ts-annotations"))

    implementation("io.github.microutils:kotlin-logging:3.0.5")

    implementation("com.google.devtools.ksp:symbol-processing-api:1.8.21-1.0.11")
    implementation("org.json:json:20230227")

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.9.2")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.9.2")
}
