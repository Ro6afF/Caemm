import com.google.gson.Gson
import io.ktor.application.call
import io.ktor.response.header
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import org.apache.ignite.Ignition
import org.apache.ignite.cache.affinity.AffinityUuid
import java.lang.NullPointerException
import java.time.LocalDateTime
import org.apache.ignite.cache.query.ScanQuery

object Server {
    @JvmStatic
    fun main(args: Array<String>) {
        val ignite = Ignition.start(CacheConfig.igniteConfig())
        val posCache = ignite.getOrCreateCache(CacheConfig.posConf())
        val msgCache = ignite.getOrCreateCache(CacheConfig.msgConf())
        val gson = Gson()
        val msgServer = embeddedServer(Netty, port = 8080) {
            routing {
                get("/pos") {
                    // TODO: POST
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
                    msgCache.put(AffinityUuid(msg), msg)
                }
            }
        }

        val restServer = embeddedServer(Netty, port = 8081) {
            routing {
                get("/all") {
                    val arr = posCache.query(ScanQuery<String, Message> { _, _ -> true}).all.map {x -> x.value}
                    call.response.header("Access-Control-Allow-Origin", "*")
                    call.respondText(gson.toJson((arr)))
                }
                get("/stat") {
                    val tr = posCache.get(call.request.queryParameters["id"])
                    call.response.header("Access-Control-Allow-Origin", "*")
                    call.respondText(gson.toJson(tr))
                }
            }
        }
        msgServer.start()
        restServer.start()
    }
}