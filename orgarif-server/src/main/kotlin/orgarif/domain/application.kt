package orgarif.domain

enum class ApplicationEnvironment {
    dev, staging, prod, test
}

enum class MimeType(val fullType: String) {
    json("application/json"),
}