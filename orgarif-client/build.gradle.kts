import com.github.gradle.node.yarn.task.YarnTask

plugins { id("com.github.node-gradle.node") version "3.1.0" }

tasks.register<YarnTask>("install") { args.value(listOf("install")) }

tasks.register<YarnTask>("build") {
    dependsOn("install")
    args.value(listOf("build"))
}

tasks.register<Delete>("clean") { delete("build") }
