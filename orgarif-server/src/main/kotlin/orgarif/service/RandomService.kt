package orgarif.service

import org.springframework.stereotype.Service
import java.math.BigInteger
import java.security.SecureRandom
import java.util.*

@Service
class RandomService {

    private val random by lazy { SecureRandom() }

    fun randomAlpha() = BigInteger(100, random).toString(36)

    fun randomUUID() = UUID.randomUUID()

}