package orgarif.tools

import orgarif.service.RandomService
import java.util.*

fun main() {
    val uuid = UUID.randomUUID()
    println(uuid.toString())
    println(uuid.toString().replace("-", ""))
    println(uuid.toString().replace("-", "").substring(0, 6))
}