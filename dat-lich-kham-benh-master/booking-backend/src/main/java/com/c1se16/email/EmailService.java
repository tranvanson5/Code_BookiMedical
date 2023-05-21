package com.c1se16.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final TemplateEngine templateEngine;
    private final JavaMailSender mailSender;

    @Async
    public void asyncSend(@NotNull EmailDTO emailDTO) throws MessagingException {
        this.send(emailDTO);
    }

    public void send(@NotNull EmailDTO emailDTO) throws MessagingException {
        log.info("[START-SEND-MAIL] {}", Arrays.toString(emailDTO.getTo()));
        Context context = new Context();
        context.setVariables(emailDTO.getData());
        String process = this.templateEngine.process(emailDTO.getTemplate().getValue(), context);

        MimeMessage mimeMessage = this.mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setSubject(emailDTO.getTemplate().getTitle());
        if (StringUtils.hasText(emailDTO.getSubject())) {
            helper.setSubject(emailDTO.getSubject());
        }
        helper.setTo(emailDTO.getTo());
        helper.setText(process, Boolean.TRUE);
        this.mailSender.send(mimeMessage);
        log.info("[END-SEND-MAIL] {}", Arrays.toString(emailDTO.getTo()));
    }
}