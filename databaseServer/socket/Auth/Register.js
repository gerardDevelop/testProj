const UserModel = require('../../data/models/UserModel');
const validateRegisterInput = require('../../data/validation/val-register');
const bcrypt = require('bcryptjs');

module.exports = (socket) => {
	socket.on(process.databaseCodes.REGISTRATION_REQUEST, (data) => {
		
		var didRegister = 0;
		var sendData = {};

		sendData[process.messageKeys.USER_SOCKET_ID] = data[process.messageKeys.USER_SOCKET_ID]; 

		console.log("received registration request");

		try {

			// check email
			// check username
			// password

			//const { errors, isValid } = validateRegisterInput(data);

			/*

		    // Check Validation
		    if (!isValid) {
		      //socket.emit("registration error", errors);
		      console.log(errors);
		      didRegsiter = false;
		      sendData.reason = "not valid input";

		      console.log("not valid input");
		    }
		    else {
		    */
		    	console.log("attempting to register new user");

				UserModel.findOne({ email: data[process.messageKeys.EMAIL] }).then(email => {

			      if (email) {
			        didRegister = -1;
		      		sendData.reason = "email already exists";

			      } else {

			      	UserModel.findOne({username: data[process.messageKeys.USERNAME]}).then(user => {

			      		if(user) {
			      			didRegister = -1;
		      				sendData.reason = "username already exists";
		      				console.log("username already exists");
			      		} else {

					        const newUser = new UserModel({
					          username: data[process.messageKeys.USERNAME],
					          email: data[process.messageKeys.EMAIL],
					          password: data[process.messageKeys.PASSWORD],
					        });

					        bcrypt.genSalt(10, (err, salt) => {
					          bcrypt.hash(newUser.password, salt, (err, hash) => {
					            if (err) throw err;
					            newUser.password = hash;
					            newUser
					              .save()
					              .then(user => {
					                // send back registration success msg
					                //console.log("created new user: " + newUser.username);
					                
					                didRegister = 1;
					                sendData.ref = data.ref;
		      						socket.emit(process.databaseCodes.REGISTRATION_RESPONSE_SUCCESS, sendData);
					              })
					              .catch(err => {
					              	didRegister = -1;
		      						sendData.reason = "error saving user";
					              	console.log(err);
					              });
					          });
					        });
					      }
			  			});
			  		}
			    });
			//}
		} catch(err) {
        	console.log("ERR: " + err.message);
        	didRegister = -1;
		    sendData.reason = "error";
      	}

      	if(didRegister === -1) {
      		console.log("successful registration for " + data[process.messageKeys.USERNAME]);
      		socket.emit(process.databaseCodes.REGISTRATION_RESPONSE_FAILURE, sendData);
      	}
	});
}