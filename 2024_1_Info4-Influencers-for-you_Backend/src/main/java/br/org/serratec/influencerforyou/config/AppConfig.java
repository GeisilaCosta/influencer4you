package br.org.serratec.influencerforyou.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
@OpenAPIDefinition
public class AppConfig {

	@Value("${dominio.openapi.prod-url:http://localhost:8080}")
	private String webUrl;

  
    @Bean
    public OpenAPI customOpenInfluencersforyou() {
        

        Server webServer = new Server();
        webServer.setDescription("URL do Server Produção");
        webServer.setUrl(webUrl);

        Contact contact = new Contact();
        contact.setName("teste");

        License license = new License().name("Apache License 2.0").url("https://www.apache.org/licenses/LICENSE-2.0");

        Info info = new Info().title("Influencer4You")
                               .version("1.0")
                               .contact(contact)
                               .license(license)
                               .description("Projeto Final");

        return new OpenAPI().info(info).servers(List.of(webServer));
    }
}