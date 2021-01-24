package orgarif.service

import com.google.common.base.Charsets
import com.google.common.base.Strings
import com.google.common.io.Files
import mu.KotlinLogging
import org.springframework.core.env.Environment
import org.springframework.stereotype.Service
import orgarif.OrgarifApplication
import orgarif.domain.ApplicationEnvironment
import orgarif.domain.DeploymentLogId
import orgarif.repository.DeploymentLogDao
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

    private val logger = KotlinLogging.logger { }

    val env = run {
        val profiles = environment.activeProfiles
            .let {
                if (it.isEmpty()) {
                    environment.defaultProfiles
                } else {
                    it
                }
            }
            .filter { it != OrgarifApplication.springUserProfile() }
        if (profiles.size != 1) {
            throw IllegalStateException("Spring profiles : $profiles")
        }
        ApplicationEnvironment.valueOf(profiles.first())
    }

    val buildProperties by lazy {
        File(System.getProperty("user.dir") + "/build.properties").let { file ->
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
        val buildProps = buildProperties
        if (buildProps != null && buildDiffFile.exists()) {
            val buildDiff = Files.asCharSource(buildDiffFile, Charsets.UTF_8).readFirstLine()
            buildProps.getProperty("shortGitRevision") + (if (!Strings.isNullOrEmpty(buildDiff)) " + DIFF" else "")
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

    init {
        if (env !in listOf(ApplicationEnvironment.dev, ApplicationEnvironment.test)) {
            // [doc] this log is also gonna trigger the deploymentId insertion at startup
            logger.info { "Deployed build \"$gitRevisionLabel\", env \"$env\", deployment id $deploymentId" }
        }
    }

    fun setShutdownTime() {
        deploymentLogDao.updateShutdownTime(deploymentId, dateService.now())
    }
}
