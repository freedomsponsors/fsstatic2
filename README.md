# fsstatic2

This will be the new frontend of FreedomSponsors - a mobile first, MaterialDesign-based, SPA.

The main goal of rebuilding the FreedomSponsors website like this is to have a reeeeally friendly development environment that more people can work on, while also serving as an example of a high quality architecture for a web app.

So, even if you don't want to help FS, if you are interested in web development, take a look at how this project is structured. It may give you a few good ideas to improve your own webapp project.

# The development environment.

You should be able to get a dev env up and running really fast:

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
. fsdev.sh
# and print a little help text about them (nice huh)
# If you want to see the help again type 'fshelp'

# If you want, you can add an alias to your ~/.bashrc 
# file to make a quick jump into the development environment
# Running the command below will tell you how to do so:
produce_alias
# I use that all the time

# Build the project
# This will create/update some stuff in the 'dist' folder
devbuild

# Run the dev server
# This just starts a http server on port 9001
# When it's running you can go to 
# localhost:9001/dist/docs.html or /dist/index.html
runserver
```

When you use `devbuild`, the pages generated in the `dist` folder look for javascript files in the src folder, so you should be able to have a fast save/refresh cicle when dealing with javascript and AngularJS.

## Next steps:

* jshint
* javascript tests
* api's
