package orgarif.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link OrganismeSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class OrganismeSearchRepositoryMockConfiguration {

    @MockBean
    private OrganismeSearchRepository mockOrganismeSearchRepository;

}
