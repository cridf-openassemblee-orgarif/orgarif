package orgarif.repository.sql

import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import orgarif.domain.DeploymentLogId
import orgarif.jooq.generated.Tables.DEPLOYMENT_LOG
import orgarif.jooq.generated.tables.records.DeploymentLogRecord
import java.time.Instant
import java.time.ZoneId

@Repository
class DeploymentLogDao(val jooq: DSLContext) {

    data class Record(
        val id: DeploymentLogId,
        val buildVersion: String,
        val systemZoneId: ZoneId,
        val startupDate: Instant,
        val shutdownDate: Instant?
    )

    fun insert(r: Record) {
        val lr = DeploymentLogRecord().apply {
            id = r.id.rawId
            buildVersion = r.buildVersion
            systemZoneId = r.systemZoneId.id
            startupDate = r.startupDate
        }
        jooq.insertInto(DEPLOYMENT_LOG).set(lr).execute()
    }

    fun updateShutdownTime(id: DeploymentLogId, shutdownDate: Instant) =
        jooq.update(DEPLOYMENT_LOG)
            .set(DEPLOYMENT_LOG.SHUTDOWN_DATE, shutdownDate)
            .where(DEPLOYMENT_LOG.ID.equal(id.rawId))
            .execute()

}
