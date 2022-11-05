package orgarif.tooling.kttots

import com.google.devtools.ksp.symbol.KSTypeReference

object KtToTsTypesConvertor {

    fun convert(type: KSTypeReference): String {
        val fullType = type.resolve().declaration.qualifiedName?.asString()
        return when (fullType) {
            "kotlin.String" -> "string"
            else -> fullType ?: "any"
        }
    }
}
