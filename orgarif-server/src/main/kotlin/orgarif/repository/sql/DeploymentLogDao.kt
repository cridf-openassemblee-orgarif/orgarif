package orgarif.repository.sql

import orgarif.domain.DeploymentLogId
import orgarif.jooq.generated.Tables.DEPLOYMENT_LOG
import orgarif.jooq.generated.tables.records.DeploymentLogRecord
import org.jooq.DSLContext
import org.springframework.stereotype.Repository
import java.time.Instant
import java.time.ZoneId
import java.time.ZoneOffset

@Repository
class DeploymentLogDao(val jooq: DSLContext) {

    data class Record(val id: DeploymentLogId,
                      val buildVersion: String,
                      val systemZoneId: ZoneId,
                      val startupDate: Instant,
                      val shutdownDate: Instant?)

    fun insert(r: Record) {
        val dtr = DeploymentLogRecord()
        dtr.id = r.id.rawId
        dtr.buildVersion = r.buildVersion
        dtr.systemZoneId = r.systemZoneId.id
        dtr.startupDate = r.startupDate.atOffset(ZoneOffset.UTC).toLocalDateTime()
        jooq.insertInto(DEPLOYMENT_LOG).set(dtr).execute()
    }

    fun updateShutdownTime(id: DeploymentLogId, shutdownDate: Instant) =
            jooq.update(DEPLOYMENT_LOG)
                    .set(DEPLOYMENT_LOG.SHUTDOWN_DATE, shutdownDate.atOffset(ZoneOffset.UTC).toLocalDateTime())
                    .where(DEPLOYMENT_LOG.ID.equal(id.rawId))
                    .execute()

}