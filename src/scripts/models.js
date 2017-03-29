export default function models() {

    let userOne;
    let oneMessage;
    const url = 'http://tiny-za-server.herokuapp.com/collections/joebumMessenger/'

    const Sessions = function(name) {
        'use strict';
        this.username = name;
    };

    const Message = function(time, sender, body) {
        'use strict';
        this.time = time;
        this.sender = sender;
        this.body = body;
    };

    $('#sign-in-btn').on('click', function(e) {
        $('.entry-page').addClass('hidden');
        $('.message-page').removeClass('hidden');
        const user = $('#user-input').val();
        userOne = new Sessions(user);
        console.log(userOne);
    })

    $('.send-btn').on('click', function(e) {
        let moment = require('moment');
        let time = (moment().format("ddd MMMD,YY hh:mmA"));
        let msg = $('.message-input').val();
        let sender = userOne.username;
        oneMessage = new Message(time, sender, msg);
        console.log(oneMessage);
        var settings = {
          type: 'POST',
          contentType: 'application/json',
          url: url,
          data: JSON.stringify({
            time: oneMessage.time,
            sender: oneMessage.sender,
            body: oneMessage.body
          })
        }
      $.ajax(settings).then(function(data, status, xhr){

        let messageContainer = $('#messages-container');
        let message = $(`<li class="message">${data.body} <span class="timestamp">was sent by ${data.sender} at ${data.time}</span><button class="message-delete-btn">X</button></li>`);
        let deleteBtn = message.find('.message-delete-btn');
        deleteBtn.on('click', function(){
          let deleteMessage = {
            type: 'DELETE',
            url: url + data._id
          }
          $.ajax(deleteMessage).then(function(){
            message.remove()
          })
        })
        messageContainer.append(message);
      })
    })
}
