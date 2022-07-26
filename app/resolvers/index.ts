const usersResolvers = require("./users");
const weatherResolvers = require("./weather")

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...weatherResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation
    },
};