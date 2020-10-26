package orgarif.domain;

import java.util.Set;

public interface HasRepresentants {
    Set<Representant> getRepresentants();

    void setRepresentants(Set<Representant> representants);

    Set<Representant> getSuppleants();

    void setSuppleants(Set<Representant> representants);
}
