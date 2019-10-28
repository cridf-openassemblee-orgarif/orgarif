package orgarif.repository;
import orgarif.domain.Elu;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Elu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EluRepository extends JpaRepository<Elu, Long> {

}
