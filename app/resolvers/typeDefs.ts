const { gql } = require('apollo-server');

module.exports = gql`
type Message {
    text: String
    createdAt: String
    createdBy: String
}

type User {
    username: String
    email: String
    token: String
}

input MessageInput {
    text: String
    username: String
}

input RegisterInput{
    username: String
    email: String
    password: String
    confirmPassword: String
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
    message(id: ID!): Message
    user(id: ID!): User
    getWeather(name: String): Weatherr
}

type Mutation {
    createMessage(messageInput: MessageInput): Message!
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
}
`