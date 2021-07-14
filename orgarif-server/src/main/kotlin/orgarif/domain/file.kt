package orgarif.domain

import java.time.Instant

// TODO merge MimeType / FileExtension ?
enum class FileExtension(val postfix: String) {
    png("png");
}

// FIXME find elsewhere ? or we want a list of supported stuff
// in that case do type UserFileData
enum class MimeType(val fullType: String) {
    javascript("application/javascript"),
    json("application/json"),
    pdf("application/pdf")
}

data class UserFileData(
    val contentType: String,
    val file: ByteArray,
    val originalFilename: String
)

data class UserFileReference(
    val id: UserFileId,
    val userId: UserId,
    val contentType: String,
    val originalFilename: String,
    val date: Instant
)
