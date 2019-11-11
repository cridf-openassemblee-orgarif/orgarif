package orgarif.repository.search;
import orgarif.domain.Instance;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Instance} entity.
 */
public interface InstanceSearchRepository extends ElasticsearchRepository<Instance, Long> {
}
