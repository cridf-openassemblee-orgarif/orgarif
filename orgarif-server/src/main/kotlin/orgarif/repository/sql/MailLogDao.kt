package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeploymentLogId
import orgarif.domain.MailLogId
import orgarif.domain.MailReference
import orgarif.domain.UserId
import orgarif.jooq.generated.Tables.MAIL_LOG
import orgarif.jooq.generated.tables.records.MailLogRecord
import orgarif.utils.toTypeId
import java.time.Instant
import java.util.*

@Repository

class MailLogDao(val jooq: DSLContext) {

    data class Record(
        val id: MailLogId,
        val deploymentLogId: DeploymentLogId,
        val userId: UserId,
        val reference: MailReference,
        val recipientMail: String,
        val data: String,
        val subject: String,
        val content: String,
        val date: Instant
    )

    data class HistoryPartialRecord(
        val id: MailLogId,
        val reference: MailReference,
        val subject: String,
        val date: Instant
    )

    data class ContentPartialRecord(
        val userId: UserId,
        val content: String
    )

    val historyPartialRecordFields = arrayOf(MAIL_LOG.ID, MAIL_LOG.REFERENCE, MAIL_LOG.SUBJECT, MAIL_LOG.DATE)

    val contentPartialRecordFields = arrayOf(MAIL_LOG.USER_ID, MAIL_LOG.CONTENT)

    fun insert(r: Record) {
        val record = MailLogRecord().apply {
            id = r.id.rawId
            deploymentLogId = r.deploymentLogId.rawId
            userId = r.userId.rawId
            reference = r.reference.name
            recipientMail = r.recipientMail
            data = r.data
            subject = r.subject
            content = r.content
            date = r.date
        }
        jooq.insertInto(MAIL_LOG).set(record).execute()
    }

    fun fetchAll(): List<Record> =
        jooq.selectFrom(MAIL_LOG)
            .fetch()
            .map(this::map)

    fun fetchContent(id: UUID): ContentPartialRecord? =
        jooq.select(*contentPartialRecordFields)
            .from(MAIL_LOG)
            .where(MAIL_LOG.ID.equal(id))
            .fetchOne()
            ?.let(this::mapContentPartialRecord)
            ?: throw IllegalArgumentException("$id")

    fun fetchByUserIdAndReferences(userId: UserId, mailReferences: List<MailReference>): List<Record> =
        jooq.selectFrom(MAIL_LOG)
            .where(MAIL_LOG.USER_ID.equal(userId.rawId))
            .and(MAIL_LOG.REFERENCE.`in`(mailReferences.map { it.name }))
            .fetch()
            .map(this::map)

    fun fetchHistoryPartialRecordByUserIdAndReferences(userId: UserId, mailReferences: Set<MailReference>):
            List<HistoryPartialRecord> =
        jooq.select(*historyPartialRecordFields)
            .from(MAIL_LOG)
            .where(MAIL_LOG.USER_ID.equal(userId.rawId))
            .and(MAIL_LOG.REFERENCE.`in`(mailReferences.map { it.name }))
            .fetch()
            .map(this::mapHistoryPartialRecord)

//     fun fetchByRecipientMail(mail: String): List<Record> =
//            jooq.selectFrom(MAIL_LOG)
//                    .where(MAIL_LOG.RECIPIENT_MAIL.equal(mail))
//                    .fetch()
//                    .map(this::map)

    fun map(r: MailLogRecord) = Record(
        r.id.toTypeId(),
        r.deploymentLogId.toTypeId(),
        r.userId.toTypeId(),
        MailReference.valueOf(r.reference),
        r.recipientMail,
        r.data,
        r.subject,
        r.content,
        r.date
    )

    fun mapHistoryPartialRecord(r: org.jooq.Record) = HistoryPartialRecord(
        r.get(MAIL_LOG.ID).toTypeId(),
        MailReference.valueOf(r.get(MAIL_LOG.REFERENCE)),
        r.get(MAIL_LOG.SUBJECT),
        r.get(MAIL_LOG.DATE)
    )

    fun mapContentPartialRecord(r: org.jooq.Record) = ContentPartialRecord(
        r.get(MAIL_LOG.USER_ID).toTypeId(),
        r.get(MAIL_LOG.CONTENT)
    )

}
