object Cluster {
    @JvmStatic
    fun main(args: Array<String>) {
        val agg = ProcessorFactory.createAggregator()
        agg.start()
    }
}