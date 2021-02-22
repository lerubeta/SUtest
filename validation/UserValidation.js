const validator = require('validator');

exports.validateUser = (user) => { 
    const errorObject = {};
    let errorOccurred = false;
    if (!user) { 
        errorObject.error = true;
        errorObject.message = "Please fill out all required fields!"
        return errorObject;
    }
    if(!user.firstName || validator.isEmpty(user.firstName)){
        errorObject.firstName = "First Name is a required field";
        errorObject.error = true;
        errorOccurred = true;
    }else{
        //Check if Maximum length exceeded
        if(user.firstName.length>32){
            errorObject.firstName = "First Name maximum length exceeded";
            errorObject.error = true;
            errorOccurred = true;
        }
    }
     if(!user.lastName || validator.isEmpty(user.lastName)){
        errorObject.lastName = "Last Name is a required field";
        errorObject.error = true;
        errorOccurred = true;
    }else{
        //Check if Maximum length exceeded
        if(user.lastName.length>32){
            errorObject.lastName = "Last Name maximum length exceeded";
            errorObject.error = true;
            errorOccurred = true;
        }
    }
     if(!user.status || validator.isEmpty(user.status)){
        errorObject.status = "Status is a required field";
        errorObject.error = true;
        errorOccurred = true;
    }else{
        //Check if Maximum length exceeded
         if (user.status.length > 6) {
             errorObject.status = "Status length exceeded";
             errorObject.error = true;
             errorOccurred = true;
         } else { 
            if (!validator.isInt(user.status)) {
             errorObject.status = "Status must be an integer";
             errorObject.error = true;
             errorOccurred = true;
         }

         }
    }
    //Return true if form is valid, else return error object.
    return errorOccurred ? errorObject : true;
}