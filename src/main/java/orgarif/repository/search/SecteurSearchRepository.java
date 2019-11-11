package orgarif.repository.search;
import orgarif.domain.Secteur;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Secteur} entity.
 */
public interface SecteurSearchRepository extends ElasticsearchRepository<Secteur, Long> {
}
