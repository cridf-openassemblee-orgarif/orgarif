import com.moowork.gradle.node.npm.NpmTask

plugins {
    id("com.moowork.node") version "1.3.1"
}

tasks.register<NpmTask>("start") {
    setArgs(listOf("start"))
}

tasks.register<NpmTask>("build") {
    setDependsOn(listOf("yarn"))
    setArgs(listOf("run", "build"))
}

tasks.register<Delete>("clean") {
    delete("build")
}