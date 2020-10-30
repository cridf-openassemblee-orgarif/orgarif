package orgarif.query.mail

import orgarif.query.QueryHandler
import orgarif.query.RuntimeExceptionQuery
import orgarif.query.RuntimeExceptionQueryResponse
import orgarif.repository.sql.UserDao
import org.springframework.stereotype.Service

@Service
class RuntimeExceptionQueryHandler(val userDao: UserDao) :
        QueryHandler<RuntimeExceptionQuery, RuntimeExceptionQueryResponse>() {

    override fun handle(query: RuntimeExceptionQuery): RuntimeExceptionQueryResponse {
        throw RuntimeException("test runtime exception")
    }

}
