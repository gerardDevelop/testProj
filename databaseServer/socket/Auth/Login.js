const UserModel = require('../../data/models/UserModel');
const validateLoginInput = require('../../data/validation/val-login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

module.exports = (socket) => {
	socket.on(process.databaseCodes.LOGIN_REQUEST, (data) => {

    var didLogin = 0;
    var sendData = {};

    try {  

      sendData[process.messageKeys.USER_SOCKET_ID] = data[process.messageKeys.USER_SOCKET_ID]; 

      console.log(sendData[process.messageKeys.USER_SOCKET_ID]);

      console.log("received login req!!!");
      console.log(data);
      var username = data[process.messageKeys.USERNAME];
      var password = data[process.messageKeys.PASSWORD];

      /*
      // check details using mongoose and bcrypt
      const { errors, isValid } = validateLoginInput(data);

      // Check Validation
      if (!isValid) {
        console.log(errors);
        didLogin = false;
        sendData.reason = "not valid input";
      }
      */
  
      // Find user by email
      User.findOne({ username }).then(user => {
        // Check for user
        if (!user) {
          didLogin = -1;
          sendData.reason = "user not found";
        }

        // Check password 
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {

                console.log("user login success");

                didLogin = 1;

                /*
                
                  username: user.username,
                  rating: user.rating,
                  wins: user.wins,
                  losses: user.losses,
                  practiceGames: user.practiceGames

                */

                sendData[process.messageKeys.USERNAME] = username; 

                socket.emit(process.databaseCodes.LOGIN_RESPONSE_SUCCESS, sendData);



                // add to logged users object/list  
               // process.addLoggedUser(userObj);
                //process.userManager.addLoggedUser(user, socket);
           // );
          } else {
            errors.password = 'Password incorrect';
            console.log('incorrect password');
            didLogin = -1;
            sendData.reason = "incorrect password";
          }
        });
      });
    } catch(err) {
        console.log("ERR: " + err.message);
        didLogin = -1;
        sendData.reason = "error";
    }

    if(didLogin === -1) {
      socket.emit(process.databaseCodes.LOGIN_RESPONSE_FAILURE, sendData);
    }
  });
}