package SAE._2.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// CORS is handled by SecurityConfig's CorsConfigurationSource.
// This class is kept empty to avoid duplicate/conflicting CORS configurations.
@Configuration
public class WebConfig implements WebMvcConfigurer {
}
