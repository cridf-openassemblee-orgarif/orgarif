package orgarif.serialization

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.readValue
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.util.*
import kotlin.jvm.internal.Reflection
import kotlin.reflect.KClass
import org.reflections.Reflections
import orgarif.domain.*

object Serializer {

    val idsPackage = OrgarifId::class.java.packageName

    private val reflections by lazy { Reflections(idsPackage) }

    val objectMapper: ObjectMapper = ObjectMapper().apply { configure(this) }

    fun serialize(value: Any): String = objectMapper.writeValueAsString(value)

    inline fun <reified T> deserialize(json: String): T = objectMapper.readValue(json)

    fun <T> deserialize(json: String, objectClass: Class<T>): T =
        objectMapper.readValue(json, objectClass)

    fun configure(objectMapper: ObjectMapper) {
        val module =
            SimpleModule().apply {
                addSerializer(InstantSerializer())
                addDeserializer(Instant::class.java, InstantDeserializer())

                addSerializer(LocalDateSerializer())
                addDeserializer(LocalDate::class.java, LocalDateDeserializer())

                addSerializer(PlainStringPasswordSerializer())
                addDeserializer(PlainStringPassword::class.java, PlainStringPasswordDeserializer())

                // TODO[serialization] handle all the null
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

                // TODO[serialization] about data class
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
        objectMapper.registerModule(KotlinModule())
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
    }

    fun addAllOrgarifStringIdsDeserializers(module: SimpleModule) {
        fun <T : OrgarifStringId> addDeserializer(module: SimpleModule, idKclass: KClass<T>) {
            module.addDeserializer(idKclass.java, OrgarifStringIdDeserializer(idKclass))
            module.addKeyDeserializer(idKclass.java, OrgarifStringIdKeyDeserializer(idKclass))
        }

        val idClasses: Set<Class<out OrgarifStringId>> =
            reflections.getSubTypesOf(OrgarifStringId::class.java)
        idClasses.forEach {
            addDeserializer(module, Reflection.createKotlinClass(it) as KClass<out OrgarifStringId>)
        }
    }

    fun addAllOrgarifUuidIdsDeserializers(module: SimpleModule) {
        fun <T : OrgarifUuidId> addDeserializer(module: SimpleModule, idKclass: KClass<T>) {
            module.addDeserializer(idKclass.java, OrgarifUuidIdDeserializer(idKclass))
            module.addKeyDeserializer(idKclass.java, OrgarifUuidIdKeyDeserializer(idKclass))
        }

        val idClasses: Set<Class<out OrgarifUuidId>> =
            reflections.getSubTypesOf(OrgarifUuidId::class.java)
        idClasses.forEach {
            addDeserializer(module, Reflection.createKotlinClass(it) as KClass<out OrgarifUuidId>)
        }
    }

    fun addAllOrgarifSecurityStringDeserializers(module: SimpleModule) {
        fun <T : OrgarifSecurityString> addDeserializer(module: SimpleModule, idKclass: KClass<T>) {
            module.addDeserializer(idKclass.java, OrgarifSecurityStringDeserializer(idKclass))
            module.addKeyDeserializer(idKclass.java, OrgarifSecurityStringKeyDeserializer(idKclass))
        }

        val idClasses: Set<Class<out OrgarifSecurityString>> =
            reflections.getSubTypesOf(OrgarifSecurityString::class.java)
        idClasses.forEach {
            addDeserializer(
                module, Reflection.createKotlinClass(it) as KClass<out OrgarifSecurityString>)
        }
    }

    fun addAllSerializeAsStringDeserializers(module: SimpleModule) {
        fun <T : SerializeAsString> addDeserializer(module: SimpleModule, idKclass: KClass<T>) {
            module.addDeserializer(idKclass.java, SerializeAsStringDeserializer(idKclass))
            module.addKeyDeserializer(idKclass.java, SerializeAsStringKeyDeserializer(idKclass))
        }

        val idClasses: Set<Class<out SerializeAsString>> =
            reflections.getSubTypesOf(SerializeAsString::class.java)
        idClasses.forEach {
            addDeserializer(
                module, Reflection.createKotlinClass(it) as KClass<out SerializeAsString>)
        }
    }
}
