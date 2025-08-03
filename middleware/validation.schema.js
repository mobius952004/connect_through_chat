


export const signinValidation = 
    {
    username: {
        isLength: {
            options: {
                min: 3,
                max: 20
            },
        errorMessage: "username is not of the equired length"
        },
        notEmpty: {
            errorMessage: "username can not be empty"
        },
        isString: {
            errorMessage: "user name should be a string "
        }

    },
     password: {
        isLength: {
            options: {
                min: 3,
                max: 20
            },
        errorMessage: "password is very short"
        },
        notEmpty: {
            errorMessage: "yo! Where is the Password"
        },

    },
       email: {
        notEmpty: {
            errorMessage: "yo! yo! dont Fuck with Me , u bitch"
        }

    }



    }

    export const loginValidation = {
  email: {
    isEmail: true,
    notEmpty: true,
    errorMessage: "Valid email required",
  },
  password: {
    notEmpty: true,
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters",
    },
  },
};

