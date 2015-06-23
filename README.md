# fsstatic2

This will be the new frontend of FreedomSponsors - a mobile first, MaterialDesign-based, SPA.
Separating the front-end and back-end projects will allow for a much faster iteration and lower the technical barriers for contributors.

# The development environment.

The development environment was though out to be reeeeally friendly and fast to get up and running

```bash
# Install gulp globally if you don't have it already
# You should need to do this only once
sudo npm install -g gulp

# Download npm dependencies
# You need to do this again in the future if 
# something changes in the packages.json file
npm install

# Activate the FS dev env
# This will import a few functions in your bash, 
# and print a little help text about them
. fsdev.sh

# If you want, you can add an alias to your ~/.bashrc 
# file to make a quick jump into the development environment
# Running the command below will tell you how to do so:
produce_alias

# Build the project
# This will create/update some stuff in the 'dist' folder
build

# Run the dev server
# This just starts a http server on port 9001
# When it's running you can go to 
# localhost:9001/dist/docs.html or /dist/index.html
runserver
```

The pages generated in the `dist` folder look for javascript files in the src folder, so you should be able to have a fast save/refresh development cicle when dealing with javascript and AngularJS.

## Next steps:

* javascript tests
* api's
