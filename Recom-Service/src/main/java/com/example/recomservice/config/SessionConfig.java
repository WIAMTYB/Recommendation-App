package com.example.recomservice.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
@EnableRedisHttpSession
public class SessionConfig {

    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        serializer.setCookieName("sessionId"); // Nom du cookie de session
        serializer.setDomainName(null);      // Configurez le domaine si nécessaire (pour le partage cross-subdomain)
        serializer.setCookiePath("/");             // Chemin pour lequel le cookie est valide
        serializer.setUseHttpOnlyCookie(true);        // Empêche l'accès par JavaScript côté client
        serializer.setUseSecureCookie(false);       // Mettez à 'true' en production avec HTTPS
        serializer.setSameSite("Strict");    // Protection contre CSRF (Lax ou None selon vos besoins)
        return serializer;
    }

}