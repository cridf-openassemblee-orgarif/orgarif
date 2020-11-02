package orgarif.service.utils

import org.springframework.stereotype.Service
import orgarif.domain.OrganismeId
import orgarif.repository.sql.OrganismeDao
import orgarif.service.DateService
import orgarif.utils.OrgarifStringUtils.deserializeUuid
import orgarif.utils.Serializer.serialize

@Service
class InitialDataInjector(val organismeDao: OrganismeDao,
                          val dateService: DateService) {


    init {
        val fakeOrganismeId = OrganismeId(deserializeUuid("ced8c29ba05b4ceca05f5104b9c84e28"))
        val now = dateService.now()
        if (organismeDao.fetch(fakeOrganismeId) == null) {
            organismeDao.insert(OrganismeDao.Record(
                    id = fakeOrganismeId,
                    nom = "test organisme",
                    secteurId = null,
                    natureJuridiqueId = null,
                    typeStructureId = null,
                    nombreRepresentants = null,
                    nombreSuppleants = null,
                    partageRepresentants = false,
                    creationDate = now,
                    lastModificationDate = now))
        }
    }

}