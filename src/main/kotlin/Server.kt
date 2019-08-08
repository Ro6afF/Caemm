import io.ktor.application.call
import io.ktor.http.ContentType
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import org.apache.ignite.Ignition
import org.apache.ignite.cache.affinity.AffinityUuid
import org.apache.ignite.configuration.CacheConfiguration
import java.lang.NullPointerException

object Server {
    @JvmStatic
    fun main(args: Array<String>) {
        val ignite = Ignition.start(CacheConfig.igniteConfig())
        val posCache = ignite.getOrCreateCache(CacheConfig.posConf())
        val msgCache = ignite.getOrCreateCache(CacheConfig.msgConf())
        val msgServer = embeddedServer(Netty, port = 8080) {
            routing {
                get("/pos") {
                    val msg = Message(
                        call.request.queryParameters["num"] ?: throw NullPointerException("No number specified"),
                        call.request.queryParameters["pos"] ?: throw NullPointerException("No position specified")
                    )
                    println("Number: ${msg.number}\nPosition: ${msg.position}")

                    msgCache.put(AffinityUuid(msg), msg)
//                    posCache.put(call.request.queryParameters["num"], call.request.queryParameters["pos"])
                }
            }
        }
        val feServer = embeddedServer(Netty, port = 8081) {
            routing {
                get("/pos") {
                    println("Number: ${call.request.queryParameters["num"]}")
                    call.respondText(posCache.get(call.request.queryParameters["num"]))
                }
            }
        }
        msgServer.start()
        feServer.start()
    }
}