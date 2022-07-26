const fetch = require("node-fetch");
export{fetch};

module.exports = {
    Query: {
        getWeather: async (_: any, { name }: any) => {
            const response = await fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                name +
                "&appid=8d35535b5b84f2888a2be17f87e5642a"
            )
                .then((response : any) => response.json())
                .then((json : any) => json);

            return response;
        },
    }
}