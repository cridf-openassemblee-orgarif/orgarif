package orgarif.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Instance.
 */
@Entity
@Table(name = "instance")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "instance")
public class Instance implements HasRepresentants, Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "nombre_representants", nullable = false)
    private Integer nombreRepresentants;

    @NotNull
    @Column(name = "nombre_suppleants", nullable = false)
    private Integer nombreSuppleants;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "instances", allowSetters = true)
    private Organisme organisme;

    @OneToMany(mappedBy = "representantInstance")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Representant> representants = new HashSet<>();

    @OneToMany(mappedBy = "suppleantInstance")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Representant> suppleants = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "instance_deliberation",
               joinColumns = @JoinColumn(name = "instance_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "deliberation_id", referencedColumnName = "id"))
    private Set<Deliberation> deliberations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Instance nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getNombreRepresentants() {
        return nombreRepresentants;
    }

    public Instance nombreRepresentants(Integer nombreRepresentants) {
        this.nombreRepresentants = nombreRepresentants;
        return this;
    }

    public void setNombreRepresentants(Integer nombreRepresentants) {
        this.nombreRepresentants = nombreRepresentants;
    }

    public Integer getNombreSuppleants() {
        return nombreSuppleants;
    }

    public Instance nombreSuppleants(Integer nombreSuppleants) {
        this.nombreSuppleants = nombreSuppleants;
        return this;
    }

    public void setNombreSuppleants(Integer nombreSuppleants) {
        this.nombreSuppleants = nombreSuppleants;
    }

    public Organisme getOrganisme() {
        return organisme;
    }

    public Instance organisme(Organisme organisme) {
        this.organisme = organisme;
        return this;
    }

    public void setOrganisme(Organisme organisme) {
        this.organisme = organisme;
    }

    @Override
    public Set<Representant> getRepresentants() {
        return representants;
    }

    public Instance representants(Set<Representant> representants) {
        this.representants = representants;
        return this;
    }

    public Instance addRepresentant(Representant representant) {
        this.representants.add(representant);
        representant.setRepresentantInstance(this);
        return this;
    }

    public Instance removeRepresentant(Representant representant) {
        this.representants.remove(representant);
        representant.setRepresentantInstance(null);
        return this;
    }

    @Override
    public void setRepresentants(Set<Representant> representants) {
        this.representants = representants;
    }

    @Override
    public Set<Representant> getSuppleants() {
        return suppleants;
    }

    public Instance suppleants(Set<Representant> representants) {
        this.suppleants = representants;
        return this;
    }

    public Instance addSuppleant(Representant representant) {
        this.suppleants.add(representant);
        representant.setSuppleantInstance(this);
        return this;
    }

    public Instance removeSuppleant(Representant representant) {
        this.suppleants.remove(representant);
        representant.setSuppleantInstance(null);
        return this;
    }

    @Override
    public void setSuppleants(Set<Representant> representants) {
        this.suppleants = representants;
    }

    public Set<Deliberation> getDeliberations() {
        return deliberations;
    }

    public Instance deliberations(Set<Deliberation> deliberations) {
        this.deliberations = deliberations;
        return this;
    }

    public Instance addDeliberation(Deliberation deliberation) {
        this.deliberations.add(deliberation);
        deliberation.getInstances().add(this);
        return this;
    }

    public Instance removeDeliberation(Deliberation deliberation) {
        this.deliberations.remove(deliberation);
        deliberation.getInstances().remove(this);
        return this;
    }

    public void setDeliberations(Set<Deliberation> deliberations) {
        this.deliberations = deliberations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Instance)) {
            return false;
        }
        return id != null && id.equals(((Instance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Instance{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", nombreRepresentants=" + getNombreRepresentants() +
            ", nombreSuppleants=" + getNombreSuppleants() +
            "}";
    }
}
