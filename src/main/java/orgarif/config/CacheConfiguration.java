package orgarif.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, orgarif.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, orgarif.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, orgarif.domain.User.class.getName());
            createCache(cm, orgarif.domain.Authority.class.getName());
            createCache(cm, orgarif.domain.User.class.getName() + ".authorities");
            createCache(cm, orgarif.domain.PersistentToken.class.getName());
            createCache(cm, orgarif.domain.User.class.getName() + ".persistentTokens");
            createCache(cm, orgarif.domain.NatureJuridique.class.getName());
            createCache(cm, orgarif.domain.Secteur.class.getName());
            createCache(cm, orgarif.domain.TypeStructure.class.getName());
            createCache(cm, orgarif.domain.Deliberation.class.getName());
            createCache(cm, orgarif.domain.Deliberation.class.getName() + ".organismes");
            createCache(cm, orgarif.domain.Deliberation.class.getName() + ".instances");
            createCache(cm, orgarif.domain.Elu.class.getName());
            createCache(cm, orgarif.domain.Elu.class.getName() + ".representants");
            createCache(cm, orgarif.domain.Representant.class.getName());
            createCache(cm, orgarif.domain.Instance.class.getName());
            createCache(cm, orgarif.domain.Instance.class.getName() + ".representants");
            createCache(cm, orgarif.domain.Instance.class.getName() + ".suppleants");
            createCache(cm, orgarif.domain.Instance.class.getName() + ".deliberations");
            createCache(cm, orgarif.domain.Organisme.class.getName());
            createCache(cm, orgarif.domain.Organisme.class.getName() + ".instances");
            createCache(cm, orgarif.domain.Organisme.class.getName() + ".representants");
            createCache(cm, orgarif.domain.Organisme.class.getName() + ".suppleants");
            createCache(cm, orgarif.domain.Organisme.class.getName() + ".deliberations");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }

}
