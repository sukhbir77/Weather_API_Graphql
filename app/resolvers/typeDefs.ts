const { gql } = require('apollo-server');

//Graphql Queries and Mutations.
module.exports = gql`

type User {
    username: String
    email: String
    token: String
}

input RegisterInput{
    username: String
    email: String
    password: String
}

input LoginInput {
    email: String
    password: String
}
type Cordinates{
    lon: Float
    lat: Float
}

type WeatherData {
    id: Float
    main: String
    description: String
    icon: String
}

type MainData {
    temp: Float
    feelsLike: Float
    tempMin: Float  
    tempMax: Float
    pressure: Float
    humidity: Float
}

type Wind {
    speed: Float
    deg: Float
    gust: Float
}

type Clouds {
    all: Float
}

type System {
    type: Float
    id: Float
    country: String
    sunrise: Float
    sunset: Float
}

type Weatherr {
    coord: Cordinates
    weather: [WeatherData]
    base: String
    main: MainData
    visibility: Float
    wind: Wind
    clouds: Clouds
    dt: Float
    sys: System
    timezone: Float
    id: Float
    name: String
    cod: Float
}

type Query {
    user(id: ID!): User
    getWeather(name: String): Weatherr
}

type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
}
`
