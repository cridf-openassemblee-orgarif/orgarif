package orgarif.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import orgarif.domain.enumeration.Civilite;

/**
 * A Elu.
 */
@Entity
@Table(name = "elu")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "elu")
public class Elu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "source_id", nullable = false, unique = true)
    private String sourceId;

    @NotNull
    @Column(name = "source_uid", nullable = false, unique = true)
    private String sourceUid;

    @Enumerated(EnumType.STRING)
    @Column(name = "civilite")
    private Civilite civilite;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "groupe_politique")
    private String groupePolitique;

    @Column(name = "groupe_politique_court")
    private String groupePolitiqueCourt;

    @Column(name = "image")
    private String image;

    @Column(name = "actif")
    private Boolean actif;

    @OneToMany(mappedBy = "elu")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Representant> representants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourceId() {
        return sourceId;
    }

    public Elu sourceId(String sourceId) {
        this.sourceId = sourceId;
        return this;
    }

    public void setSourceId(String sourceId) {
        this.sourceId = sourceId;
    }

    public String getSourceUid() {
        return sourceUid;
    }

    public Elu sourceUid(String sourceUid) {
        this.sourceUid = sourceUid;
        return this;
    }

    public void setSourceUid(String sourceUid) {
        this.sourceUid = sourceUid;
    }

    public Civilite getCivilite() {
        return civilite;
    }

    public Elu civilite(Civilite civilite) {
        this.civilite = civilite;
        return this;
    }

    public void setCivilite(Civilite civilite) {
        this.civilite = civilite;
    }

    public String getNom() {
        return nom;
    }

    public Elu nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public Elu prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getGroupePolitique() {
        return groupePolitique;
    }

    public Elu groupePolitique(String groupePolitique) {
        this.groupePolitique = groupePolitique;
        return this;
    }

    public void setGroupePolitique(String groupePolitique) {
        this.groupePolitique = groupePolitique;
    }

    public String getGroupePolitiqueCourt() {
        return groupePolitiqueCourt;
    }

    public Elu groupePolitiqueCourt(String groupePolitiqueCourt) {
        this.groupePolitiqueCourt = groupePolitiqueCourt;
        return this;
    }

    public void setGroupePolitiqueCourt(String groupePolitiqueCourt) {
        this.groupePolitiqueCourt = groupePolitiqueCourt;
    }

    public String getImage() {
        return image;
    }

    public Elu image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean isActif() {
        return actif;
    }

    public Elu actif(Boolean actif) {
        this.actif = actif;
        return this;
    }

    public void setActif(Boolean actif) {
        this.actif = actif;
    }

    public Set<Representant> getRepresentants() {
        return representants;
    }

    public Elu representants(Set<Representant> representants) {
        this.representants = representants;
        return this;
    }

    public Elu addRepresentant(Representant representant) {
        this.representants.add(representant);
        representant.setElu(this);
        return this;
    }

    public Elu removeRepresentant(Representant representant) {
        this.representants.remove(representant);
        representant.setElu(null);
        return this;
    }

    public void setRepresentants(Set<Representant> representants) {
        this.representants = representants;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Elu)) {
            return false;
        }
        return id != null && id.equals(((Elu) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Elu{" +
            "id=" + getId() +
            ", sourceId='" + getSourceId() + "'" +
            ", sourceUid='" + getSourceUid() + "'" +
            ", civilite='" + getCivilite() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", groupePolitique='" + getGroupePolitique() + "'" +
            ", groupePolitiqueCourt='" + getGroupePolitiqueCourt() + "'" +
            ", image='" + getImage() + "'" +
            ", actif='" + isActif() + "'" +
            "}";
    }
}
