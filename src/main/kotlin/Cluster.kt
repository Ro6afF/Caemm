import org.apache.ignite.Ignition
import org.apache.ignite.cache.affinity.AffinityUuid
import java.util.concurrent.TimeUnit
import org.apache.ignite.cache.query.ContinuousQuery
import org.apache.ignite.cache.query.SqlQuery


object Cluster {
    @JvmStatic
    fun main(args: Array<String>) {
        val ignite = Ignition.start(CacheConfig.igniteConfig())
        val msgCache = ignite.getOrCreateCache(CacheConfig.msgConf())
        val posCache = ignite.getOrCreateCache(CacheConfig.posConf())
        val qry = ContinuousQuery<AffinityUuid, Message>()
        qry.setLocalListener { evts ->
            evts.forEach { e ->
                println("CQRY: ${e.value.number}: ${e.value.position}")
                posCache.put(e.value.number, e.value.position)
            }
        }
        msgCache.query(qry)
    }
}