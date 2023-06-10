package orgarif.domain

data class MimeType(val type: String) : SerializeAsString(type) {
    companion object {
        val ApplicationJson = MimeType("application/json")

        val ApplicationJavascript = MimeType("application/javascript")
    }
}

class UserFileData(val contentType: MimeType, val file: ByteArray)
