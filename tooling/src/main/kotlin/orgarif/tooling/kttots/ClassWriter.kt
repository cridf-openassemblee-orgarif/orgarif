package orgarif.tooling.kttots

import com.google.devtools.ksp.symbol.ClassKind
import com.google.devtools.ksp.symbol.KSClassDeclaration
import com.google.devtools.ksp.symbol.KSDeclaration
import com.google.devtools.ksp.symbol.KSPropertyDeclaration
import com.google.devtools.ksp.symbol.KSTypeReference
import com.google.devtools.ksp.symbol.Nullability

object ClassWriter {

    // TODO about support des annotations Jackson ? pr ignore de field
    fun toTs(parsed: ClassParser.Parsed): StringBuilder {
        val d = parsed.type.declaration as? KSClassDeclaration ?: throw IllegalArgumentException()
        val mapping = ClassMapper.mapClass(d)
        val sb = StringBuilder()
        val parentIsSealedClass = let {
            val parentSealedSubClasses =
                (parsed.type.declaration as KSClassDeclaration)
                    .superTypes
                    .mapNotNull { it.resolve().declaration as? KSClassDeclaration }
                    .flatMap { it.getSealedSubclasses() }
            parentSealedSubClasses.count() != 0
        }
        if (mapping == null) {
            when (d.classKind) {
                ClassKind.INTERFACE -> TODO()
                ClassKind.CLASS -> {
                    // TODO filtre sur l'existence de properties devrait être fait à la selection
                    // initiale => ou pas pour les sealed
                    val properties =
                        d.declarations.mapNotNull { it as? KSPropertyDeclaration }.toList()
                    if (properties.isNotEmpty() || parentIsSealedClass) {
                        // TODO about class qui ne sont pas des data class
                        sb.appendLine("export interface ${className(d)} {")
                        if (parentIsSealedClass) {
                            sb.appendLine("  objectType: '${className(d)}';")
                        }
                        d.declarations
                            .mapNotNull { it as? KSPropertyDeclaration }
                            .forEach {
                                val nullableMark =
                                    when (it.type.resolve().nullability) {
                                        Nullability.NULLABLE -> "?"
                                        Nullability.NOT_NULL,
                                        Nullability.PLATFORM -> ""
                                    }
                                sb.appendLine(
                                    "  ${it.simpleName.asString()}$nullableMark: ${propertyClassName(it.type).name};")
                            }
                        sb.appendLine("}")
                        sb.appendLine("")
                    } else {
                        val subTypes = d.getSealedSubclasses().toList()
                        //                                .filter {
                        //                                it.declarations
                        //                                    .mapNotNull { it as?
                        // KSPropertyDeclaration }
                        //                                    .toList()
                        //                                    .isNotEmpty()
                        //                            }
                        if (subTypes.isNotEmpty()) {
                            sb.appendLine("export type ${className(d)} =")
                            subTypes.forEach { sb.appendLine("  | ${className(it)}") }
                            sb.appendLine("")
                        }
                    }
                }
                ClassKind.ENUM_CLASS -> {
                    sb.appendLine("export type ${className(d)} = ")
                    d.declarations
                        .filterIsInstance<KSClassDeclaration>()
                        .filter { it.classKind == ClassKind.ENUM_ENTRY }
                        .forEach { sb.appendLine(" | '${it.simpleName.asString()}'") }
                    sb.appendLine("")
                    //                    d.declarations.toList().forEach { Debug.add("$it
                    // ${it::class.java}") }
                }
                ClassKind.ENUM_ENTRY -> TODO()
                ClassKind.OBJECT -> {
                    if (d.declarations
                        .toList()
                        .filterIsInstance<KSPropertyDeclaration>()
                        .isNotEmpty()) {
                        TODO()
                    } else {
                        // TODO pas fou mais seule façon de gérer EmptyCommandResponse pr le moment
                        if (parentIsSealedClass) {
                            sb.appendLine("export interface ${className(d)} {")
                            sb.appendLine("  objectType: '${className(d)}';")
                            sb.appendLine("}")
                            sb.appendLine("")
                        }
                    }
                }
                ClassKind.ANNOTATION_CLASS -> TODO()
            }
        } else {
            sb.appendLine("export type ${className(d)} = ${mapping.name};")
            sb.appendLine("")
        }
        return sb
    }

    fun className(d: KSDeclaration): String {
        // TODO is enough ? only KSClassDeclaration can contain inner classes ?
        val parent = d.parentDeclaration as? KSClassDeclaration
        val prefix = parent?.let { className(it) + "$" } ?: ""
        return prefix + d.simpleName.asString()
    }

    fun propertyClassName(t: KSTypeReference) =
        ClassMapper.mapProperty(t) ?: ClassMapper.ClassMapping(className(t.resolve().declaration))
}
