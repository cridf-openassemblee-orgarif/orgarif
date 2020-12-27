package orgarif.query

import org.springframework.stereotype.Service
import orgarif.repository.sql.UserDao

@Service
class IsLoginAlreadyTakenQueryHandler(val userDao: UserDao) :
        QueryHandler<IsLoginAlreadyTakenQuery, IsLoginAlreadyTakenQueryResponse>() {

    override fun handle(query: IsLoginAlreadyTakenQuery) =
            IsLoginAlreadyTakenQueryResponse(userDao.doesLoginExist(query.login))

}
