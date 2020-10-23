package orgarif.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import orgarif.web.rest.TestUtil;

public class EluTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Elu.class);
        Elu elu1 = new Elu();
        elu1.setId(1L);
        Elu elu2 = new Elu();
        elu2.setId(elu1.getId());
        assertThat(elu1).isEqualTo(elu2);
        elu2.setId(2L);
        assertThat(elu1).isNotEqualTo(elu2);
        elu1.setId(null);
        assertThat(elu1).isNotEqualTo(elu2);
    }
}
