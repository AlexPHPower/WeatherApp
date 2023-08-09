For this you will need to have a stormglass.io account with a working api key, you can get one here https://stormglass.io/

You will also need an opencage account with a free api key https://opencagedata.com/

You will need to place the API keys in the env file under the following keys

VITE_STORM_GLASS_API_KEY=

VITE_OPENCAGE_API_KEY=

these will be imported into the react app automatically. 

I have created a test to ensure that the favourites are saved in the database so feel free to run this as an example of my knowledge of laravel testing

I didn't find much to do regarding the backend as everything i have attempted with react seems to have handled most of the work

I have included a cache into the system so that repeated requests for the same area aren't made to the api and this will improve user experience at a larger scale.

Please ensure that you run `npm run dev` to start the application as the site is served using react and will only show the default laravel documentation view otherwise.

I have also commited all files from the repo including my docker setup, if you use docker you can simply run docker-compose up -d and it will create the containers for you.

If you have any trouble with the docker setup get in touch and i can assist.

What i'd have done next: 

I'd ideally have liked to have implemented a cron job that runs once a day that sends an email to the user with a daily weather report of their favourite places but due to focusing on the react frontend side of the app i ran out of time. 

If i was to implement this i'd loop over the users favourite locations and display these in an email with a high and low of the temperatures for the next week. 
