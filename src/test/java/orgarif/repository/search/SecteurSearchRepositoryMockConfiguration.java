package orgarif.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link SecteurSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class SecteurSearchRepositoryMockConfiguration {

    @MockBean
    private SecteurSearchRepository mockSecteurSearchRepository;

}
