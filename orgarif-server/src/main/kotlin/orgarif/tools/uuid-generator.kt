package orgarif.tools

import orgarif.service.RandomService

fun main() {
    val uuid = RandomService().randomUUID()
    println(uuid.toString())
    println(uuid.toString().replace("-", ""))
    println(uuid.toString().replace("-", "").substring(0, 6))
}