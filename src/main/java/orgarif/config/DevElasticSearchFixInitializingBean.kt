package orgarif.config

import io.github.jhipster.config.JHipsterConstants
import io.undertow.util.FileUtils
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.InitializingBean
import org.springframework.core.env.Environment
import org.springframework.stereotype.Component
import orgarif.repository.DeliberationRepository
import orgarif.repository.search.DeliberationSearchRepository
import java.io.IOException
import java.nio.file.Paths
import javax.annotation.PostConstruct

@Component
class DevElasticSearchFixInitializingBean(
    val environment: Environment,
    val deliberationRepository: DeliberationRepository,
    val deliberationSearchRepository: DeliberationSearchRepository) : InitializingBean {

    private val log = LoggerFactory.getLogger(DevElasticSearchFixInitializingBean::class.java)

    override fun afterPropertiesSet() {
        // at start, on dev env with local ElasticSearch, ES boostrap fails
        // https://github.com/jhipster/generator-jhipster/issues/10199
        if (JHipsterConstants.SPRING_PROFILE_DEVELOPMENT in environment.activeProfiles) {
            try {
                log.info("Delete elasticsearch indices dir [dev env only]")
                val elasticSearchIndicesDir = Paths.get(System.getProperty("user.dir"),
                    "/target/elasticsearch/data/nodes/0/indices")
                FileUtils.deleteRecursive(elasticSearchIndicesDir)
            } catch (e: IOException) {
                log.error("Couldn't delete elasticsearch indices dir", e)
            }
        }
    }

    @PostConstruct
    fun init() {
//        deliberationSearchRepository.saveAll(deliberationRepository.findAll())
    }

}
