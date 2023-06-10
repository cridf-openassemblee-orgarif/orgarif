package orgarif.repository.log

import java.time.Instant
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeploymentLogId
import orgarif.domain.MailLogId
import orgarif.domain.MailReference
import orgarif.domain.UserId
import orgarif.jooq.generated.tables.records.MailLogRecord
import orgarif.jooq.generated.tables.references.MAIL_LOG

@Repository
class MailLogDao(private val jooq: DSLContext) {

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

    fun insert(r: Record) {
        jooq
            .insertInto(MAIL_LOG)
            .set(
                MailLogRecord(
                    id = r.id.rawId,
                    deploymentLogId = r.deploymentLogId.rawId,
                    userId = r.userId.rawId,
                    reference = r.reference.name,
                    recipientMail = r.recipientMail,
                    data = r.data,
                    subject = r.subject,
                    content = r.content,
                    date = r.date))
            .execute()
    }
}
