package orgarif.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Deliberation.
 */
@Entity
@Table(name = "deliberation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "deliberation")
public class Deliberation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "label", nullable = false, unique = true)
    private String label;

    @NotNull
    @Column(name = "date", nullable = false)
    private Instant date;

    @Column(name = "creation_date")
    private Instant creationDate;

    @ManyToMany(mappedBy = "deliberations")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Organisme> organismes = new HashSet<>();

    @ManyToMany(mappedBy = "deliberations")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Instance> instances = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Deliberation label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Instant getDate() {
        return date;
    }

    public Deliberation date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public Deliberation creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Set<Organisme> getOrganismes() {
        return organismes;
    }

    public Deliberation organismes(Set<Organisme> organismes) {
        this.organismes = organismes;
        return this;
    }

    public Deliberation addOrganisme(Organisme organisme) {
        this.organismes.add(organisme);
        organisme.getDeliberations().add(this);
        return this;
    }

    public Deliberation removeOrganisme(Organisme organisme) {
        this.organismes.remove(organisme);
        organisme.getDeliberations().remove(this);
        return this;
    }

    public void setOrganismes(Set<Organisme> organismes) {
        this.organismes = organismes;
    }

    public Set<Instance> getInstances() {
        return instances;
    }

    public Deliberation instances(Set<Instance> instances) {
        this.instances = instances;
        return this;
    }

    public Deliberation addInstance(Instance instance) {
        this.instances.add(instance);
        instance.getDeliberations().add(this);
        return this;
    }

    public Deliberation removeInstance(Instance instance) {
        this.instances.remove(instance);
        instance.getDeliberations().remove(this);
        return this;
    }

    public void setInstances(Set<Instance> instances) {
        this.instances = instances;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Deliberation)) {
            return false;
        }
        return id != null && id.equals(((Deliberation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Deliberation{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", date='" + getDate() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
