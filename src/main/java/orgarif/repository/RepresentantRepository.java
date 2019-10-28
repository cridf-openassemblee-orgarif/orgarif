package orgarif.repository;
import orgarif.domain.Representant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Representant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepresentantRepository extends JpaRepository<Representant, Long> {

}
