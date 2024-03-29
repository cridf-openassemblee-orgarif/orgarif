package orgarif.controller

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import orgarif.domain.UserFileId
import orgarif.repository.user.UserFileDao
import orgarif.utils.toTypeId

@Controller
class UserFileController(private val userFileDao: UserFileDao) {

    @GetMapping("/user-file/{id}")
    fun getUserFile(@PathVariable id: String): ResponseEntity<ByteArray> {
        // TODO[tmpl][secu]
        val userFileId = id.toTypeId<UserFileId>()
        val userFile =
            userFileDao.fetchDataOrNull(userFileId) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        val headers = HttpHeaders()
        headers.contentType = MediaType.parseMediaType(userFile.contentType.type)
        return ResponseEntity.ok().headers(headers).body(userFile.file)
    }
}
