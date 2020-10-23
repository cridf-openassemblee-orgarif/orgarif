package orgarif.repository;

import orgarif.domain.Deliberation;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Deliberation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliberationRepository extends JpaRepository<Deliberation, Long> {
}
