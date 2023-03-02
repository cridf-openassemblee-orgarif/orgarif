package orgarif.service

import orgarif.domain.OrgarifSecurityString
import orgarif.domain.OrgarifStringId
import orgarif.domain.OrgarifUuidId
import java.util.UUID
import org.apache.commons.text.CharacterPredicates
import org.apache.commons.text.RandomStringGenerator

open class RandomService(val idLogService: IdLogService? = null) {

    val generator by lazy {
        RandomStringGenerator.Builder()
            .withinRange('0'.code, 'z'.code)
            .filteredBy(CharacterPredicates.LETTERS, CharacterPredicates.DIGITS)
            .build()
    }

    inline fun <reified T : OrgarifUuidId> id(): T {
        @Suppress("DEPRECATION") val uuid = internalUuid()
        val id = T::class.constructors.first().call(uuid)
        idLogService?.log(id)
        return id
    }

    inline fun <reified T : OrgarifStringId> stringId(length: Int): T {
        @Suppress("DEPRECATION") val stringId = internalRandomString(length)
        val id = T::class.constructors.first().call(stringId)
        idLogService?.log(id)
        return id
    }

    inline fun <reified T : OrgarifSecurityString> securityString(length: Int): T {
        @Suppress("DEPRECATION") val stringId = internalRandomString(length)
        return T::class.constructors.first().call(stringId)
    }

    @Deprecated("Is for internal use only, exists because of reified id() & DummyRandomService")
    open fun internalUuid() = UUID.randomUUID()

    @Deprecated(
        "Is for internal use only, exists because of reified stringId() & DummyRandomService")
    open fun internalRandomString(length: Int) = generator.generate(length)
}
