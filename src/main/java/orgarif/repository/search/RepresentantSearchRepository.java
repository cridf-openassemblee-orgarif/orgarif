package orgarif.repository.search;
import orgarif.domain.Representant;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Representant} entity.
 */
public interface RepresentantSearchRepository extends ElasticsearchRepository<Representant, Long> {
}
