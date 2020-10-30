package orgarif.query.mail

import orgarif.query.ExceptionQuery
import orgarif.query.ExceptionQueryResponse
import orgarif.query.QueryHandler
import orgarif.repository.sql.UserDao
import org.springframework.stereotype.Service

@Service
class ExceptionQueryHandler(val userDao: UserDao) :
        QueryHandler<ExceptionQuery, ExceptionQueryResponse>() {

    override fun handle(query: ExceptionQuery): ExceptionQueryResponse {
        println(query.i)
        throw Exception("test exception")
    }

}
