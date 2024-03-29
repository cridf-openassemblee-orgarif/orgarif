package orgarif.service.user

import java.util.Locale
import org.springframework.stereotype.Service
import orgarif.domain.Language
import orgarif.service.utils.NotificationService

@Service
class LocaleService(private val notificationService: NotificationService) {

    fun selectLanguage(locales: List<Locale>): Language {
        if (locales.isEmpty()) {
            return Language.Fr
        }
        locales.forEach { locale ->
            val language = Language.values().find { it.name == locale.language }
            if (language != null) {
                return language
            }
        }
        notificationService.notify(
            "No locale found in user locales $locales", NotificationService.Channel.Info)
        return Language.Fr
    }
}
