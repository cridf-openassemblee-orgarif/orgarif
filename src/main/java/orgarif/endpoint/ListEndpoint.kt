package orgarif.endpoint

import io.github.jhipster.web.util.PaginationUtil
import io.github.jhipster.web.util.ResponseUtil
import org.springframework.data.domain.Pageable
import org.springframework.http.ResponseEntity
import org.springframework.util.MultiValueMap
import org.springframework.web.bind.annotation.*
import org.springframework.web.util.UriComponentsBuilder
import orgarif.domain.Deliberation
import orgarif.domain.Organisme
import orgarif.service.ListService
import orgarif.util.ResponseUtilKt

@RestController
@RequestMapping("/api/list")
open class ListEndpoint(val listService: ListService) {

    @GetMapping("/organismes/last")
    open fun getLast(pageable: Pageable,
                     @RequestParam queryParams: MultiValueMap<String, String>,
                     uriBuilder: UriComponentsBuilder): ResponseEntity<List<Organisme>> {
        val page = listService.getOrganismes(pageable)
        val headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page)
        return ResponseEntity.ok().headers(headers).body(page.content)
    }

    @GetMapping("/organismes/{id}")
    open fun get(@PathVariable id: Long): ResponseEntity<Organisme> =
         ResponseUtilKt.wrapOrNotFound(listService.get(id))

    @GetMapping("/elus")
    open fun getElus(pageable: Pageable,
                     @RequestParam queryParams: MultiValueMap<String, String>,
                     uriBuilder: UriComponentsBuilder) =
        ResponseEntity.ok().body(listService.getElus())

}
