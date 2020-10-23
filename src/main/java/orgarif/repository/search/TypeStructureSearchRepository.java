package orgarif.repository.search;

import orgarif.domain.TypeStructure;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link TypeStructure} entity.
 */
public interface TypeStructureSearchRepository extends ElasticsearchRepository<TypeStructure, Long> {
}
