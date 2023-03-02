package orgarif.tooling

object Debug {

    val sb = StringBuilder()

    fun add(s: String?) {
        sb.appendLine(s)
    }
}
