For this you will need to have a stormglass.io account with a working api key, you can get one here https://stormglass.io/

You will also need an opencage account with a free api key https://opencagedata.com/

You will need to place the API keys in the env file under the following keys

VITE_STORM_GLASS_API_KEY=

VITE_OPENCAGE_API_KEY=

these will be imported into the react app automatically. 

I have created a test to ensure that the favourites are saved in the database so feel free to run this as an example of my knowledge of laravel testing

I didn't find much to do regarding the backend as everything i have attempted with react seems to have handled most of the work

I have included a cache into the system so that repeated requests for the same area aren't made to the api and this will improve user experience at a larger scale.
