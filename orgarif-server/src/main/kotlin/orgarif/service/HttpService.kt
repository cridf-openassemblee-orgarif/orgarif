package orgarif.service

import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import org.springframework.stereotype.Service

@Service
class HttpService(val okHttpClient: OkHttpClient) {

    val jsonMediaType = "application/json; charset=utf-8".toMediaType()

    data class Header(val header: String) {
        companion object {
            val Authorization = Header("Authorization")
            val Accept = Header("Accept")
        }
    }

    enum class Method(val asString: String) {
        get("GET"),
        post("POST"),
        put("PUT")
    }

    data class EmptyResponse(val code: Int)

    // FIXME empty/body response is a smart cut ? doesn't say if 200 or error...
    // + what is a getString() with EmptyResponse ? Possible with an error...
    // ErrorResponse, with optional body ?
    // OkEmptyResponse -> UnexpectedException ?
    // OkStringResponse
    // sealed ok / ko ? return sealed ok / ko + sealed empty/body
    // what permits the simpler/cleaner code ?
    sealed class MaybeStringResponse(open val code: Int) {
        data class EmptyResponse(override val code: Int) : MaybeStringResponse(code)
        data class StringResponse(override val code: Int, val body: String) :
            MaybeStringResponse(code)
    }

    sealed class MaybeBytesResponse(open val code: Int) {
        data class EmptyResponse(override val code: Int) : MaybeBytesResponse(code)
        data class BytesResponse(override val code: Int, val bytes: ByteArray) :
            MaybeBytesResponse(code)
    }

    fun getBytes(url: String, vararg headers: Pair<Header, String>): MaybeBytesResponse =
        doRequest(url, Method.get, null, *headers).use { r ->
            // bytes() calls close()
            r.body?.bytes()?.let { MaybeBytesResponse.BytesResponse(r.code, it) }
                ?: MaybeBytesResponse.EmptyResponse(r.code)
        }

    fun getString(url: String, vararg headers: Pair<Header, String>): MaybeStringResponse =
        doRequest(url, Method.get, null, *headers).use { r ->
            // string() calls close()
            r.body?.string()?.let { MaybeStringResponse.StringResponse(r.code, it) }
                ?: MaybeStringResponse.EmptyResponse(r.code)
        }

    fun post(url: String, body: String, vararg headers: Pair<Header, String>): EmptyResponse =
        doRequest(url, Method.post, body, *headers).use { r -> EmptyResponse(r.code) }

    fun postAndReturnBytes(
        url: String,
        body: String,
        vararg headers: Pair<Header, String>
    ): MaybeBytesResponse =
        doRequest(url, Method.post, body, *headers).use { r ->
            // bytes() calls close()
            r.body?.bytes()?.let { MaybeBytesResponse.BytesResponse(r.code, it) }
                ?: MaybeBytesResponse.EmptyResponse(r.code)
        }

    fun postAndReturnString(
        url: String,
        body: String,
        vararg headers: Pair<Header, String>
    ): MaybeStringResponse =
        doRequest(url, Method.post, body, *headers).use { r ->
            // string() calls close()
            r.body?.string()?.let { MaybeStringResponse.StringResponse(r.code, it) }
                ?: MaybeStringResponse.EmptyResponse(r.code)
        }

    fun put(url: String, body: String, vararg headers: Pair<Header, String>): EmptyResponse =
        doRequest(url, Method.put, body, *headers).use { r -> EmptyResponse(r.code) }

    fun putAndReturnBytes(
        url: String,
        body: String,
        vararg headers: Pair<Header, String>
    ): MaybeBytesResponse =
        doRequest(url, Method.put, body, *headers).use { r ->
            // bytes() calls close()
            r.body?.bytes()?.let { MaybeBytesResponse.BytesResponse(r.code, it) }
                ?: MaybeBytesResponse.EmptyResponse(r.code)
        }

    fun putAndReturnString(
        url: String,
        body: String,
        vararg headers: Pair<Header, String>
    ): MaybeStringResponse =
        doRequest(url, Method.put, body, *headers).use { r ->
            // string() calls close()
            r.body?.string()?.let { MaybeStringResponse.StringResponse(r.code, it) }
                ?: MaybeStringResponse.EmptyResponse(r.code)
        }

    private fun doRequest(
        url: String,
        method: Method,
        body: String?,
        vararg headers: Pair<Header, String>
    ): Response {
        val requestBuilder =
            Request.Builder().apply {
                url(url)
                addHeader(Header.Accept.header, jsonMediaType.toString())
                headers.forEach { addHeader(it.first.header, it.second) }
            }
        requestBuilder.method(method.asString, body?.toRequestBody(jsonMediaType))
        return okHttpClient.newCall(requestBuilder.build()).execute()
    }
}
