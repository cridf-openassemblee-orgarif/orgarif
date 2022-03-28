package orgarif.controller

import mu.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartHttpServletRequest
import orgarif.domain.UserFileId
import orgarif.domain.UserFileReference
import orgarif.repository.user.UserDao
import orgarif.repository.user.UserFileDao
import orgarif.service.DateService
import orgarif.service.RandomService
import orgarif.service.user.UserService
import orgarif.service.user.UserSessionService

// TODO clean et write sur ce bordel
@RestController
class UploadController(
    val userFileDao: UserFileDao,
    val userDao: UserDao,
    val dateService: DateService,
    val userService: UserService,
    val randomService: RandomService,
    val userSessionService: UserSessionService
) {

    private val logger = KotlinLogging.logger {}

    //    @PostMapping(value = "/upload-file3")
    //    fun uploadFile3(@RequestBody file: MultipartFile): ResponseEntity<UUID> {
    //        return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
    //    }

    // via http://hmkcode.com/spring-mvc-upload-file-ajax-jquery-formdata/
    // , consumes = arrayOf("multipart/form-data")
    @PostMapping("/upload-file")
    fun uploadFile(request: MultipartHttpServletRequest): ResponseEntity<UserFileId> {
        // TODO write don't use MultipartFile
        // MultipartHttpServletRequest - filereader vs les autres methodes
        // ce qu'on faire avec angular 2 et angular (cf telerecour et cridf)
        if (request.fileMap.size != 1) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
        val file = request.fileMap.values.first()
        val userSession = userSessionService.getUserSession()
        try {
            val fileData = file.bytes
            val contentType =
                file.contentType
                    ?: throw java.lang.IllegalArgumentException("Upload with null contentType")
            val originalFilename =
                file.originalFilename
                    ?: throw java.lang.IllegalArgumentException("Upload with null originalFilename")
            val fileReference =
                UserFileReference(
                    randomService.id(),
                    userSession.userId,
                    contentType,
                    originalFilename,
                    dateService.now())
            userFileDao.insert(fileReference, fileData)
            return ResponseEntity.ok(fileReference.id)
        } catch (e: Exception) {
            // TODO politique exception
            logger.error(e) { "Unable to read uploaded file for $userSession" }
            return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    // , consumes = arrayOf("multipart/form-data")
    //    @PostMapping(value = "/upload-file2")
    //    fun uploadFile2(@RequestParam("file") file: MultipartFile): ResponseEntity<UUID> {
    //        // TODO write don't use MultipaslartFile
    //        // MultipartHttpServletRequest - filereader vs les autres methodes
    //        // ce qu'on faire avec angular 2 et angular (cf telerecour et cridf)
    //        val user = CurrentUserSession.getUser()
    //
    //        if (file.isEmpty) {
    //            return ResponseEntity(HttpStatus.BAD_REQUEST)
    //        }
    //        try {
    //            val resultId = userFileDao.insert(UserFile(file.contentType, file.bytes,
    // file.originalFilename))
    //            return ResponseEntity.ok().body(resultId)
    //        } catch (e: Exception) {
    //            // TODO politique exception PUTAIN
    //            logger.error(e) { "Unable to read uploaded file for ${user.email}" }
    //            return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
    //        }
    //        return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
    //    }

}
