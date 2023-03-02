package orgarif.service

import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import okhttp3.ResponseBody
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service

@Service
class HttpService(val okHttpClient: OkHttpClient) {

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

    fun execute(
        method: HttpMethod,
        url: String,
        body: String? = null,
        vararg headers: Pair<Header, String>
    ): Response {
        val requestBuilder =
            Request.Builder().apply {
                url(url)
                header(Header.Accept.header, jsonMediaType.toString())
                header(Header.ContentType.header, jsonMediaType.toString())
                headers.forEach { header(it.first.header, it.second) }
            }
        requestBuilder.method(method.name, body?.toRequestBody())
        return okHttpClient.newCall(requestBuilder.build()).execute().use { r ->
            Response(HttpStatus.valueOf(r.code), r.body)
        }
    }
}
