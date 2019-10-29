package orgarif.endpoint

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import orgarif.service.ElusSynchronizationService

@RestController
@RequestMapping("/remote-api")
open class RemoteApiEndpoint(val elusSynchronizationService: ElusSynchronizationService) {

    @PostMapping("/push-elus")
    open fun pushElus(@RequestBody elusJson: String): String {
        val elusNumber = elusSynchronizationService.handleElusJson(elusJson)
        return "ok - injected $elusNumber elus"
    }

}
