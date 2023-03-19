package orgarif.domain

// [doc] This Uri exists because neither JDK URI or Path can :
// * resolve with slashes handling (ko URI)
// * handle HTTP params (ko Path)
// * permit Spring config instanciation (ko Path)
data class Uri(val path: String) : SerializeAsString(path) {

    fun resolve(add: Uri) = resolve(add.path)

    fun resolve(add: String): Uri {
        val root = path.trimEnd { it == '/' }
        val leaf = add.trimStart { it == '/' }
        return Uri("$root/$leaf")
    }

    fun append(value: String): Uri {
        if (value.startsWith("/")) {
            throw IllegalArgumentException("Use resolve() for path parts")
        }
        return Uri(path + value)
    }
}
