package orgarif.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;

import orgarif.domain.enumeration.AuditTrailAction;

/**
 * A AuditTrail.
 */
@Entity
@Table(name = "audit_trail")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "audittrail")
public class AuditTrail implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entity")
    private String entity;

    @Column(name = "entity_id")
    private Long entityId;

    @Column(name = "parent_entity")
    private String parentEntity;

    @Column(name = "parent_entity_id")
    private Long parentEntityId;

    @Enumerated(EnumType.STRING)
    @Column(name = "action")
    private AuditTrailAction action;

    @Column(name = "user")
    private String user;

    @Column(name = "date")
    private Instant date;

    @Column(name = "details")
    private String details;

    @Column(name = "update_description")
    private String updateDescription;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntity() {
        return entity;
    }

    public AuditTrail entity(String entity) {
        this.entity = entity;
        return this;
    }

    public void setEntity(String entity) {
        this.entity = entity;
    }

    public Long getEntityId() {
        return entityId;
    }

    public AuditTrail entityId(Long entityId) {
        this.entityId = entityId;
        return this;
    }

    public void setEntityId(Long entityId) {
        this.entityId = entityId;
    }

    public String getParentEntity() {
        return parentEntity;
    }

    public AuditTrail parentEntity(String parentEntity) {
        this.parentEntity = parentEntity;
        return this;
    }

    public void setParentEntity(String parentEntity) {
        this.parentEntity = parentEntity;
    }

    public Long getParentEntityId() {
        return parentEntityId;
    }

    public AuditTrail parentEntityId(Long parentEntityId) {
        this.parentEntityId = parentEntityId;
        return this;
    }

    public void setParentEntityId(Long parentEntityId) {
        this.parentEntityId = parentEntityId;
    }

    public AuditTrailAction getAction() {
        return action;
    }

    public AuditTrail action(AuditTrailAction action) {
        this.action = action;
        return this;
    }

    public void setAction(AuditTrailAction action) {
        this.action = action;
    }

    public String getUser() {
        return user;
    }

    public AuditTrail user(String user) {
        this.user = user;
        return this;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Instant getDate() {
        return date;
    }

    public AuditTrail date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getDetails() {
        return details;
    }

    public AuditTrail details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getUpdateDescription() {
        return updateDescription;
    }

    public AuditTrail updateDescription(String updateDescription) {
        this.updateDescription = updateDescription;
        return this;
    }

    public void setUpdateDescription(String updateDescription) {
        this.updateDescription = updateDescription;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AuditTrail)) {
            return false;
        }
        return id != null && id.equals(((AuditTrail) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AuditTrail{" +
            "id=" + getId() +
            ", entity='" + getEntity() + "'" +
            ", entityId=" + getEntityId() +
            ", parentEntity='" + getParentEntity() + "'" +
            ", parentEntityId=" + getParentEntityId() +
            ", action='" + getAction() + "'" +
            ", user='" + getUser() + "'" +
            ", date='" + getDate() + "'" +
            ", details='" + getDetails() + "'" +
            ", updateDescription='" + getUpdateDescription() + "'" +
            "}";
    }
}
