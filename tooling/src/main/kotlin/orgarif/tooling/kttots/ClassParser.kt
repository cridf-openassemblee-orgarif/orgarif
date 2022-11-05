package orgarif.tooling.kttots

import com.google.devtools.ksp.symbol.KSClassDeclaration
import com.google.devtools.ksp.symbol.KSFile
import com.google.devtools.ksp.symbol.KSPropertyDeclaration
import com.google.devtools.ksp.symbol.KSType
import com.google.devtools.ksp.symbol.KSTypeReference
import orgarif.tooling.kttots.ClassMapper.mapProperty

// TODO name
object ClassParser {

    val packageExceptions = setOf("java", "jdk", "kotlin")

    // premier parsing remonte toute les dépendance, s'arrête à toute dépendance connue
    // second parsing parse tous les champs de toute la selection initiale, sans recursivité,
    // mais exhaustivement

    //    data class Dependency(val declaration: KSClassDeclaration, val generics:
    // List<KSClassDeclaration>)

    //    data class ParsedType(val name: String, val path: String, val arguments: List<ParsedType>)
    //
    //    data class ParsedField(val name: String, val type: ParsedType)

    // TODO name
    data class Parsed(
        // TOOD KSType vs KSDeclaration
        val type: KSType,
        val file: KSFile?,
        val dependencies: Set<KSTypeReference>,
        // TODO on devrait ? pr ne pas refaire ce mapping sans arrêt ?
        //        val mapping: ClassMapper.ClassMapping?,
        //        val otherImports: List<String>,
        //        val fields: List<ParsedField>,
        //        val addObjectType: Boolean,
        val debug: Any? = null
    ) {
        // without it we have duplicates (KS* comparison doesn't work as expected)
        override fun equals(other: Any?) =
            if (other is Parsed) {
                type.declaration.qualifiedName == other.type.declaration.qualifiedName
            } else {
                false
            }

        override fun hashCode() = type.declaration.qualifiedName.hashCode()
    }

    // TODO cette gestion des sealed est extrêmement limitée...
    // marche bien si un field utilise l'objet sealed et pas une sous classe
    fun parse(t: KSType, data: Set<Parsed>): Set<Parsed> {
        let {
            val p = t.declaration.packageName.asString()
            val i = p.indexOf(".")
            val packageStartWith = if (i != -1) p.substring(0, i) else p
            if (packageStartWith in packageExceptions) {
                return data
            }
        }
        val d = t.declaration as? KSClassDeclaration ?: throw IllegalArgumentException()
        val dependencies =
            d.declarations
                //                .mapNotNull { (it as?
                // KSPropertyDeclaration)?.type?.resolve()?.declaration }
                .mapNotNull { it as? KSPropertyDeclaration }
                .flatMap { mapDependencies(it.type) }
                //                .map { it.resolve() }
                //                .filterIsInstance<KSClassDeclaration>()
                //                .mapNotNull { mapDependency(it) }
                .toSet()
        val alreadySet = data.map { it.type }.toSet()
        return (data + Parsed(t, d.containingFile, dependencies))
            .let {
                dependencies
                    // [doc] infinite loop is possible without it
                    // TODO test works as expected !
                    .filter { it.resolve() !in alreadySet }
                    .fold(it) { acc, d -> parse(d.resolve(), acc) }
            }
            // TODO a priori on pourrait aussi utiliser findActuals
            .let {
                // TODO infinite loop is possible ?
                d.getSealedSubclasses().fold(it) { acc, d -> parse(d.asStarProjectedType(), acc) }
            }
    }

    //    fun test(kd: KSDeclaration): KSDeclaration? {
    //        val d = (kd as? KSPropertyDeclaration)?.type?.resolve()?.declaration as?
    // KSClassDeclaration
    //        if (d == null) {
    //            return kd
    //        }
    //        val a = allAscendance(d)
    //        if (mapAscendanceToScalar(a) != null) {
    //            return null
    //        }
    //        if (Collection::class.qualifiedName in a) {
    //            //            Debug.add("${kd}")
    //            //            Debug.add("${kd::class.java}")
    //            val t = kd as? KSPropertyDeclaration
    //            t!!
    //            Debug.add("${t.type.element?.typeArguments}")
    //            Debug.add("---")
    //            //            Debug.add("${t.typeParameters}")
    //            t.type
    //        }
    //        return kd
    //    }

    // TODO test : generic avec des generic dedans
    fun mapDependencies(t: KSTypeReference): List<KSTypeReference> {
        //        val d = t.resolve().declaration as? KSClassDeclaration
        //        val a = allAscendance(classDeclaration)
        // TODO cette façon de remonter ancestry est une super mauvais idée en fait
        // on pourrait avoir soi-meme crée une classe héritante (qui gère au passage le generic)
        //        if (Collection::class.qualifiedName in a) {
        //            val element =
        //                d.type.element
        //                    ?: let {
        //                        // TODO
        ////                        Debug.add()
        //                        throw IllegalArgumentException()
        //                    }
        //            val typeArgument = element.typeArguments
        //            return Dependency(typeArgument.)
        //        }
        // [doc] for type with generic
        // TODO pas de scenario où
        val arguments =
            t.element
                ?.typeArguments
                ?.mapNotNull { it.type }
                // TODO ICI on peut tomber dans une boucle circulaire infinie ??
                // mais NE PAS utiliser data pour filtrer, il faut un set contextuel
                ?.flatMap { mapDependencies(it) }
                ?: emptyList()
        // TODO pas ouf de procéder comme ça en vrai, sortir les mapped pour les refaire derrière
        val r =
            if (mapProperty(t) == null) {
                listOf(t)
            } else {
                emptyList()
            }
        return r + arguments
    }

    //    fun mapDependency(d: KSClassDeclaration): KSClassDeclaration? {
    //        val a = allAscendance(d)
    //        if (mapAscendanceToScalar(a) != null) {
    //            return null
    //        }
    //        if (Collection::class.qualifiedName in a) {
    //            //            d.asType(emptyList())
    //            //            Debug.add("${d.qualifiedName?.asString()} :")
    //            //
    //            //            Debug.add(
    //            //                "${d.asType(emptyList()).arguments.mapNotNull {
    //            // it.type!!.resolve().declaration.qualifiedName!!.asString() }}")
    //            //
    //            // Debug.add("${d.asType(emptyList()).declaration.qualifiedName?.asString()}")
    //            return null
    //        }
    //        return d
    //    }

    //    fun mapToScalar(d: KSClassDeclaration): String? = mapAscendanceToScalar(allAscendance(d))

    // TODO naming ancestry ?
    //    fun mapAscendanceToScalar(a: Set<String>): String? {
    //        if (UUID::class.qualifiedName in a) {
    //            return ""
    //        }
    //        if (Number::class.qualifiedName in a) {
    //            return ""
    //        }
    //        if (String::class.qualifiedName in a) {
    //            return ""
    //        }
    //        if (String::class.qualifiedName in a) {
    //            return ""
    //        }
    //        //        if (Comparable::class.qualifiedName in a) {
    //        //            return ""
    //        //        }
    //        //        if (CharSequence::class.qualifiedName in a) {
    //        //            return ""
    //        //        }
    //        return null
    //    }

}
