package orgarif.repository.search;
import orgarif.domain.Elu;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Elu} entity.
 */
public interface EluSearchRepository extends ElasticsearchRepository<Elu, Long> {
}
