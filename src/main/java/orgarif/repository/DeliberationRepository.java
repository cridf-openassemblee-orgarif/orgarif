package orgarif.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import orgarif.domain.Deliberation;

import java.util.Optional;


/**
 * Spring Data  repository for the Deliberation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliberationRepository extends JpaRepository<Deliberation, Long> {

    Optional<Deliberation> findByLabel(String label);

}
