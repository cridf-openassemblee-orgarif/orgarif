package orgarif.service.utils.random

import java.util.UUID
import org.apache.commons.text.CharacterPredicates
import org.apache.commons.text.RandomStringGenerator
import orgarif.domain.OrgarifSecurityString
import orgarif.domain.OrgarifStringId
import orgarif.domain.OrgarifUuidId

open class RandomService(val idLogService: IdLogService? = null) {

    val generator by lazy {
        RandomStringGenerator.Builder()
            .withinRange('0'.code, 'z'.code)
            .filteredBy(CharacterPredicates.LETTERS, CharacterPredicates.DIGITS)
            .build()
    }

    inline fun <reified T : OrgarifUuidId> id(): T {
        val uuid = uuid()
        val id = T::class.constructors.first().call(uuid)
        idLogService?.log(id)
        return id
    }

    inline fun <reified T : OrgarifStringId> stringId(length: Int): T {
        val stringId = randomString(length)
        val id = T::class.constructors.first().call(stringId)
        idLogService?.log(id)
        return id
    }

    inline fun <reified T : OrgarifSecurityString> securityString(length: Int): T {
        val stringId = randomString(length)
        return T::class.constructors.first().call(stringId)
    }

    open fun uuid() = UUID.randomUUID()

    open fun randomString(length: Int) = generator.generate(length)
}
