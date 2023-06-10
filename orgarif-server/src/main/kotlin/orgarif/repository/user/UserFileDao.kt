package orgarif.repository.user

import java.time.Instant
import org.jooq.DSLContext
import org.jooq.Record as JooqRecord
import org.springframework.stereotype.Repository
import orgarif.domain.MimeType
import orgarif.domain.UserFileData
import orgarif.domain.UserFileId
import orgarif.domain.UserId
import orgarif.jooq.generated.Tables.USER_FILE
import orgarif.jooq.generated.tables.records.UserFileRecord
import orgarif.utils.toTypeId

@Repository
class UserFileDao(private val jooq: DSLContext) {

    companion object {
        val nonDataFields by lazy {
            setOf(
                USER_FILE.ID,
                USER_FILE.USER_ID,
                USER_FILE.CONTENT_TYPE,
                USER_FILE.ORIGINAL_FILENAME,
                USER_FILE.UPLOAD_DATE)
        }
    }

    data class Record(
        val id: UserFileId,
        val userId: UserId,
        val contentType: MimeType,
        val originalFilename: String,
        val uploadDate: Instant
    )

    fun insert(r: Record, bytes: ByteArray) {
        // FIMENOW refactor proposition
        val jr =
            UserFileRecord().apply {
                id = r.id.rawId
                userId = r.userId.rawId
                fileContent = bytes
                contentType = r.contentType.type
                originalFilename = r.originalFilename
                uploadDate = r.uploadDate
            }
        jooq.insertInto(USER_FILE).set(jr).execute()
    }

    fun fetchDataOrNull(id: UserFileId): UserFileData? =
        jooq
            .select(USER_FILE.CONTENT_TYPE, USER_FILE.FILE_CONTENT)
            .from(USER_FILE)
            .where(USER_FILE.ID.equal(id.rawId))
            .fetchOne()
            ?.let { mapData(it.into(USER_FILE)) }

    fun fetchReferenceOrNull(id: UserFileId): Record? =
        jooq
            .select(nonDataFields)
            .from(USER_FILE)
            .where(USER_FILE.ID.equal(id.rawId))
            .fetchOne()
            ?.let { mapRecord(it) }

    fun fetchReferencesByUserId(userId: UserId): List<Record> =
        jooq
            .select(nonDataFields)
            .from(USER_FILE)
            .where(USER_FILE.USER_ID.equal(userId.rawId))
            .toList()
            .map { mapRecord(it.into(UserFileRecord::class.java)) }

    fun count(): Int = jooq.selectCount().from(USER_FILE).fetchSingle().value1()

    fun mapData(r: UserFileRecord): UserFileData {
        return UserFileData(MimeType(r.contentType), r.fileContent)
    }

    fun mapRecord(raw: JooqRecord): Record {
        val r = raw.into(UserFileRecord::class.java)
        return Record(
            id = r.id.toTypeId(),
            userId = r.userId.toTypeId(),
            contentType = MimeType(r.contentType),
            originalFilename = r.originalFilename,
            uploadDate = r.uploadDate)
    }
}
