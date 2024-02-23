# People Search V1 Frontend
Frontend for people search V1. Calls the API created [here](https://github.com/cerebralvalley/people-search-v1-py). Build in next, so everything runs server side.

# Run Instructions
* `yarn` to install all relevant packages
* `yarn start` to start it
* Putting all API and environment variable use in `/public/api/<SOMETHING>.tsx` calls it on the server side

# Structure
Pretend this entire thing is your typical /src folder. `/pages` actually contains the components used to construct what you see in the UI. 

# Improvements
* Fix light mode - breaks a lot of the text and looks weird
* Add box componenets for after you call the API
* API calls on server side
