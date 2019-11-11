package orgarif.repository;
import orgarif.domain.Secteur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Secteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SecteurRepository extends JpaRepository<Secteur, Long> {

}
