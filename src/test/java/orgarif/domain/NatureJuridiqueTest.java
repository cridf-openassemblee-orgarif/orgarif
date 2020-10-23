package orgarif.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import orgarif.web.rest.TestUtil;

public class NatureJuridiqueTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NatureJuridique.class);
        NatureJuridique natureJuridique1 = new NatureJuridique();
        natureJuridique1.setId(1L);
        NatureJuridique natureJuridique2 = new NatureJuridique();
        natureJuridique2.setId(natureJuridique1.getId());
        assertThat(natureJuridique1).isEqualTo(natureJuridique2);
        natureJuridique2.setId(2L);
        assertThat(natureJuridique1).isNotEqualTo(natureJuridique2);
        natureJuridique1.setId(null);
        assertThat(natureJuridique1).isNotEqualTo(natureJuridique2);
    }
}
