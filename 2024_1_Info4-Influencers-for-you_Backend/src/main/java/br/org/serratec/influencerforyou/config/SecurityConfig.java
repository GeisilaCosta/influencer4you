package br.org.serratec.influencerforyou.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import br.org.serratec.influencerforyou.security.JwtAuthenticationFilter;
import br.org.serratec.influencerforyou.security.JwtAuthorizationFilter;
import br.org.serratec.influencerforyou.security.JwtUtil;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	UserDetailsService userDetailsService;

	@Autowired
	JwtUtil jwtUtil;

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	    http.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(corsConfigurationSource()))
	            .httpBasic(Customizer.withDefaults()).authorizeHttpRequests(requests -> {

	                requests.requestMatchers(HttpMethod.GET, "/login").permitAll();

	                // Libera GET para todos
	                requests.requestMatchers(HttpMethod.GET, "/influencers/**").permitAll();
	                requests.requestMatchers(HttpMethod.GET, "/campaigns/**").permitAll();
	                requests.requestMatchers(HttpMethod.GET, "/company/**").permitAll();
	                requests.requestMatchers(HttpMethod.GET, "/niches/**").permitAll();
	                requests.requestMatchers(HttpMethod.GET, "/targetAudience/**").permitAll();
	                requests.requestMatchers(HttpMethod.GET, "/images/**").permitAll();
	                requests.requestMatchers(HttpMethod.GET, "/influencerCampaign/**").permitAll();
	                requests.requestMatchers(HttpMethod.GET, "/posts/**").permitAll();
	                requests.requestMatchers(HttpMethod.GET, "/comments/**").permitAll();
	                requests.requestMatchers("/enviar-email/**").permitAll();

	                // Swagger
	                requests.requestMatchers("/v3/api-docs/**").permitAll();
	                requests.requestMatchers("/swagger-ui/**").permitAll();

	                // Libera POST para cadastro de influencers e companies
	                requests.requestMatchers(HttpMethod.POST, "/influencers/**").permitAll();
	                requests.requestMatchers(HttpMethod.POST, "/company/**").permitAll();

	                // Permissões para administradores
	                requests.requestMatchers(HttpMethod.POST, "/niches/**").hasRole("ADMINISTRADOR");
	                requests.requestMatchers(HttpMethod.PUT, "/niches/**").hasRole("ADMINISTRADOR");
	                requests.requestMatchers(HttpMethod.DELETE, "/niches/**").hasRole("ADMINISTRADOR");

	                requests.requestMatchers(HttpMethod.POST, "/targetAudience/**").hasRole("ADMINISTRADOR");
	                requests.requestMatchers(HttpMethod.PUT, "/targetAudience/**").hasRole("ADMINISTRADOR");
	                requests.requestMatchers(HttpMethod.DELETE, "/targetAudience/**").hasRole("ADMINISTRADOR");

	                // Permissões para empresas
	                requests.requestMatchers(HttpMethod.POST, "/campaigns/**").hasAnyRole("ADMINISTRADOR", "EMPRESA");
	                requests.requestMatchers(HttpMethod.PUT, "/campaigns/**").hasAnyRole("ADMINISTRADOR", "EMPRESA");
	                requests.requestMatchers(HttpMethod.PUT, "/company/**").hasAnyRole("ADMINISTRADOR", "EMPRESA");
	                requests.requestMatchers(HttpMethod.PUT, "/influencerCampaign/**").hasAnyRole("ADMINISTRADOR", "EMPRESA");
	  
	                
	                // Permissões para influencers
	                requests.requestMatchers(HttpMethod.POST, "/comments/**").hasAnyRole("ADMINISTRADOR", "INFLUENCER", "EMPRESA");
	                requests.requestMatchers(HttpMethod.PUT, "/comments/**").hasAnyRole("ADMINISTRADOR", "INFLUENCER", "EMPRESA");
	                requests.requestMatchers(HttpMethod.DELETE, "/comments/**").hasAnyRole("ADMINISTRADOR", "INFLUENCER", "EMPRESA");

	                requests.requestMatchers(HttpMethod.PUT, "/influencers/**").hasAnyRole("ADMINISTRADOR", "INFLUENCER");
	                requests.requestMatchers(HttpMethod.POST, "/influencerCampaign/**").hasAnyRole("ADMINISTRADOR", "INFLUENCER");
	                requests.requestMatchers(HttpMethod.POST, "/posts/**").hasAnyRole("ADMINISTRADOR", "INFLUENCER");
	                requests.requestMatchers(HttpMethod.PUT, "/posts/**").hasAnyRole("ADMINISTRADOR", "INFLUENCER");
	                requests.requestMatchers(HttpMethod.DELETE, "/posts/**").hasAnyRole("ADMINISTRADOR", "INFLUENCER");

	                // Permissões específicas para endpoints de aprovação/reprovação
	                requests.requestMatchers(HttpMethod.PUT, "/company/aprovar/**").hasRole("ADMINISTRADOR");
	                requests.requestMatchers(HttpMethod.PUT, "/company/reprovar/**").hasRole("ADMINISTRADOR");
	                requests.requestMatchers(HttpMethod.PUT, "/influencers/aprovar/**").hasRole("ADMINISTRADOR");
	                requests.requestMatchers(HttpMethod.PUT, "/influencers/reprovar/**").hasRole("ADMINISTRADOR");

	                // Administrador tem total acesso
	                requests.requestMatchers("/**").hasRole("ADMINISTRADOR");

	                requests.anyRequest().authenticated();
	            }).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

	    JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(
	            authenticationManager(http.getSharedObject(AuthenticationConfiguration.class)), jwtUtil);
	    jwtAuthenticationFilter.setFilterProcessesUrl("/login");

	    http.addFilter(jwtAuthenticationFilter);
	    http.addFilter(new JwtAuthorizationFilter(
	            authenticationManager(http.getSharedObject(AuthenticationConfiguration.class)), jwtUtil,
	            userDetailsService));

	    return http.build();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowedOrigins(Arrays.asList("*")); // Ajuste conforme necessário
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfiguration.applyPermitDefaultValues());

		return source;
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}