import java.time.LocalDateTime

data class Message (
    val trainID: String,
    val position: Position,
    val timestamp: LocalDateTime,
    val status: String?
) // TODO: Expiration -> Discuss