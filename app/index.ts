const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
export {jwt};
const typeDefs = require('./resolvers/typeDefs');
const resolvers = require('./resolvers/index');

const MONGODB = "mongodb+srv://admin-sing9014:Intex007@cluster0.oi6vb.mongodb.net/WeatherApiData?retryWrites=true&w=majority";

const getUser = (token: any[]) => {
    if (token) {
        try {
            // return the user information from the token
            return jwt.verify(token, "UNSAFE_STRING");
        } catch (err) {
            // If there's a problem with the token, throw an error
            return { error: true, msg: "Session invalid" };
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => {
        //Authorization
        if (req.body.query.match("getWeather")) {
            if (req.headers && req.headers.authorization) {
                var auth = req.headers.authorization;
                var parts = auth.split(" ");
                var bearer = parts[0];
                var token = parts[1];

                if (bearer == "Bearer") {
                    const user = getUser(token);
                    console.log(user)
                    if (user.error) {
                        throw Error(user.msg);
                    } else return { user };
                } else {
                    throw Error("Authentication must use Bearer.");
                }
            } else {
                throw Error("User must be authenticated.");
            }
        }
    },
    playground: {
        endpoint: "http://localhost:5000/graphql",
        settings: {
            "editor.theme": "light",
        },
    },
});

//Connection to the MongoDB Database
mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({ port: 5000 });
    })
    .then((res: any) => {
        console.log(`Server running at ${res.url}`)
    });


