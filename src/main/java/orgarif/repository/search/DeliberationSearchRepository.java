package orgarif.repository.search;

import orgarif.domain.Deliberation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Deliberation} entity.
 */
public interface DeliberationSearchRepository extends ElasticsearchRepository<Deliberation, Long> {
}
