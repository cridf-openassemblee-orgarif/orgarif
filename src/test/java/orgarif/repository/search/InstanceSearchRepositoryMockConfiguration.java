package orgarif.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link InstanceSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class InstanceSearchRepositoryMockConfiguration {

    @MockBean
    private InstanceSearchRepository mockInstanceSearchRepository;

}
