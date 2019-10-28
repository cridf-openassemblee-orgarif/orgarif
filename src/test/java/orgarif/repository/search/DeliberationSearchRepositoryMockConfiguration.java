package orgarif.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link DeliberationSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class DeliberationSearchRepositoryMockConfiguration {

    @MockBean
    private DeliberationSearchRepository mockDeliberationSearchRepository;

}
