package orgarif.repository.user

import org.jooq.DSLContext
import org.jooq.Record
import org.springframework.stereotype.Repository
import orgarif.domain.MimeType
import orgarif.domain.UserFileData
import orgarif.domain.UserFileId
import orgarif.domain.UserFileReference
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

    fun insert(r: UserFileReference, bytes: ByteArray) {
        // FIMENOW refactor proposition
        val jr =
            UserFileRecord().apply {
                id = r.id.rawId
                userId = r.userId.rawId
                fileContent = bytes
                contentType = r.contentType.fullType
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

    fun fetchReferenceOrNull(id: UserFileId): UserFileReference? =
        jooq
            .select(nonDataFields)
            .from(USER_FILE)
            .where(USER_FILE.ID.equal(id.rawId))
            .fetchOne()
            ?.let { mapReference(it) }

<<<<<<< HEAD
    fun fetchReferencesByUserId(userId: UserId): List<UserFileReference> {
        return jooq
=======
    fun fetchReferencesByUserId(userId: UserId): List<UserFileReference> =
        jooq
>>>>>>> template
            .select(nonDataFields)
            .from(USER_FILE)
            .where(USER_FILE.USER_ID.equal(userId.rawId))
            .toList()
            .map { mapReference(it) }

    fun count(): Int = jooq.selectCount().from(USER_FILE).fetchSingle().let { it.value1() }

    fun mapData(record: Record): UserFileData {
        val r = record.into(UserFileRecord::class.java)
        return UserFileData(r.contentType, r.fileContent)
    }

    fun mapReference(record: Record): UserFileReference {
        val r = record.into(UserFileRecord::class.java)
        return UserFileReference(
            id = r.id.toTypeId(),
            userId = r.userId.toTypeId(),
            contentType = MimeType.of(r.contentType),
            originalFilename = r.originalFilename,
            uploadDate = r.uploadDate)
    }
}
