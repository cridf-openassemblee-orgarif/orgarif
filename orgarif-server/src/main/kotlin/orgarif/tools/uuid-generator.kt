package orgarif.tools

import java.util.UUID

fun main() {
    val uuid = UUID.randomUUID()
    println(uuid.toString())
    println(uuid.toString().replace("-", ""))
    println(uuid.toString().replace("-", "").substring(0, 6))
}
