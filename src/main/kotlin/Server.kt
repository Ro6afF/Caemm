import io.ktor.application.call
import io.ktor.http.ContentType
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import org.apache.ignite.Ignition
import org.apache.ignite.configuration.IgniteConfiguration

object Server {
    @JvmStatic fun main(args: Array<String>) {
        val ignite = Ignition.start(CacheConfig.igniteConfig())
        val msgCache = ignite.getOrCreateCache(CacheConfig.msgConf())
        val server = embeddedServer(Netty, port = 8080) {
            routing {
                get("/") {
                    call.respondText("Hielou tu ze api!", ContentType.Text.Plain)
                }
                get("/pos") {
                    println("Number: ${call.request.queryParameters["num"]}\nPosition: ${call.request.queryParameters["pos"]}")
                    msgCache.put(call.request.queryParameters["num"], call.request.queryParameters["pos"])
                }
            }
        }
        server.start()
    }
}