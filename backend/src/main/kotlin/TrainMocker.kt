import java.net.HttpURLConnection
import java.net.URL
import java.util.concurrent.TimeUnit

object TrainMocker {
    @JvmStatic
    fun main(args: Array<String>) {
        val id = readLine()
        val asd = readLine()?.toBoolean() ?: false
        var lat: Double = 0.0
        var lon: Double = 0.0
        while (true) {
            var conn =
                URL("http://localhost:8080/pos?id=$id&lat=$lat&lon=$lon").openConnection() as HttpURLConnection
            conn.connect()
            TimeUnit.SECONDS.sleep(1)
            if (asd) {
                lat += 0.001
            } else {
                lon += 0.001
            }
            println("$lat $lon")

        }
    }
}