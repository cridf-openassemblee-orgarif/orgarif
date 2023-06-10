package orgarif.serialization

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.module.kotlin.readValue
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.util.UUID
import kotlin.jvm.internal.Reflection
import kotlin.reflect.KClass
import org.reflections.Reflections
import orgarif.domain.OrgarifId
import orgarif.domain.OrgarifSecurityString
import orgarif.domain.OrgarifStringId
import orgarif.domain.OrgarifUuidId
import orgarif.domain.PlainStringPassword
import orgarif.domain.SerializeAsString

object Serializer {

    private val idsPackage = OrgarifId::class.java.packageName

    private val reflections by lazy { Reflections(idsPackage) }

    val objectMapper: ObjectMapper = ObjectMapper().apply { configure(this) }

    fun serialize(value: Any): String = objectMapper.writeValueAsString(value)

    inline fun <reified T> deserialize(json: String): T = objectMapper.readValue(json)

    fun <T> deserialize(json: String, objectClass: Class<T>): T =
        objectMapper.readValue(json, objectClass)

    private fun configure(objectMapper: ObjectMapper) {
        val module =
            SimpleModule().apply {
                addSerializer(InstantSerializer())
                addDeserializer(Instant::class.java, InstantDeserializer())

                addSerializer(LocalDateSerializer())
                addDeserializer(LocalDate::class.java, LocalDateDeserializer())

                addSerializer(PlainStringPasswordSerializer())
                addDeserializer(PlainStringPassword::class.java, PlainStringPasswordDeserializer())

                // TODO[tmpl][serialization] handle all the null
                addSerializer(UuidSerializer())
                addDeserializer(UUID::class.java, UuidDeserializer())
                addKeySerializer(UUID::class.java, UuidKeySerializer())
                addKeyDeserializer(UUID::class.java, UuidKeyDeserializer())

                addSerializer(ZoneIdSerializer())
                addDeserializer(ZoneId::class.java, ZoneIdDeserializer())

                addSerializer(OrgarifSecurityStringSerializer())
                addKeySerializer(
                    OrgarifSecurityString::class.java, OrgarifSecurityStringKeySerializer())
                addAllOrgarifSecurityStringDeserializers(this)

                // TODO[tmpl][serialization] about data class
                addSerializer(OrgarifUuidIdSerializer())
                addKeySerializer(OrgarifUuidId::class.java, OrgarifUuidIdKeySerializer())
                addAllOrgarifUuidIdsDeserializers(this)

                addSerializer(OrgarifStringIdSerializer())
                addKeySerializer(OrgarifStringId::class.java, OrgarifStringIdKeySerializer())
                addAllOrgarifStringIdsDeserializers(this)

                addSerializer(SerializeAsStringSerializer())
                addKeySerializer(SerializeAsString::class.java, SerializeAsStringKeySerializer())
                addAllSerializeAsStringDeserializers(this)
            }

        objectMapper.registerModule(module)
        objectMapper.registerKotlinModule()
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
    }

    private fun addAllOrgarifStringIdsDeserializers(module: SimpleModule) {
        fun <T : OrgarifStringId> addDeserializer(module: SimpleModule, idKClass: KClass<T>) {
            module.addDeserializer(idKClass.java, OrgarifStringIdDeserializer(idKClass))
            module.addKeyDeserializer(idKClass.java, OrgarifStringIdKeyDeserializer(idKClass))
        }

        val idClasses: Set<Class<out OrgarifStringId>> =
            reflections.getSubTypesOf(OrgarifStringId::class.java)
        idClasses.forEach {
            @Suppress("UNCHECKED_CAST")
            addDeserializer(module, Reflection.createKotlinClass(it) as KClass<out OrgarifStringId>)
        }
    }

    private fun addAllOrgarifUuidIdsDeserializers(module: SimpleModule) {
        fun <T : OrgarifUuidId> addDeserializer(module: SimpleModule, idKClass: KClass<T>) {
            module.addDeserializer(idKClass.java, OrgarifUuidIdDeserializer(idKClass))
            module.addKeyDeserializer(idKClass.java, OrgarifUuidIdKeyDeserializer(idKClass))
        }

        val idClasses: Set<Class<out OrgarifUuidId>> =
            reflections.getSubTypesOf(OrgarifUuidId::class.java)
        idClasses.forEach {
            @Suppress("UNCHECKED_CAST")
            addDeserializer(module, Reflection.createKotlinClass(it) as KClass<out OrgarifUuidId>)
        }
    }

    private fun addAllOrgarifSecurityStringDeserializers(module: SimpleModule) {
        fun <T : OrgarifSecurityString> addDeserializer(module: SimpleModule, idKClass: KClass<T>) {
            module.addDeserializer(idKClass.java, OrgarifSecurityStringDeserializer(idKClass))
            module.addKeyDeserializer(idKClass.java, OrgarifSecurityStringKeyDeserializer(idKClass))
        }

        val idClasses: Set<Class<out OrgarifSecurityString>> =
            reflections.getSubTypesOf(OrgarifSecurityString::class.java)
        idClasses.forEach {
            @Suppress("UNCHECKED_CAST")
            addDeserializer(
                module, Reflection.createKotlinClass(it) as KClass<out OrgarifSecurityString>)
        }
    }

    private fun addAllSerializeAsStringDeserializers(module: SimpleModule) {
        fun <T : SerializeAsString> addDeserializer(module: SimpleModule, idKClass: KClass<T>) {
            module.addDeserializer(idKClass.java, SerializeAsStringDeserializer(idKClass))
            module.addKeyDeserializer(idKClass.java, SerializeAsStringKeyDeserializer(idKClass))
        }

        val idClasses: Set<Class<out SerializeAsString>> =
            reflections.getSubTypesOf(SerializeAsString::class.java)
        idClasses.forEach {
            @Suppress("UNCHECKED_CAST")
            addDeserializer(
                module, Reflection.createKotlinClass(it) as KClass<out SerializeAsString>)
        }
    }
}
