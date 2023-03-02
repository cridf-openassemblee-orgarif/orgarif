package orgarif.tooling

import com.google.devtools.ksp.symbol.KSClassDeclaration
import com.google.devtools.ksp.symbol.KSNode
import com.google.devtools.ksp.visitor.KSEmptyVisitor

class KtToTsVisitor : KSEmptyVisitor<Set<ClassParser.Parsed>, Set<ClassParser.Parsed>>() {

    override fun defaultHandler(node: KSNode, data: Set<ClassParser.Parsed>) = data

    override fun visitClassDeclaration(d: KSClassDeclaration, data: Set<ClassParser.Parsed>) =
        ClassParser.parse(d.asStarProjectedType(), data)
}
