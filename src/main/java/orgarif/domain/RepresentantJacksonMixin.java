package orgarif.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.ManyToOne;

abstract public class RepresentantJacksonMixin {
    @JsonIgnoreProperties({"representants", "suppleants", "instances"})
    Organisme representantOrganisme;

    @ManyToOne
    @JsonIgnoreProperties({"representants", "suppleants", "instances"})
    Organisme suppleantOrganisme;

    @ManyToOne
    @JsonIgnoreProperties({"representants", "suppleants", "organisme"})
    Instance representantInstance;

    @ManyToOne
    @JsonIgnoreProperties({"representants", "suppleants", "organisme"})
    Instance suppleantInstance;
}
