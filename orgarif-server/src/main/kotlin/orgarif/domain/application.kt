package orgarif.domain

enum class ApplicationEnvironment {
    dev, staging, prod, test
}

enum class MimeType(val fullType: String) {
    javascript("application/javascript"),
    json("application/json"),
}