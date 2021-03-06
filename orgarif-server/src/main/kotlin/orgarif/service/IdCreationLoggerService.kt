package orgarif.service

import org.springframework.stereotype.Service
import orgarif.domain.OrgarifId
import orgarif.utils.OrgarifStringUtils
import java.util.*

@Service
class IdCreationLoggerService {

    data class IdLogging(
        var enableLogging: Boolean,
        val list: MutableList<OrgarifId<*>>?
    ) {
        init {
            if (enableLogging) {
                require(list != null)
            } else {
                require(list == null)
            }
        }
    }

    private val list = ThreadLocal.withInitial { IdLogging(false, null) }

    fun enableLogging() {
        list.set(IdLogging(true, mutableListOf()))
    }

    fun log(id: OrgarifId<*>) {
        list.get()?.let {
            if (it.enableLogging) {
                if (it.list == null) {
                    throw RuntimeException()
                }
                it.list.add(id)
            }
        }
    }

    fun getIdsString() = (list.get().list ?: throw RuntimeException())
        .map {
            val rawIdString = it.rawId.let {
                when (it) {
                    is UUID -> OrgarifStringUtils.serializeUuid(it)
                    else -> it.toString()
                }
            }
            it.javaClass.simpleName + " " + rawIdString
        }
        .joinToString(separator = "\n")

    fun clean() = list.set(null)

}