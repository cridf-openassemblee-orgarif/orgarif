package orgarif.query

import orgarif.repository.UserDao
import org.springframework.stereotype.Service

@Service
class IsLoginAlreadyTakenQueryHandler(val userDao: UserDao) :
    QueryHandler.Handler<IsLoginAlreadyTakenQuery, IsLoginAlreadyTakenQueryResponse>() {

    override fun handle(query: IsLoginAlreadyTakenQuery) =
        IsLoginAlreadyTakenQueryResponse(userDao.doesLoginExist(query.login))

}
