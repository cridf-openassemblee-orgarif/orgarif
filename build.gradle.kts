val buildPropertiesFile by extra("${rootProject.buildDir}/build.properties")
val buildGitDiffFile by extra("${rootProject.buildDir}/gitDiff")

fun String.runCommand(workingDir: File = file("./")): String {
    val parts = this.split("\\s".toRegex())
    val proc = ProcessBuilder(*parts.toTypedArray())
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
        dependsOn(":clean", ":orgarif-client:build", ":lib-jooq:build", ":orgarif-server:build", ":copyFiles", ":writeBuildPropertiesFile")
    }

    register<Copy>("copyFiles") {
        dependsOn(":orgarif-server:build", ":orgarif-client:build")
        from("orgarif-server/build/libs") {
            include("orgarif-server.jar")
        }
        from("orgarif-client/build") {
            into("static/resources/")
        }
        into("build")
        doLast {
            delete("build/kotlin")
        }
    }

    register("writeBuildPropertiesFile") {
        dependsOn(":copyFiles")
        doLast {
            val shortGitRevision = "git log -1 --pretty=%h".runCommand()
            val gitRevision = "git rev-parse HEAD".runCommand()
            File(buildPropertiesFile).writeText("""
                bundleName=${bundleName()}
                vendorBundleName=${vendorBundleName()}
                shortGitRevision=$shortGitRevision
                gitRevision=$gitRevision
            """.trimIndent())
            File(buildGitDiffFile).writeText("git diff HEAD".runCommand())
        }
    }
}

val bundleName = {
    val mainBundlePrefix = "app."
    val sizeLimit = 200
    val allFiles = file("build/static/resources").listFiles() ?: emptyArray()
    // assert : there's files
    assert(allFiles.size > 0) { "/!\\ Client build problem - no JS bundle" }
    // assert : each of these files is less than sizeLimit ko
    allFiles.forEach {
        assert(it.length() < sizeLimit * 1000) { "/!\\ JS bundle is more than $sizeLimit ko : ${it.length()}" }
    }
    val mainList = allFiles.filter { it.name.startsWith(mainBundlePrefix) }
    // assert there's only one main bundle
    assert(mainList.size == 1) { "/!\\ Client build problem - more than one main JS bundle : ${mainList}" }
    "/resources/${mainList.first().name}"
}

val vendorBundleName = {
    val vendorBundlePrefix = "vendors~main."
    val allFiles = file("build/static/resources").listFiles() ?: emptyArray()
    val bundleList = allFiles.filter { it.name.startsWith(vendorBundlePrefix) }
    // assert there's only one vendors~main
    assert(bundleList.size == 1) { "/!\\ Client build problem - more than one vendors JS bundle : ${bundleList}" }
    "/resources/${bundleList.first().name}"
}