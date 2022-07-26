const User = require('../models/user');
const { ApolloError } = require('apollo-server-errors')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

module.exports = {
    Mutation: {
        async registerUser(_: any, { registerInput: { username, email, password } }: any) {
            //Checking If the User Already Exists
            const checkUser = await User.findOne({ email })

            if (checkUser) {
                throw new ApolloError("User Already Exists!!! Please Sign In", "USER_ALREADY_EXISTS");
            }

            //Encrypting the User Password 
            var encryptedPassword = await bcrypt.hash(password, 10);

            //Create a mongoose Model
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            })

            //Create the JSON Web Token
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING", //Store in Environment Variable
                {
                    expiresIn: "3h"
                }
            )

            newUser.token = token;

            //Adding User to the MongoDb Database
            const respone = await newUser.save();

            return {
                id: respone.id,
                ...respone._doc
            }
        },

        async loginUser(_: any, { loginInput: { email, password } }: any) {
            //Checking If the User Exists
            const checkUser = await User.findOne({ email })

            //Checking the password is correct 
            if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
                //Creating a New JWT Token For User
                const token = jwt.sign(
                    { user_id: checkUser._id, email },
                    "UNSAFE_STRING", //Store in Environment Variable
                    {
                        expiresIn: "3h"
                    }
                );
                //Add new toke to the User in the Database
                checkUser.token = token;
                return {
                    id: checkUser.id,
                    ...checkUser._doc
                }
            }
            else {
                throw new ApolloError("Incorrect Password", "INCORRECT_PASSWORD")
            }

        }

    },
    Query: {
        user: (_: any, { ID }: any) => User.findById(ID)
    }
}