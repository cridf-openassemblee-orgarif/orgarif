package orgarif.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Representant.
 */
@Entity
@Table(name = "representant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "representant")
public class Representant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "position", nullable = false)
    private Integer position;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "representants", allowSetters = true)
    private Elu elu;

    @ManyToOne
    @JsonIgnoreProperties(value = "representants", allowSetters = true)
    private Organisme representantOrganisme;

    @ManyToOne
    @JsonIgnoreProperties(value = "suppleants", allowSetters = true)
    private Organisme suppleantOrganisme;

    @ManyToOne
    @JsonIgnoreProperties(value = "representants", allowSetters = true)
    private Instance representantInstance;

    @ManyToOne
    @JsonIgnoreProperties(value = "suppleants", allowSetters = true)
    private Instance suppleantInstance;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPosition() {
        return position;
    }

    public Representant position(Integer position) {
        this.position = position;
        return this;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Elu getElu() {
        return elu;
    }

    public Representant elu(Elu elu) {
        this.elu = elu;
        return this;
    }

    public void setElu(Elu elu) {
        this.elu = elu;
    }

    public Organisme getRepresentantOrganisme() {
        return representantOrganisme;
    }

    public Representant representantOrganisme(Organisme organisme) {
        this.representantOrganisme = organisme;
        return this;
    }

    public void setRepresentantOrganisme(Organisme organisme) {
        this.representantOrganisme = organisme;
    }

    public Organisme getSuppleantOrganisme() {
        return suppleantOrganisme;
    }

    public Representant suppleantOrganisme(Organisme organisme) {
        this.suppleantOrganisme = organisme;
        return this;
    }

    public void setSuppleantOrganisme(Organisme organisme) {
        this.suppleantOrganisme = organisme;
    }

    public Instance getRepresentantInstance() {
        return representantInstance;
    }

    public Representant representantInstance(Instance instance) {
        this.representantInstance = instance;
        return this;
    }

    public void setRepresentantInstance(Instance instance) {
        this.representantInstance = instance;
    }

    public Instance getSuppleantInstance() {
        return suppleantInstance;
    }

    public Representant suppleantInstance(Instance instance) {
        this.suppleantInstance = instance;
        return this;
    }

    public void setSuppleantInstance(Instance instance) {
        this.suppleantInstance = instance;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Representant)) {
            return false;
        }
        return id != null && id.equals(((Representant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Representant{" +
            "id=" + getId() +
            ", position=" + getPosition() +
            "}";
    }
}
