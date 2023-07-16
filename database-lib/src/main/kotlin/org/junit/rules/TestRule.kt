package org.junit.rules

/**
 * This is only to fake and compile testcontainers. Use <code>configurations.all { exclude(group =
 * "junit", module = "junit") }</code> in your build.gradle.kts to exclude junit4 from classpath and
 * use this instead. cf https://github.com/testcontainers/testcontainers-java/issues/970
 */
interface TestRule
