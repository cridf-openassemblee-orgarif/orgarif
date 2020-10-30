package orgarif.query.mail

import orgarif.query.IsLoginAlreadyTakenQuery
import orgarif.query.IsLoginAlreadyTakenQueryResponse
import orgarif.query.QueryHandler
import orgarif.repository.sql.UserDao
import org.springframework.stereotype.Service

@Service
class IsLoginAlreadyExistsQueryHandler(val userDao: UserDao) :
        QueryHandler<IsLoginAlreadyTakenQuery, IsLoginAlreadyTakenQueryResponse>() {

    override fun handle(query: IsLoginAlreadyTakenQuery) =
            IsLoginAlreadyTakenQueryResponse(userDao.doesLoginExist(query.login))

}
