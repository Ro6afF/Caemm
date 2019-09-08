import org.apache.ignite.Ignite
import org.apache.ignite.Ignition
import org.apache.ignite.cache.affinity.AffinityUuid
import org.apache.ignite.cache.query.ContinuousQuery

class Aggregator : IProcessor {
    private var ignite: Ignite? = null

    override fun start() {
        ignite = Ignition.start(CacheConfig.igniteConfig())
        val msgCache = ignite?.getOrCreateCache(CacheConfig.msgConf())
        val posCache = ignite?.getOrCreateCache(CacheConfig.posConf())
        val qry = ContinuousQuery<AffinityUuid, Message>()
        qry.setLocalListener { evts ->
            evts.forEach { e ->
                posCache?.put(e.value.trainID, e.value)
            }
        }
        msgCache?.query(qry)
    }

    override fun stop() {
        Ignition.stop(true)
    }
}