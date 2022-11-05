package orgarif.repository.user

import org.jooq.DSLContext
import org.jooq.Record
import org.jooq.TableField
import org.springframework.stereotype.Repository
import orgarif.domain.UserFileData
import orgarif.domain.UserFileId
import orgarif.domain.UserFileReference
import orgarif.domain.UserId
import orgarif.jooq.generated.Tables.USER_FILE
import orgarif.jooq.generated.tables.records.UserFileRecord
import orgarif.utils.toTypeId

@Repository
class UserFileDao(private val jooq: DSLContext) {

    enum class UserFileField(val field: TableField<UserFileRecord, *>, val isDataField: Boolean) {
        Id(USER_FILE.ID, false),
        UserId(USER_FILE.USER_ID, false),
        File(USER_FILE.FILE, true),
        ContentType(USER_FILE.CONTENT_TYPE, false),
        OriginalFilename(USER_FILE.ORIGINAL_FILENAME, false),
        UploadDate(USER_FILE.UPLOAD_DATE, false)
    }

    val nonDataFields by lazy {
        UserFileField.values().toList().filter { !it.isDataField }.map { it.field }
    }

    fun insert(r: UserFileReference, fileData: ByteArray) {
        // FIMENOW refactor proposition
        val jr =
            UserFileRecord().apply {
                id = r.id.rawId
                userId = r.userId.rawId
                contentType = r.contentType
                file = fileData
                originalFilename = r.originalFilename
                uploadDate = r.uploadDate
            }
        jooq.insertInto(USER_FILE).set(jr).execute()
    }

    fun fetchDataOrNull(id: UserFileId): UserFileData? =
        jooq.selectFrom(USER_FILE).where(USER_FILE.ID.equal(id.rawId)).fetchOne()?.let {
            mapData(it.into(USER_FILE))
        }

    fun fetchReferenceOrNull(id: UserFileId): UserFileReference? =
        jooq
            .select(nonDataFields)
            .from(USER_FILE)
            .where(USER_FILE.ID.equal(id.rawId))
            .fetchOne()
            ?.let { mapReference(it) }

    fun fetchReferencesByUserId(userId: UserId): List<UserFileReference> =
        jooq
            .select(nonDataFields)
            .from(USER_FILE)
            .where(USER_FILE.USER_ID.equal(userId.rawId))
            .toList()
            .map { mapReference(it) }

    fun count(): Int = jooq.selectCount().from(USER_FILE).fetchSingle().let { it.value1() }

    fun mapData(r: UserFileRecord) = UserFileData(r.contentType, r.file, r.originalFilename)

    fun mapReference(record: Record): UserFileReference {
        val r = record.into(UserFileRecord::class.java)
        return UserFileReference(
            id = r.id.toTypeId(),
            userId = r.userId.toTypeId(),
            contentType = r.contentType,
            originalFilename = r.originalFilename,
            uploadDate = r.uploadDate)
    }
}
