package orgarif.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import orgarif.web.rest.TestUtil;

public class SecteurTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Secteur.class);
        Secteur secteur1 = new Secteur();
        secteur1.setId(1L);
        Secteur secteur2 = new Secteur();
        secteur2.setId(secteur1.getId());
        assertThat(secteur1).isEqualTo(secteur2);
        secteur2.setId(2L);
        assertThat(secteur1).isNotEqualTo(secteur2);
        secteur1.setId(null);
        assertThat(secteur1).isNotEqualTo(secteur2);
    }
}
