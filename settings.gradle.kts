rootProject.name = "orgarif"

include("orgarif-client", "lib-jooq", "orgarif-server")

pluginManagement {
    repositories {
        gradlePluginPortal()
        maven("https://repo.spring.io/milestone")
        maven("https://repo.spring.io/snapshot")
    }
    resolutionStrategy {
        eachPlugin {
            if (requested.id.id == "org.springframework.boot") {
                useModule("org.springframework.boot:spring-boot-gradle-plugin:${requested.version}")
            }
        }
    }
}
