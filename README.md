# BAMazon

A command line node application that guides the user through a shopping experience. Connected to a MySQL database.


### Before You Begin.

1. Clone the repository.

2. Navigate to root folder and run `npm init` to initialize a package.json.

3. To run the application you will need to install these node packages:

* `npm install mysql`
* `npm i inquirer`

4. You will need to have MySQL to run a database.

5. You will need a local server running to connect to database.

### To Run BAMazon
1. Use the schema in schema.sql to create your database in MySQL.

2. Use the seeds in seeds.sql to populate your database in MySQL.

3. Change `port: 8889` to whatever port your MySQL database is running on.

4. Spin up local server making sure it's MySQL port number is set to your port number.

5. Type `node bamazonCustomer` to run application.

### Known Issues
1. Will sometimes get warning messages in console yet other times won't. This doesn't effect the application's performance.

2. When I tried using nodemon to run the application, the arrow keys get stuck. Performance is negatively affected.


### Creator

* https://github.com/WilliamBork33

* http://www.williambork.com/


### Forked From Users:
* https://github.com/diani091

* https://github.com/jorgedelgado24
