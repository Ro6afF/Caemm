import org.apache.ignite.Ignition
import org.apache.ignite.cache.affinity.AffinityUuid
import org.apache.ignite.cache.query.ContinuousQuery


object Cluster {
    @JvmStatic
    fun main(args: Array<String>) {
        val ignite = Ignition.start(CacheConfig.igniteConfig())
        val msgCache = ignite.getOrCreateCache(CacheConfig.msgConf())
        val posCache = ignite.getOrCreateCache(CacheConfig.posConf())
        val qry = ContinuousQuery<AffinityUuid, Message>()
        qry.setLocalListener { evts ->
            evts.forEach { e ->
                println("CQRY: ${e.value.trainID}: ${e.value.position}")
                posCache.put(e.value.trainID, e.value)
            }
        }
        msgCache.query(qry)
    }
}