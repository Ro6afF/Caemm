import org.apache.ignite.cache.CacheMode
import org.apache.ignite.cache.affinity.AffinityUuid
import org.apache.ignite.configuration.CacheConfiguration
import org.apache.ignite.configuration.IgniteConfiguration

object CacheConfig {
    fun posConf(): CacheConfiguration<String, String> {
        val cfg = CacheConfiguration<String, String>("positions")
        cfg.setIndexedTypes(String::class.java, String::class.java)
        cfg.cacheMode = CacheMode.PARTITIONED
        return cfg
    }

    fun msgConf(): CacheConfiguration<AffinityUuid, Message> {
        val cfg = CacheConfiguration<AffinityUuid, Message>("messages")
        cfg.setIndexedTypes(AffinityUuid::class.java, Message::class.java)
        cfg.cacheMode = CacheMode.PARTITIONED
        return cfg
    }

    fun igniteConfig(): IgniteConfiguration {
        val cfg = IgniteConfiguration()
        cfg.setCacheConfiguration(posConf(), msgConf())
        return cfg
    }
}