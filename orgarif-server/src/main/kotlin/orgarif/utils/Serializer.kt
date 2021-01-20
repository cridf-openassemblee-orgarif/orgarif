package orgarif.utils

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.readValue
import org.reflections.Reflections
import org.reflections.util.ClasspathHelper
import org.reflections.util.ConfigurationBuilder
import org.reflections.util.FilterBuilder
import orgarif.domain.OrgarifId
import orgarif.domain.OrgarifStringId
import orgarif.domain.OrgarifUuidId
import orgarif.domain.PlainStringPassword
import orgarif.serialization.*
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.util.*
import kotlin.jvm.internal.Reflection
import kotlin.reflect.KClass

object Serializer {

    val idsPackage = OrgarifId::class.java.packageName

    val objectMapper: ObjectMapper = ObjectMapper().apply { configure(this) }

    fun serialize(value: Any): String = objectMapper.writeValueAsString(value)

    inline fun <reified T> deserialize(json: String): T = objectMapper.readValue(json)

    fun configure(objectMapper: ObjectMapper) {
        val module = SimpleModule().apply {
            addSerializer(InstantSerializer())
            addDeserializer(Instant::class.java, InstantDeserializer())

            addSerializer(PlainStringPasswordSerializer())
            addDeserializer(PlainStringPassword::class.java, PlainStringPasswordDeserializer())

            addSerializer(ReadableStackTraceSerializer())

            addSerializer(LocalDateSerializer())
            addDeserializer(LocalDate::class.java, LocalDateDeserializer())

            // TODO[serialization] gérer tous les null
            addSerializer(UuidSerializer())
            addDeserializer(UUID::class.java, UuidDeserializer())
            addKeySerializer(UUID::class.java, UuidKeySerializer())
            addKeyDeserializer(UUID::class.java, UuidKeyDeserializer())

            addSerializer(ZoneIdSerializer())
            addDeserializer(ZoneId::class.java, ZoneIdDeserializer())

            addSerializer(OrgarifStringIdSerializer())
            addKeySerializer(OrgarifStringId::class.java, OrgarifStringIdKeySerializer())
            addOrgarifStringIdsDeserializers(this)

            // TODO[serialization] tout le bordel avec les data class
            addSerializer(OrgarifUuidIdSerializer())
            addKeySerializer(OrgarifUuidId::class.java, OrgarifUuidIdKeySerializer())
            addOrgarifUuidIdsDeserializers(this)
        }

        objectMapper.registerModule(module)
        objectMapper.registerModule(KotlinModule())
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
    }

    fun addOrgarifUuidIdsDeserializers(module: SimpleModule) {
        val reflections = Reflections(
            ConfigurationBuilder()
                .filterInputsBy(FilterBuilder().includePackage(idsPackage))
                .setUrls(ClasspathHelper.forPackage(idsPackage))
        )
        val idClasses: Set<Class<out OrgarifUuidId>> = reflections.getSubTypesOf(OrgarifUuidId::class.java)
        idClasses
            .forEach {
                addOrgarifUuidIdDeserializers(module, Reflection.createKotlinClass(it) as KClass<out OrgarifUuidId>)
            }
    }

    fun <T : OrgarifUuidId> addOrgarifUuidIdDeserializers(module: SimpleModule, idKclass: KClass<T>) {
        module.addDeserializer(idKclass.java, OrgarifUuidIdDeserializer(idKclass))
        module.addKeyDeserializer(idKclass.java, OrgarifUuidIdKeyDeserializer(idKclass))
    }

    fun addOrgarifStringIdsDeserializers(module: SimpleModule) {
        val reflections = Reflections(
            ConfigurationBuilder()
                .filterInputsBy(FilterBuilder().includePackage(idsPackage))
                .setUrls(ClasspathHelper.forPackage(idsPackage))
        )
        val idClasses: Set<Class<out OrgarifStringId>> = reflections.getSubTypesOf(OrgarifStringId::class.java)
        idClasses
            .forEach {
                addOrgarifStringIdDeserializers(module, Reflection.createKotlinClass(it) as KClass<out OrgarifStringId>)
            }
    }

    fun <T : OrgarifStringId> addOrgarifStringIdDeserializers(module: SimpleModule, idKclass: KClass<T>) {
        module.addDeserializer(idKclass.java, OrgarifStringIdDeserializer(idKclass))
        module.addKeyDeserializer(idKclass.java, OrgarifStringIdKeyDeserializer(idKclass))
    }

}