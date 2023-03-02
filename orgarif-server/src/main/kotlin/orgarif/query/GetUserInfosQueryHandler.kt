package orgarif.query

import orgarif.domain.UserInfos
import orgarif.repository.user.UserDao
import org.springframework.stereotype.Service

@Service
class GetUserInfosQueryHandler(private val userDao: UserDao) :
    QueryHandler.Handler<GetUserInfosQuery, GetUserInfosQueryResponse>() {

    override fun handle(query: GetUserInfosQuery) =
        GetUserInfosQueryResponse(
            userDao.fetchOrNull(query.userId)?.let {
                UserInfos(it.id, it.mail, it.displayName, it.roles)
            })
}
