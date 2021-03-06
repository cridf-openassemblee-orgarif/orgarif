package orgarif.controller

import orgarif.domain.UserFileId
import orgarif.repository.UserFileDao
import orgarif.utils.OrgarifStringUtils
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable

@Controller
class UserFileController(val userFileDao: UserFileDao) {

    @GetMapping("/user-file/{id}")
    fun getUserFile(@PathVariable id: String): ResponseEntity<ByteArray> {
        // TODO[secu] todo secu
        val userFileId = UserFileId(OrgarifStringUtils.deserializeUuid(id))
        val userFile = userFileDao.fetchData(userFileId)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        val headers = HttpHeaders()
        headers.contentType = MediaType.parseMediaType(userFile.contentType)
        return ResponseEntity.ok()
            .headers(headers)
            .body(userFile.file)
    }
}
