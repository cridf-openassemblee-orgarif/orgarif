package orgarif.query

import org.springframework.stereotype.Service
import orgarif.repository.UserDao

@Service
class IsLoginAlreadyTakenQueryHandler(val userDao: UserDao) :
    QueryHandler.Handler<IsLoginAlreadyTakenQuery, IsLoginAlreadyTakenQueryResponse>() {

    override fun handle(query: IsLoginAlreadyTakenQuery) =
        IsLoginAlreadyTakenQueryResponse(userDao.doesLoginExist(query.login))

}
