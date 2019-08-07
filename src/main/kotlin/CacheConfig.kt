import org.apache.ignite.cache.CacheMode
import org.apache.ignite.configuration.CacheConfiguration
import org.apache.ignite.configuration.IgniteConfiguration

object CacheConfig {
    fun msgConf(): CacheConfiguration<String, String> {
        val cfg = CacheConfiguration<String, String>("messages")
        cfg.setIndexedTypes(String::class.java, String::class.java)
        cfg.cacheMode = CacheMode.PARTITIONED
        return cfg
    }

    fun igniteConfig(): IgniteConfiguration {
        val cfg = IgniteConfiguration()
        cfg.setCacheConfiguration(msgConf())
        return cfg
    }
}