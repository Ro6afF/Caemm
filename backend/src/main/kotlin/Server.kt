import io.ktor.application.call
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import org.apache.ignite.Ignition
import org.apache.ignite.cache.affinity.AffinityUuid
import java.lang.NullPointerException
import java.time.LocalDateTime

object Server {
    @JvmStatic
    fun main(args: Array<String>) {
        val ignite = Ignition.start(CacheConfig.igniteConfig())
        val posCache = ignite.getOrCreateCache(CacheConfig.posConf())
        val msgCache = ignite.getOrCreateCache(CacheConfig.msgConf())
        val msgServer = embeddedServer(Netty, port = 8080) {
            routing {
                get("/pos") {// TODO: POST
                    val msg = Message(
                        call.request.queryParameters["num"] ?: throw NullPointerException("No number specified"),
                        call.request.queryParameters["pos"] ?: throw NullPointerException("No position specified"),
                        LocalDateTime.now(), call.request.queryParameters["stat"]
                    )
                    println("Number: ${msg.trainID}\nPosition: ${msg.position}")

                    msgCache.put(AffinityUuid(msg), msg)
                }
            }
        }

        val restServer = embeddedServer(Netty, port = 8081) {
            routing {
                get("/stat") {
                    println("Number: ${call.request.queryParameters["num"]}")
                    call.respond(posCache.get(call.request.queryParameters["num"]))
                }
            }
        }
        msgServer.start()
        restServer.start()
    }
}