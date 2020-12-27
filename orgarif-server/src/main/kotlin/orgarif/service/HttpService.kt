package orgarif.service

import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import org.springframework.stereotype.Service
import orgarif.domain.MimeType

@Service
class HttpService(val okHttpClient: OkHttpClient) {

    enum class HttpMediaType(val mediaType: MediaType) {
        form("application/x-www-form-urlencoded".toMediaType()),
        html("text/html; charset=UTF-8".toMediaType()),
        json("${MimeType.json.fullType}; charset=utf-8".toMediaType()),
    }

    enum class Header(val header: String) {
        AUTHORIZATION("Authorization"),
        ACCEPT("Accept")
    }

    data class EmptyResponse(val code: Int)

    data class StringResponse(val code: Int, val body: String?)

    data class BytesResponse(val code: Int, val bytes: ByteArray?)

    fun getString(url: String,
                  vararg headers: Pair<Header, String>): StringResponse =
            doGet(url, *headers).use {
                // string() calls close()
                StringResponse(it.code, it.body?.string())
            }

    fun getBytes(url: String,
                 vararg headers: Pair<Header, String>): BytesResponse =
            doGet(url, *headers).use {
                // bytes() calls close()
                BytesResponse(it.code, it.body?.bytes())
            }

    private fun doGet(url: String, vararg headers: Pair<Header, String>): Response {
        val requestBuilder = Request.Builder()
        requestBuilder.url(url)
        headers.forEach { requestBuilder.addHeader(it.first.header, it.second) }
        requestBuilder.get()
        return okHttpClient.newCall(requestBuilder.build()).execute()
    }

    fun post(url: String,
             body: String,
             httpMediaType: HttpMediaType,
             vararg headers: Pair<Header, String>): EmptyResponse =
            doPost(url, body, httpMediaType, *headers).use {
                EmptyResponse(it.code)
            }

    fun postAndReturnString(url: String,
                            body: String,
                            httpMediaType: HttpMediaType,
                            vararg headers: Pair<Header, String>): StringResponse =
            doPost(url, body, httpMediaType, *headers).use {
                // string() calls close()
                StringResponse(it.code, it.body?.string())
            }

    fun postAndReturnBytes(url: String,
                           body: String,
                           httpMediaType: HttpMediaType,
                           vararg headers: Pair<Header, String>): BytesResponse =
            doPost(url, body, httpMediaType, *headers).use {
                // bytes() calls close()
                BytesResponse(it.code, it.body?.bytes())
            }

    private fun doPost(url: String,
                       body: String,
                       httpMediaType: HttpMediaType,
                       vararg headers: Pair<Header, String>): Response {
        val requestBuilder = requestBuilder(url, httpMediaType, *headers)
        requestBuilder.post(body.toRequestBody(httpMediaType.mediaType))
        return okHttpClient.newCall(requestBuilder.build()).execute()
    }

    fun putAndReturnString(url: String,
                           body: String,
                           httpMediaType: HttpMediaType,
                           vararg headers: Pair<Header, String>): StringResponse =
            doPut(url, body, httpMediaType, *headers).use {
                // string() calls close()
                StringResponse(it.code, it.body?.string())
            }

    private fun doPut(url: String,
                      body: String,
                      httpMediaType: HttpMediaType,
                      vararg headers: Pair<Header, String>): Response {
        val requestBuilder = requestBuilder(url, httpMediaType, *headers)
        requestBuilder.put(body.toRequestBody(httpMediaType.mediaType))
        return okHttpClient.newCall(requestBuilder.build()).execute()
    }

    private fun requestBuilder(url: String,
                               httpMediaType: HttpMediaType,
                               vararg headers: Pair<Header, String>) = Request.Builder().apply {
        url(url)
        if (httpMediaType.mediaType == HttpMediaType.json.mediaType) {
            addHeader(Header.ACCEPT.header, HttpMediaType.json.mediaType.toString())
        }
        headers.forEach { addHeader(it.first.header, it.second) }
    }
}
