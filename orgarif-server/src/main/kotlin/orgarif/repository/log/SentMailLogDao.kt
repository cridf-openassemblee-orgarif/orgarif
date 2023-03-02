package orgarif.repository.log

import orgarif.domain.DeploymentLogId
import orgarif.domain.MailLogId
import orgarif.domain.MailReference
import orgarif.domain.UserId
import orgarif.jooq.generated.Tables.SENT_MAIL_LOG
import orgarif.jooq.generated.tables.records.SentMailLogRecord
import orgarif.utils.toTypeId
import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository

@Repository
class SentMailLogDao(val jooq: DSLContext) {

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

    data class ContentPartialRecord(val userId: UserId, val content: String)

    val historyPartialRecordFields =
        arrayOf(
            SENT_MAIL_LOG.ID, SENT_MAIL_LOG.REFERENCE, SENT_MAIL_LOG.SUBJECT, SENT_MAIL_LOG.DATE)

    val contentPartialRecordFields = arrayOf(SENT_MAIL_LOG.USER_ID, SENT_MAIL_LOG.CONTENT)

    fun insert(r: Record) {
        val jr =
            SentMailLogRecord().apply {
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
        jooq.insertInto(SENT_MAIL_LOG).set(jr).execute()
    }

    fun fetchAll(): List<Record> = jooq.selectFrom(SENT_MAIL_LOG).fetch().map(this::map)

    fun fetchOrNullContent(id: MailLogId): ContentPartialRecord? =
        jooq
            .select(*contentPartialRecordFields)
            .from(SENT_MAIL_LOG)
            .where(SENT_MAIL_LOG.ID.equal(id.rawId))
            .fetchOne()
            ?.let(this::mapContentPartialRecord)
            ?: throw IllegalArgumentException("$id")

    fun fetchByUserIdAndReferences(
        userId: UserId,
        mailReferences: List<MailReference>
    ): List<Record> =
        jooq
            .selectFrom(SENT_MAIL_LOG)
            .where(SENT_MAIL_LOG.USER_ID.equal(userId.rawId))
            .and(SENT_MAIL_LOG.REFERENCE.`in`(mailReferences.map { it.name }))
            .fetch()
            .map(this::map)

    fun fetchHistoryPartialRecordByUserIdAndReferences(
        userId: UserId,
        mailReferences: Set<MailReference>
    ): List<HistoryPartialRecord> =
        jooq
            .select(*historyPartialRecordFields)
            .from(SENT_MAIL_LOG)
            .where(SENT_MAIL_LOG.USER_ID.equal(userId.rawId))
            .and(SENT_MAIL_LOG.REFERENCE.`in`(mailReferences.map { it.name }))
            .fetch()
            .map(this::mapHistoryPartialRecord)

    //     fun fetchByRecipientMail(mail: String): List<Record> =
    //            jooq.selectFrom(MAIL_LOG)
    //                    .where(MAIL_LOG.RECIPIENT_MAIL.equal(mail))
    //                    .fetch()
    //                    .map(this::map)

    fun map(r: SentMailLogRecord) =
        Record(
            id = r.id.toTypeId(),
            deploymentLogId = r.deploymentLogId.toTypeId(),
            userId = r.userId.toTypeId(),
            reference = MailReference.valueOf(r.reference),
            recipientMail = r.recipientMail,
            data = r.data,
            subject = r.subject,
            content = r.content,
            date = r.date)

    fun mapHistoryPartialRecord(r: org.jooq.Record) =
        HistoryPartialRecord(
            r.get(SENT_MAIL_LOG.ID).toTypeId(),
            MailReference.valueOf(r.get(SENT_MAIL_LOG.REFERENCE)),
            r.get(SENT_MAIL_LOG.SUBJECT),
            r.get(SENT_MAIL_LOG.DATE))

    fun mapContentPartialRecord(r: org.jooq.Record) =
        ContentPartialRecord(r.get(SENT_MAIL_LOG.USER_ID).toTypeId(), r.get(SENT_MAIL_LOG.CONTENT))
}
