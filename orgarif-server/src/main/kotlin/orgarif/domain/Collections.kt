package orgarif.domain

fun <T> List<T>.firstAndOnlyOne(): T {
    if (size != 1) {
        throw IllegalArgumentException("Collection has $size elements.")
    }
    return first()
}

fun <T> List<T>.firstAndOnlyOne(select: (v: T) -> Boolean): T {
    val s = filter(select)
    if (s.size != 1) {
        throw IllegalArgumentException("Collection has ${s.size} elements.")
    }
    return s.first()
}
