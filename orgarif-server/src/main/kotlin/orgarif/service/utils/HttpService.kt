package orgarif.service.utils

import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.ResponseBody
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import orgarif.domain.Uri

@Service
class HttpService(private val okHttpClient: OkHttpClient) {

    companion object {
        val jsonMediaType = "application/json; charset=utf-8".toMediaType()
    }

    data class Header(val header: String) {
        companion object {
            val Authorization = Header(HttpHeaders.AUTHORIZATION)
            val Accept = Header(HttpHeaders.ACCEPT)
            val ContentType = Header(HttpHeaders.CONTENT_TYPE)
        }
    }

    data class Response(val code: HttpStatus, private val responseBody: ResponseBody?) {
        private val buffer = responseBody?.bytes()

        val body: ByteArray?
            get() = buffer

        val bodyString: String?
            get() = buffer?.toString(Charsets.UTF_8)
    }

    fun execute(method: HttpMethod, url: Uri, vararg headers: Pair<Header, String>) =
        execute(method, url, null, *headers)

    fun execute(method: HttpMethod, url: Uri, body: String, vararg headers: Pair<Header, String>) =
        execute(method, url, body.toRequestBody(), *headers)

    fun execute(
        method: HttpMethod,
        url: Uri,
        body: RequestBody?,
        vararg headers: Pair<Header, String>
    ): Response =
        Request.Builder()
            .apply {
                url(url.path)
                header(Header.Accept.header, jsonMediaType.toString())
                header(Header.ContentType.header, jsonMediaType.toString())
                headers.forEach { header(it.first.header, it.second) }
                method(method.name(), body)
            }
            .build()
            .let { okHttpClient.newCall(it) }
            .execute()
            .use { r -> Response(HttpStatus.valueOf(r.code), r.body) }
}
