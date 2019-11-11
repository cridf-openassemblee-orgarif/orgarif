package orgarif.repository;
import orgarif.domain.TypeStructure;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TypeStructure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeStructureRepository extends JpaRepository<TypeStructure, Long> {

}
