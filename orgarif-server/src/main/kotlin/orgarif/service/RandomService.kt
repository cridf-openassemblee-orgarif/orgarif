package orgarif.service

import org.springframework.stereotype.Service
import orgarif.domain.OrgarifUuidId
import orgarif.utils.toTypeId
import java.math.BigInteger
import java.security.SecureRandom
import java.util.*

@Service
class RandomService(val idCreationLoggerService: IdCreationLoggerService) {

    //private val random by lazy { SecureRandom() }

    //fun randomAlpha() = BigInteger(100, random).toString(36)

    final inline fun <reified T : OrgarifUuidId> id(): T {
        val id = uuid().toTypeId<T>()
        idCreationLoggerService.log(id)
        return id
    }

    fun uuid() = UUID.randomUUID()

}