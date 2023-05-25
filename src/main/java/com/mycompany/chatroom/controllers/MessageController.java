package com.mycompany.chatroom.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mycompany.chatroom.entities.Message;

@RestController
public class MessageController {
    
   @MessageMapping("/message")//To send message
   @SendTo("/topic/return-to")//Through this message will be sent to all the subscribers
   public Message sendMessage(@RequestBody Message message) {
    try
    {
        Thread.sleep(1100);
    }catch(InterruptedException e)
    {
        e.printStackTrace();
    }
    return message;
}
}
