package br.org.serratec.influencerforyou.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.org.serratec.influencerforyou.model.Email;
import br.org.serratec.influencerforyou.service.EmailService;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/enviar-email")
    public String enviarEmail(@RequestBody Email email) {
        try {
            emailService.enviarEmail(email);
            return "E-mail enviado com sucesso para " + email.getPara();
        } catch (Exception e) {
            return "Erro ao enviar e-mail: " + e.getMessage();
        }
    }
}
