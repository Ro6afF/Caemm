import org.apache.ignite.Ignition
import org.apache.ignite.cache.query.SqlQuery
import java.util.concurrent.TimeUnit

object Cluster {
    @JvmStatic fun main(args: Array<String>) {
        val ignite = Ignition.start(CacheConfig.igniteConfig())
        val msgCache = ignite.getOrCreateCache(CacheConfig.msgConf())
        val qry = SqlQuery<String, String>(String::class.java, "true")
        while (true) {
            val kur = msgCache.query(qry)
            for (i in kur) {
                println("${i.key}: ${i.value}")
            }
            println("kurzateb")
            TimeUnit.SECONDS.sleep(1)
        }
    }
}