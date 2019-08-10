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
                get("/pos") {
                    // TODO: POST
                    println("hir I get")
                    val msg = Message(
                        call.request.queryParameters["id"] ?: throw NullPointerException("No number specified"),
                        Position(
                            call.request.queryParameters["lat"]?.toDouble()
                                ?: throw NullPointerException("No number specified"),
                            call.request.queryParameters["lon"]?.toDouble()
                                ?: throw NullPointerException("No number specified")
                        ),
                        LocalDateTime.now(), call.request.queryParameters["stat"]
                    )
                    println("Number: ${msg.trainID}\nPosition: ${msg.position}")
                    println(msg)
                    msgCache.put(AffinityUuid(msg), msg)
                }
            }
        }

        val restServer = embeddedServer(Netty, port = 8081) {
            routing {
                get("/stat") {
                    //println("Number: ${call.request.queryParameters["id"]}")
                    val tr = posCache.get(call.request.queryParameters["id"])
                    println(tr)
                    call.respondText(tr.toString())
                }
            }
        }
        msgServer.start()
        restServer.start()
    }
}