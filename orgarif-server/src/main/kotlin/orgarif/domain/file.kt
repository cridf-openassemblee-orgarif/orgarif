package orgarif.domain

import java.time.Instant

// TODO[tmpl] merge MimeType / FileExtension ?
enum class FileExtension(val postfix: String) {
    PNG("png")
}

// FIXME[tmpl] find elsewhere ? or we want a list of supported stuff
// in that case do type UserFileData
enum class MimeType(val fullType: String) {
    JAVASCRIPT("application/javascript"),
    JSON("application/json"),
    PDF("application/pdf");

    companion object {
        val map by lazy { values().associateBy { it.fullType } }

        fun of(fullType: String): MimeType = requireNotNull(ofOrNull(fullType)) { fullType }

        fun ofOrNull(fullType: String): MimeType? = map.get(fullType)
    }
}

class UserFileData(val contentType: String, val file: ByteArray)

data class UserFileReference(
    val id: UserFileId,
    val userId: UserId,
    val contentType: MimeType,
    val originalFilename: String,
    val uploadDate: Instant
)
