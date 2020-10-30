package orgarif.domain

import java.time.Instant

enum class FileExtension(val postfix: String) {
    PNG("png");
}

data class UserFileData(val contentType: String,
                        val file: ByteArray,
                        val originalFilename: String)

data class UserFileReference(val id: UserFileId,
                             val userId: UserId,
                             val contentType: String,
                             val originalFilename: String,
                             val date: Instant)
