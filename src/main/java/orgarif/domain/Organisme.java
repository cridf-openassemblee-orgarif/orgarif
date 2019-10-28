package orgarif.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
 * A Organisme.
 */
@Entity
@Table(name = "organisme")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "organisme")
public class Organisme implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
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

    @Column(name = "creation_date")
    private Instant creationDate;

    @Column(name = "last_modification_date")
    private Instant lastModificationDate;

    @Column(name = "partage_representants")
    private Boolean partageRepresentants;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("organismes")
    private NatureJuridique natureJuridique;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("organismes")
    private Secteur secteur;

    @ManyToOne
    @JsonIgnoreProperties("organismes")
    private TypeStructure typeStructure;

    @OneToMany(mappedBy = "organisme")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Instance> instances = new HashSet<>();

    @OneToMany(mappedBy = "representantOrganisme")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Representant> representants = new HashSet<>();

    @OneToMany(mappedBy = "suppleantOrganisme")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Representant> suppleants = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "organisme_deliberation",
               joinColumns = @JoinColumn(name = "organisme_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "deliberation_id", referencedColumnName = "id"))
    private Set<Deliberation> deliberations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Organisme nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getNombreRepresentants() {
        return nombreRepresentants;
    }

    public Organisme nombreRepresentants(Integer nombreRepresentants) {
        this.nombreRepresentants = nombreRepresentants;
        return this;
    }

    public void setNombreRepresentants(Integer nombreRepresentants) {
        this.nombreRepresentants = nombreRepresentants;
    }

    public Integer getNombreSuppleants() {
        return nombreSuppleants;
    }

    public Organisme nombreSuppleants(Integer nombreSuppleants) {
        this.nombreSuppleants = nombreSuppleants;
        return this;
    }

    public void setNombreSuppleants(Integer nombreSuppleants) {
        this.nombreSuppleants = nombreSuppleants;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public Organisme creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Instant getLastModificationDate() {
        return lastModificationDate;
    }

    public Organisme lastModificationDate(Instant lastModificationDate) {
        this.lastModificationDate = lastModificationDate;
        return this;
    }

    public void setLastModificationDate(Instant lastModificationDate) {
        this.lastModificationDate = lastModificationDate;
    }

    public Boolean isPartageRepresentants() {
        return partageRepresentants;
    }

    public Organisme partageRepresentants(Boolean partageRepresentants) {
        this.partageRepresentants = partageRepresentants;
        return this;
    }

    public void setPartageRepresentants(Boolean partageRepresentants) {
        this.partageRepresentants = partageRepresentants;
    }

    public NatureJuridique getNatureJuridique() {
        return natureJuridique;
    }

    public Organisme natureJuridique(NatureJuridique natureJuridique) {
        this.natureJuridique = natureJuridique;
        return this;
    }

    public void setNatureJuridique(NatureJuridique natureJuridique) {
        this.natureJuridique = natureJuridique;
    }

    public Secteur getSecteur() {
        return secteur;
    }

    public Organisme secteur(Secteur secteur) {
        this.secteur = secteur;
        return this;
    }

    public void setSecteur(Secteur secteur) {
        this.secteur = secteur;
    }

    public TypeStructure getTypeStructure() {
        return typeStructure;
    }

    public Organisme typeStructure(TypeStructure typeStructure) {
        this.typeStructure = typeStructure;
        return this;
    }

    public void setTypeStructure(TypeStructure typeStructure) {
        this.typeStructure = typeStructure;
    }

    public Set<Instance> getInstances() {
        return instances;
    }

    public Organisme instances(Set<Instance> instances) {
        this.instances = instances;
        return this;
    }

    public Organisme addInstance(Instance instance) {
        this.instances.add(instance);
        instance.setOrganisme(this);
        return this;
    }

    public Organisme removeInstance(Instance instance) {
        this.instances.remove(instance);
        instance.setOrganisme(null);
        return this;
    }

    public void setInstances(Set<Instance> instances) {
        this.instances = instances;
    }

    public Set<Representant> getRepresentants() {
        return representants;
    }

    public Organisme representants(Set<Representant> representants) {
        this.representants = representants;
        return this;
    }

    public Organisme addRepresentant(Representant representant) {
        this.representants.add(representant);
        representant.setRepresentantOrganisme(this);
        return this;
    }

    public Organisme removeRepresentant(Representant representant) {
        this.representants.remove(representant);
        representant.setRepresentantOrganisme(null);
        return this;
    }

    public void setRepresentants(Set<Representant> representants) {
        this.representants = representants;
    }

    public Set<Representant> getSuppleants() {
        return suppleants;
    }

    public Organisme suppleants(Set<Representant> representants) {
        this.suppleants = representants;
        return this;
    }

    public Organisme addSuppleant(Representant representant) {
        this.suppleants.add(representant);
        representant.setSuppleantOrganisme(this);
        return this;
    }

    public Organisme removeSuppleant(Representant representant) {
        this.suppleants.remove(representant);
        representant.setSuppleantOrganisme(null);
        return this;
    }

    public void setSuppleants(Set<Representant> representants) {
        this.suppleants = representants;
    }

    public Set<Deliberation> getDeliberations() {
        return deliberations;
    }

    public Organisme deliberations(Set<Deliberation> deliberations) {
        this.deliberations = deliberations;
        return this;
    }

    public Organisme addDeliberation(Deliberation deliberation) {
        this.deliberations.add(deliberation);
        deliberation.getOrganismes().add(this);
        return this;
    }

    public Organisme removeDeliberation(Deliberation deliberation) {
        this.deliberations.remove(deliberation);
        deliberation.getOrganismes().remove(this);
        return this;
    }

    public void setDeliberations(Set<Deliberation> deliberations) {
        this.deliberations = deliberations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Organisme)) {
            return false;
        }
        return id != null && id.equals(((Organisme) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Organisme{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", nombreRepresentants=" + getNombreRepresentants() +
            ", nombreSuppleants=" + getNombreSuppleants() +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastModificationDate='" + getLastModificationDate() + "'" +
            ", partageRepresentants='" + isPartageRepresentants() + "'" +
            "}";
    }
}
