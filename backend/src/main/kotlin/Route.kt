import java.time.LocalDateTime

data class Route(
    var stations: MutableList<Station>,
    var arrDepTimes: MutableList<Pair<LocalDateTime, LocalDateTime>>
)