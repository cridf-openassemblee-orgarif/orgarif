package orgarif.query

import org.springframework.stereotype.Service
import orgarif.domain.UserInfos
import orgarif.repository.user.UserDao

@Service
class GetUsersListQueryHandler(private val userDao: UserDao) :
    QueryHandler.Handler<GetUsersListQuery, GetUsersListQueryResponse>() {

    override fun handle(query: GetUsersListQuery) =
        GetUsersListQueryResponse(
            userDao.streamAll().toList().map {
                UserInfos(it.id, it.mail, it.displayName, it.roles)
            })
}
