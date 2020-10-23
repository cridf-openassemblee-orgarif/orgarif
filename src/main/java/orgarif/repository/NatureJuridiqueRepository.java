package orgarif.repository;

import orgarif.domain.NatureJuridique;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NatureJuridique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NatureJuridiqueRepository extends JpaRepository<NatureJuridique, Long> {
}
