package orgarif.error

class AppErrors {
    class NotConnectedUser : Exception()

    // [doc] quand tu n'avais pas les droits pour un objet
    class ForbiddenAccess : Exception()

    // TODO[error] meilleure terme ? Erreur traitée ?
    // deja
    class SilentError : Exception()

    class UnexpectedRuntime
}