package orgarif.tools

import orgarif.service.RandomService

fun main() {
    val random = RandomService()
    val uuid = random.uuid()
    println(uuid.toString())
    println(uuid.toString().replace("-", ""))
    println(uuid.toString().replace("-", "").substring(0, 6))
    println(random.randomString(100))
}
