package orgarif.service

import okhttp3.*
import org.springframework.stereotype.Service

@Service
open class HttpService(val okHttpClient: OkHttpClient) {

    enum class RequestBodyType(val mediaType: MediaType) {
        JSON(MediaType.parse("application/json; charset=utf-8")!!),
        FORM(MediaType.parse("application/x-www-form-urlencoded")!!)
    }

    enum class Header(val header: String) {
        AUTHORIZATION("Authorization"),
        ACCEPT("Accept")
    }

    data class EmptyResponse(val code: Int)

    data class StringResponse(val code: Int, val body: String?)

    data class BytesResponse(val code: Int, val bytes: ByteArray?)

    open fun getString(url: String,
                       vararg headers: Pair<Header, String>): StringResponse =
        get(url, *headers).use {
            // string() calls close()
            StringResponse(it.code(), it.body()?.string())
        }

    open fun getBytes(url: String,
                      vararg headers: Pair<Header, String>): BytesResponse =
        get(url, *headers).use {
            // bytes() calls close()
            BytesResponse(it.code(), it.body()?.bytes())
        }

    open fun get(url: String, vararg headers: Pair<Header, String>): Response {
        val requestBuilder = Request.Builder()
        requestBuilder.url(url)
        headers.forEach { requestBuilder.addHeader(it.first.header, it.second) }
        requestBuilder.get()
        return okHttpClient.newCall(requestBuilder.build()).execute()
    }

    open fun post(url: String,
                  body: String,
                  requestBodyType: RequestBodyType,
                  vararg headers: Pair<Header, String>): EmptyResponse =
        doPost(url, body, requestBodyType, *headers).use {
            EmptyResponse(it.code())
        }

    open fun postAndReturnString(url: String,
                                 body: String,
                                 requestBodyType: RequestBodyType,
                                 vararg headers: Pair<Header, String>): StringResponse =
        doPost(url, body, requestBodyType, *headers).use {
            // string() calls close()
            StringResponse(it.code(), it.body()?.string())
        }

    open fun postAndReturnBytes(url: String,
                                body: String,
                                requestBodyType: RequestBodyType,
                                vararg headers: Pair<Header, String>): BytesResponse =
        doPost(url, body, requestBodyType, *headers).use {
            // bytes() calls close()
            BytesResponse(it.code(), it.body()?.bytes())
        }

    private fun doPost(url: String,
                       body: String,
                       requestBodyType: RequestBodyType,
                       vararg headers: Pair<Header, String>): Response {
        val requestBuilder = Request.Builder()
        requestBuilder.url(url)
        if (requestBodyType.mediaType == RequestBodyType.JSON.mediaType) {
            requestBuilder.addHeader(Header.ACCEPT.header, RequestBodyType.JSON.mediaType.toString())
        }
        headers.forEach { requestBuilder.addHeader(it.first.header, it.second) }
        requestBuilder.post(RequestBody.create(requestBodyType.mediaType, body))
        return okHttpClient.newCall(requestBuilder.build()).execute()
    }
}
