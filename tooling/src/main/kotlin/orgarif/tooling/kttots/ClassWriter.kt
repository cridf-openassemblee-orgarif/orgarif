package orgarif.tooling.kttots

import com.google.devtools.ksp.symbol.ClassKind
import com.google.devtools.ksp.symbol.KSClassDeclaration
import com.google.devtools.ksp.symbol.KSPropertyDeclaration
import com.google.devtools.ksp.symbol.KSTypeReference
import com.google.devtools.ksp.symbol.Nullability

object ClassWriter {

    // TODO[tmpl] about support of Jackson annotations ? field @Ignore
    fun toTs(parsed: ClassParser.Parsed): StringBuilder {
        val d = parsed.type.declaration as? KSClassDeclaration ?: throw IllegalArgumentException()
        val mapping = ClassMapper.mapClass(d)
        val sb = java.lang.StringBuilder()
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
                    // TODO[tmpl] filtering on properties existence should be done at initial
                    // selection => or not for sealed
                    val properties =
                        d.declarations.mapNotNull { it as? KSPropertyDeclaration }.toList()
                    if (properties.isNotEmpty() || parentIsSealedClass) {
                        // TODO[tmpl] about class which are not data classes
                        sb.appendLine("export interface ${d.simpleName.asString()} {")
                        if (parentIsSealedClass) {
                            sb.appendLine("  objectType: '${d.simpleName.asString()}';")
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
                                    "  ${it.simpleName.asString()}$nullableMark: ${className(it.type).name};")
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
                            sb.appendLine("export type ${d.simpleName.asString()} =")
                            subTypes.forEach { sb.appendLine("  | ${it.simpleName.asString()}") }
                            sb.appendLine("")
                        }
                    }
                }
                ClassKind.ENUM_CLASS -> {
                    sb.appendLine("export type ${d.simpleName.asString()} = ")
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
                        // TODO[tmpl] not good but the only way to handle EmptyCommandResponse for the moment
                        if (parentIsSealedClass) {
                            sb.appendLine("export interface ${d.simpleName.asString()} {")
                            sb.appendLine("  objectType: '${d.simpleName.asString()}';")
                            sb.appendLine("}")
                            sb.appendLine("")
                        }
                    }
                }
                ClassKind.ANNOTATION_CLASS -> TODO()
            }
        } else {
            sb.appendLine("export type ${d.simpleName.asString()} = ${mapping.name};")
            sb.appendLine("")
        }
        return sb
    }

    fun className(t: KSTypeReference) =
        ClassMapper.mapProperty(t)
            ?: ClassMapper.ClassMapping(t.resolve().declaration.simpleName.asString())
}
