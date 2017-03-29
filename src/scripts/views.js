export default function views() {


  const url = 'http://tiny-za-server.herokuapp.com/collections/joebumMessenger/'
  let settings = {
    type: 'GET',
    datatype: 'json',
    url: url
  }


  $.ajax(settings).then(function(data, status, xhr){
    data.forEach(function(data, i, arr){
      let messageContainer = $('#messages-container');
      let messageList = $(`<li class="message">${data.body} <span class="timestamp">was sent by ${data.sender} at ${data.time}<span><button class="message-delete-btn">X</button></li>`);
      let deleteBtn = messageList.find('.message-delete-btn');
      deleteBtn.on('click', function(e){
        let deleteUrl = url + data._id
        let deleteMessage = {
          type: 'DELETE',
          url: deleteUrl
        }
        console.log(deleteUrl)

        $.ajax(deleteMessage).then(function(){
          messageList.remove()
        })
      })
      messageContainer.append(messageList);
    })
  })
  // setInterval (function(){
  //   location = ''
  //   // if (){
  //   //
  //   // } else {}
  // }, 3000);
}
