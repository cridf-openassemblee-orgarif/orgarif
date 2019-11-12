package orgarif.repository;
import orgarif.domain.AuditTrail;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AuditTrail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuditTrailRepository extends JpaRepository<AuditTrail, Long> {

}
