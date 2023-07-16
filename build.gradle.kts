plugins {
    val kotlinVersion = "1.9.0"
    kotlin("jvm") version kotlinVersion apply false
    id("org.jetbrains.kotlin.plugin.spring") version kotlinVersion apply false
}

buildscript {
    val kotlinVersion = "1.9.0"
    dependencies { classpath(kotlin("gradle-plugin", version = kotlinVersion)) }
}

fun String.runCommand(workingDir: File = file("./")): String {
    val parts = this.split("\\s".toRegex())
    val proc =
        ProcessBuilder(*parts.toTypedArray())
            .directory(workingDir)
            .redirectOutput(ProcessBuilder.Redirect.PIPE)
            .redirectError(ProcessBuilder.Redirect.PIPE)
            .start()
    val waitForTimeout = 3L
    proc.waitFor(waitForTimeout, TimeUnit.SECONDS)
    return proc.inputStream.bufferedReader().readText().trim()
}

tasks {
    register<Delete>("clean") {
        dependsOn(":orgarif-client:clean", ":orgarif-server:clean")
        delete("build")
    }

    register("build") {
        dependsOn(
            ":clean",
            ":orgarif-client:build",
            ":database-lib:build",
            ":orgarif-server:build",
            ":copyConfigurationFiles")
    }

    register<Copy>("copyConfigurationFiles") {
        dependsOn(":orgarif-server:build", ":orgarif-client:build")
        from("orgarif-server/build/libs") { include("orgarif-server.jar") }
        from("orgarif-client/build/asset-manifest.json")
        from("orgarif-client/build/static") { into("static/") }
        val shortGitRevision by lazy { "git log -1 --pretty=%h".runCommand() }
        val gitRevision by lazy { "git rev-parse HEAD".runCommand() }
        from("orgarif-server/src/main/resources") { include("*.yaml", "*.xml", "*.properties") }
        into("build")
        doLast {
            val buildPropertiesFile by extra("${rootProject.buildDir}/build.properties")
            File(buildPropertiesFile)
                .writeText(
                    """
                shortGitRevision=$shortGitRevision
                gitRevision=$gitRevision
            """
                        .trimIndent())
            delete("build/kotlin")
        }
    }
}
