package orgarif.repository.search;
import orgarif.domain.Organisme;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Organisme} entity.
 */
public interface OrganismeSearchRepository extends ElasticsearchRepository<Organisme, Long> {
}
