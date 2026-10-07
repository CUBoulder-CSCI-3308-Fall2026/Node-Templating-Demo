## Node and Templating Demo

This project is purely for reference for this course. It has basic starter code for Node application. 

This project was built with the assumption that you have Node and Postgres installed on your computer. You may have to make small changes to make it work within Docker.

Before you run the code in this repo, please run the SQL files in the `init_data` folder to initialize your database. 

For the templating portion of this project, you will find a different version of index.js along with the views in the `templating demo` folder.

You will also notice that I have committed the .env file in this repository. This is purely to show you what a .env file looks like. Please **DO NOT EVER** track your .env file in git. It should be listed in the `.gitignore` file.

To run the `index.js` file, use the command `node --env_file=.env index.js`. This should take the environment variables from the .env file.

Additionally, please do not store your environment variables in the code files. In some of the `.js` files in this repo, you may see some of the values plugged in. That is only for demo purposes. 

Finally, when building your DB queries, please use [parameterized queries](https://node-postgres.com/features/queries) only. Using strings or templated strings exposes your database to SQL injection attacks. The examples in this demo show the usage of templated strings as a starting point. Please practice converting those into parameterized queries.

For any questions about this demo, please email the instructor, [Sreesha Nath](mailto:sreesha.nath@colorado.edu)


