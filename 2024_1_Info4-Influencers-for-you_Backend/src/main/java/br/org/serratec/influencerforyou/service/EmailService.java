package br.org.serratec.influencerforyou.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import br.org.serratec.influencerforyou.model.Email;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmail(Email email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("adinor.carvalho@es.estudante.senai.br");
        message.setTo(email.getPara());
        message.setSubject(email.getAssunto());
        message.setText(email.getTexto());
        mailSender.send(message);
    }
}
