package orgarif.repository;
import orgarif.domain.Organisme;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Organisme entity.
 */
@Repository
public interface OrganismeRepository extends JpaRepository<Organisme, Long> {

    @Query(value = "select distinct organisme from Organisme organisme left join fetch organisme.deliberations",
        countQuery = "select count(distinct organisme) from Organisme organisme")
    Page<Organisme> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct organisme from Organisme organisme left join fetch organisme.deliberations")
    List<Organisme> findAllWithEagerRelationships();

    @Query("select organisme from Organisme organisme left join fetch organisme.deliberations where organisme.id =:id")
    Optional<Organisme> findOneWithEagerRelationships(@Param("id") Long id);

}
