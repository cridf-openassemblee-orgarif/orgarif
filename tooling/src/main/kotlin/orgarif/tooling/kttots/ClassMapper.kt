package orgarif.tooling.kttots

import orgarif.tooling.kttots.ClassWriter.propertyClassName
import com.google.devtools.ksp.symbol.KSClassDeclaration
import com.google.devtools.ksp.symbol.KSTypeReference
import java.time.Duration
import java.time.Instant
import java.time.LocalDate
import java.time.LocalTime

object ClassMapper {

    // TODO[tmpl] an example if there isn't in default generated code
    data class ClassMapping(val name: String, val tsFile: String? = null)

    fun mapProperty(t: KSTypeReference): ClassMapping? {
        val d = t.resolve().declaration as? KSClassDeclaration ?: return null
        return when (d.qualifiedName?.asString()) {
            Boolean::class.qualifiedName -> ClassMapping("boolean")
            Int::class.qualifiedName -> ClassMapping("number")
            Long::class.qualifiedName -> ClassMapping("number")
            String::class.qualifiedName -> ClassMapping("string")
            Set::class.qualifiedName,
            List::class.qualifiedName -> {
                val t =
                    t.element?.typeArguments?.firstOrNull()?.type
                        ?: throw IllegalArgumentException()
                ClassMapping("${propertyClassName(t).name}[]")
            }
            Pair::class.qualifiedName -> {
                val a = t.element?.typeArguments ?: throw IllegalArgumentException()
                val t1 = a.firstOrNull()?.type ?: throw IllegalArgumentException()
                val t2 = a.getOrNull(1)?.type ?: throw IllegalArgumentException()
                ClassMapping("[${mapProperty(t1)},${mapProperty(t2)}]")
            }
            // TODO[tmpl] Record vs Dict we have a problem
            // case by case
            // can specify an annotation ? which could be checked at serialization/deser
            // OR always loose, easier not to type it
            Map::class.qualifiedName -> ClassMapping("{}")
            LocalDate::class.qualifiedName -> ClassMapping("LocalDate", "domain/date")
            LocalTime::class.qualifiedName -> ClassMapping("LocalTime", "domain/date")
            Duration::class.qualifiedName -> ClassMapping("Duration", "domain/date")
            Instant::class.qualifiedName -> ClassMapping("Instant", "domain/date")
            else -> null
        }
    }

    val nominalClasses =
        setOf(
            "orgarif.domain.OrgarifId",
            "orgarif.domain.SerializeAsString",
            "orgarif.domain.PlainStringPassword")

    fun mapClass(d: KSClassDeclaration): ClassMapping? {
        val ancestry = recursiveAncestry(d).mapNotNull { it.qualifiedName?.asString() }
        nominalClasses.forEach {
            if (it in ancestry) {
                return ClassMapping(
                    "NominalString<'${d.simpleName.asString()}'>", "utils/nominal-class")
            }
        }
        return null
    }

    // TODO[tmpl] name
    fun recursiveAncestry(d: KSClassDeclaration): Set<KSClassDeclaration> =
        (listOf(d) +
                (d.superTypes.mapNotNull { it.resolve().declaration as? KSClassDeclaration })
                    .flatMap { recursiveAncestry(it) })
            .toSet()
}
