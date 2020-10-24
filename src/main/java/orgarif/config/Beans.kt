package orgarif.config

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import okhttp3.OkHttpClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder
import orgarif.domain.Elu
import orgarif.domain.EluJacksonMixin
import orgarif.domain.Representant
import orgarif.domain.RepresentantJacksonMixin

// FIXME lui trouver un nom
@Configuration
open class Beans {

    @Bean
    open fun okHttpClient(): OkHttpClient {
        return OkHttpClient()
    }

    @Bean
    open fun jackson2ObjectMapperBuilder(): Jackson2ObjectMapperBuilder {
        val module = JavaTimeModule()
//        module.addDeserializer(LocalDate::class.java, JSR310LocalDateDeserializer.INSTANCE)
        return Jackson2ObjectMapperBuilder().modulesToInstall(module, KotlinModule())
            // mixins https://stackoverflow.com/questions/7421474/how-can-i-tell-jackson-to-ignore-a-property-for-which-i-dont-have-control-over
            .mixIn(Elu::class.java, EluJacksonMixin::class.java)
            .mixIn(Representant::class.java, RepresentantJacksonMixin::class.java)
    }

}
