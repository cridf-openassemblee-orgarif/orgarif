package orgarif.tools

import java.util.*

fun main() {
    val id = UUID.randomUUID()
    println(id)
    println(id.toString().replace("-", ""))
}