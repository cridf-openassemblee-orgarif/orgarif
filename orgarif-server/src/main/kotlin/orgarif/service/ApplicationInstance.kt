package orgarif.service

import com.google.common.base.Charsets
import com.google.common.base.Strings
import com.google.common.io.Files
import orgarif.OrgarifApplication
import orgarif.domain.ApplicationEnvironment
import orgarif.domain.DeploymentLogId
import orgarif.repository.DeploymentLogDao
import org.springframework.core.env.Environment
import org.springframework.stereotype.Service
import java.io.File
import java.io.FileInputStream
import java.util.*

@Service
class ApplicationInstance(
    val deploymentLogDao: DeploymentLogDao,
    val environment: Environment,
    val dateService: DateService,
    val randomService: RandomService
) {

    val env: ApplicationEnvironment = run {
        val environments = ApplicationEnvironment.values().map { it.name }
        val profiles = environment.activeProfiles
            .let {
                if (it.isEmpty()) {
                    environment.defaultProfiles
                } else {
                    it
                }
            }
            .filter { it != OrgarifApplication.springUserProfile() }
            .filter { it in environments }
        if (profiles.size != 1) {
            throw IllegalStateException("Spring profiles : $profiles")
        }
        ApplicationEnvironment.valueOf(profiles.first())
    }

    val gitRevisionProperties by lazy {
        File(System.getProperty("user.dir") + "/git-revision.properties").let { file ->
            if (file.exists()) {
                Properties().apply {
                    load(FileInputStream(file))
                }
            } else {
                null
            }
        }
    }

    val gitRevisionLabel: String by lazy {
        val buildDiffFile = File(System.getProperty("user.dir") + "/git.diff")
        val notNullGitRevisionProperties = gitRevisionProperties
        if (notNullGitRevisionProperties != null && buildDiffFile.exists()) {
            val buildDiff = Files.asCharSource(buildDiffFile, Charsets.UTF_8).readFirstLine()
            notNullGitRevisionProperties.getProperty("shortGitRevision") + (if (!Strings.isNullOrEmpty(buildDiff)) " + DIFF" else "")
        } else {
            "[dev]"
        }
    }

    // [doc] deploymentId insertion is lazy in development, which permits a database cleaning during the application
    // launch
    val deploymentId by lazy {
        val deploymentId = randomService.id<DeploymentLogId>()
        deploymentLogDao.insert(
            DeploymentLogDao.Record(
                deploymentId, gitRevisionLabel,
                dateService.serverZoneId(), dateService.now(), shutdownDate = null
            )
        )
        deploymentId
    }

    fun setShutdownTime() {
        deploymentLogDao.updateShutdownTime(deploymentId, dateService.now())
    }
}
