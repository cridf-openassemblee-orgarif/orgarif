package orgarif.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import orgarif.web.rest.TestUtil;

public class RepresentantTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Representant.class);
        Representant representant1 = new Representant();
        representant1.setId(1L);
        Representant representant2 = new Representant();
        representant2.setId(representant1.getId());
        assertThat(representant1).isEqualTo(representant2);
        representant2.setId(2L);
        assertThat(representant1).isNotEqualTo(representant2);
        representant1.setId(null);
        assertThat(representant1).isNotEqualTo(representant2);
    }
}
