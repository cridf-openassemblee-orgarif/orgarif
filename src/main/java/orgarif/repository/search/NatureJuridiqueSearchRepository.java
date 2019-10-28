package orgarif.repository.search;
import orgarif.domain.NatureJuridique;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link NatureJuridique} entity.
 */
public interface NatureJuridiqueSearchRepository extends ElasticsearchRepository<NatureJuridique, Long> {
}
