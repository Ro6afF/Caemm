import java.sql.Timestamp
import java.time.LocalDateTime

data class Message (
    val trainID: String,
    val position: String,
    val timestamp: LocalDateTime,
    val status: String?
) // TODO: Expiration -> Discuss