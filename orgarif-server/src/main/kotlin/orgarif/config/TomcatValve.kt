package orgarif.config

import mu.KotlinLogging
import org.apache.catalina.connector.Request
import org.apache.catalina.connector.Response
import org.apache.catalina.valves.ValveBase

class TomcatValve : ValveBase() {

    val logger = KotlinLogging.logger {}

    override fun invoke(request: Request, response: Response) {
        // because the application is deployed behind a proxy
        // TODO[tmpl] why Spring seems not to handle it with
        // server.forward-headers-strategy=framework ?
        val forwardedProto = request.getHeader("X-Forwarded-Proto")
        if (forwardedProto != null) {
            request.isSecure = forwardedProto == "https"
        }
        if ("//" in request.request.requestURI) {
            // this log is here cause tomcat won't log
            logger.error {
                "Request contains double slash and will fail: \"${request.request.requestURI}\""
            }
        }
        getNext().invoke(request, response)
    }
}
