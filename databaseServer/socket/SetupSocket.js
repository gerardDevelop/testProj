// manages socket 'routes'

const SetupSocket = (io) => {

  io.sockets.on('connection', function (socket) {

    console.log("connection made to database server: " + socket.id);
    socket.emit('connection made to database');
    
    // create connection object and attach it to the socket
   // process.connectionManager.onConnect(socket);


    socket.on("disconnect", function(reason) {

      try {

        console.log("disconnect, reason: " + reason);

      //  process.userManager.onDisconnect(socket);

        // remove from connection list
      //  process.connectionManager.onDisconnect(socket);
      } 
      catch(err) {
        console.log("ERR: " + err.message);
      }
    });

    require('./Auth/Login')(socket);
    
    require('./Auth/Register')(socket);
    
    //require('./Misc/CreateParty')(socket);
   // require('./Misc/EnterWorld')(socket);
  //  require('./Misc/GetParties')(socket); 

  });
}


module.exports = SetupSocket;