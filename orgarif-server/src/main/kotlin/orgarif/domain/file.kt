package orgarif.domain

// FIXMENOW trouver ailleurs ? A moins qu'on fasse une liste des trucs supportés
// auquel cas typer UserFileData
enum class MimeType(val fullType: String) {
    javascript("application/javascript"),
    json("application/json"),
    pdf("application/pdf")
}