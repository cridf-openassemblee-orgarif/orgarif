package orgarif.repository;

import orgarif.domain.Instance;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Instance entity.
 */
@Repository
public interface InstanceRepository extends JpaRepository<Instance, Long> {

    @Query(value = "select distinct instance from Instance instance left join fetch instance.deliberations",
        countQuery = "select count(distinct instance) from Instance instance")
    Page<Instance> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct instance from Instance instance left join fetch instance.deliberations")
    List<Instance> findAllWithEagerRelationships();

    @Query("select instance from Instance instance left join fetch instance.deliberations where instance.id =:id")
    Optional<Instance> findOneWithEagerRelationships(@Param("id") Long id);
}
