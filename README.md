# nodejs-ppl-like-you

# Description
API that sends 10 potential investor similar with a person described in the query parameters.

1. the endpoint is exposed at people-like-you
2. each of the terms in the query parameters is optional
3. the endpoint returns a JSON response with an array of scored suggested matches
4. the suggestions are sorted by descending score
5. each suggestion has a score between 0 and 1 indicating confidence in the suggestion (1 is most confident)



# To start the project (with docker and docker-compose)
If you already have docker and docker-compose. Open your terminal and go to the project folder.

1. run `docker-compose build`
2. run `docker-compose up`
3. run `docker ps` to get the container id of `app`, and run `docker exec -it {container id} sh` to go into the container.
4. run `sequelize db:migrate` to install the database
5. run `sequellize db:seed:all` to run all the seeding data before you can use the app.
6. go to postman with `localhost` or `127.0.0.0` to access the endpoints.

### Take note
Docker-compose already run nodemon when boot up, so you will not need to run `node index.js`.

# To start the project without docker
You will need to have nodejs pre-installed and mysql pre-configured in your machine.

1. go to project folder and open `config/config.json` and change the `host` for development to `127.0.0.0` and change the root password and database name accordingly.
2. open terminal and nagivate to the project folder, run `npm install` to install all the modules
3. run `npm install -g sequelize-cli` to install sequelize-cli to run migration.
4. run `sequelize db:migrate` to install the database
5. run `sequellize db:seed:all` to run all the seeding data before you can use the app.
6. run `node index.js` to start the project.
7. go to postman with `localhost` or `127.0.0.0` to access the endpoints.

# The endpoints

## GET /people-like-you
accept parameters:
- age (int)
- latitude (number), longitude (number)
- monthlyIncome (integer)
- experienced (boolean)

All parameters are optional. 
1. When there's more than 1 parameter passed in, result will return the first 100 record based on score. Score are calculated with cosine similarity.  Latitude and longitude will be use to calculate the distance between the latitude and longitude of the records in database.

2. When there's only 1 parameter passed in, result will be filtered by the parameter. Example: if there's only age=300, query will look for all people in the record where age=300.


## GET /people-compared-with-you
accept parameters:
- type: monthlyIncome / age
- value: the value you wish to use to compare with. (integer only)

result return 3 values:
#### monthlyIncome
1. Category: more / same / lesser
2. Total: total record found in the category

#### age
1. Category: older / same / younger
2. Total: total record found in the category
