package orgarif.error

class AppErrors {
    class NotConnectedUser : Exception()

    // [doc] when you're missing autorization for an object
    class ForbiddenAccess : Exception()

    // TODO[error] better naming ? Error has been handled ?
    class SilentError : Exception()

    class UnexpectedRuntime
}