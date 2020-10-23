package orgarif.repository.search;

import orgarif.domain.AuditTrail;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link AuditTrail} entity.
 */
public interface AuditTrailSearchRepository extends ElasticsearchRepository<AuditTrail, Long> {
}
