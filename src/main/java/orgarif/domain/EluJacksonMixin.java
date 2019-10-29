package orgarif.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Set;

abstract public class EluJacksonMixin {
    @JsonIgnore
    Set<Representant> representants;
}
