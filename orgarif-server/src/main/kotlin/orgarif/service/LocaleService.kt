package orgarif.service

import java.util.Enumeration
import java.util.Locale
import org.springframework.stereotype.Service
import orgarif.domain.Language

@Service
class LocaleService(private val notificationService: NotificationService) {

    fun selectLanguage(locales: Enumeration<Locale>?): Language {
        if (locales == null) {
            return Language.En
        }
        for (locale in locales) {
            val language = Language.values().find { it.name == locale.language }
            if (language != null) {
                return language
            }
        }
        notificationService.notify(
            "No locale found in user locales $locales", NotificationService.Channel.Info)
        return Language.En
    }
}
