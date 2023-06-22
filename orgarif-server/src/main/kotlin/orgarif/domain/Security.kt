package orgarif.domain

import orgarif.utils.OrgarifStringUtils

data class PlainStringPassword(val password: String) {
    override fun toString() = "Password(${OrgarifStringUtils.filteredPassword})"
}

data class HashedPassword(val hash: String) {
    // [doc] even it's a hash, there's no reason to print it clean anywhere
    override fun toString() = "HashedPassword(${OrgarifStringUtils.filteredPassword})"
}

abstract class OrgarifSecurityString {

    companion object {
        const val displayBeforeMask = 8
        const val minimalLength = 20
    }

    open val rawString: String

    constructor(rawString: String) {
        this.rawString = rawString
        if (length() < minimalLength) {
            // because of mask
            throw IllegalArgumentException(
                "${javaClass.simpleName} minimal length is ${length()}, should not be less than $minimalLength")
        }
        if (rawString.length != length()) {
            throw IllegalArgumentException(
                "${javaClass.simpleName} length must be ${length()} (not ${rawString.length})")
        }
    }

    abstract fun length(): Int

    final override fun toString(): String {
        val mask =
            rawString.substring(0, displayBeforeMask).padEnd(length() - displayBeforeMask, '*')
        return "${javaClass.simpleName}($mask)"
    }
}
