package orgarif.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.ManyToOne;

abstract public class RepresentantJacksonMixin {
    @JsonIgnoreProperties({"representants", "suppleants", "instances", "deliberations", "hibernateLazyInitializer"})
    Organisme representantOrganisme;

    @ManyToOne
    @JsonIgnoreProperties({"representants", "suppleants", "instances", "deliberations", "hibernateLazyInitializer"})
    Organisme suppleantOrganisme;

    @ManyToOne
    @JsonIgnoreProperties({"representants", "suppleants", "organisme", "deliberations", "hibernateLazyInitializer"})
    Instance representantInstance;

    @ManyToOne
    @JsonIgnoreProperties({"representants", "suppleants", "organisme", "deliberations", "hibernateLazyInitializer"})
    Instance suppleantInstance;
}
