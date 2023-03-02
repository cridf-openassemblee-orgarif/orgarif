plugins { kotlin("jvm") }

repositories { mavenCentral() }

dependencies {
    implementation(project(":kt-to-ts-annotations"))

    implementation("com.google.devtools.ksp:symbol-processing-api:1.7.21-1.0.8")
    implementation("org.json:json:20220320")

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.9.0")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.9.0")
}
