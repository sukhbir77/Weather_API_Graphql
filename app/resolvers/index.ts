const usersResolvers = require("./users");
const weatherResolvers = require("./weather")

//Exporting All the Resolvers. Will be available to Import in the index.ts File.
module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...weatherResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation
    },
};