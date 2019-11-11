package orgarif.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link TypeStructureSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TypeStructureSearchRepositoryMockConfiguration {

    @MockBean
    private TypeStructureSearchRepository mockTypeStructureSearchRepository;

}
