const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = 80;

const dbConfig = {
	host: process.env.HOST,
	port: 5432,
	database: process.env.DATABASE,
	user: process.env.USER,
	password: process.env.PASSWORD
};

const db = pgp(dbConfig);

app.get('/', function(req,res) {
    res.send({"message":"Welcome"});
});

app.get('/welcome', function(req,res){
	res.send("Welcome to this application!");
});

function getRecipeNames(data){
    let listOfNames=[];
    data.array.forEach(element => {
        listOfNames.append(element.recipename);
    });
    return listOfNames;
}

app.get('/getallrecipes', (req, res) => {
    let query = `select * from recipes;`;

    db.any(query)
    .then((rows) => {
        RN = getRecipeNames(rows);
        res.send(RN); //returning all rows to the client
        // res.send({"Author": rows[0].authorid}); // accessing a column value from one of the rows in the result set
    })
    .catch((error) => {
        res.send({'message' : error});
    })
});

app.get('/getRecipeById', (req, res) => {
    let rId = req.query.id;
    let query = `SELECT * FROM recipes WHERE recipeId = $1;`;
    console.log(query);
    db.any(query,[rId])
    .then((rows) => {
        res.send(rows);
    })
    .catch((error) => {
        res.send({'message' : error});
    })
});

app.get('/getRecipeById/:id', (req, res) => {
    let rId = req.params.id;
    let query = `SELECT * FROM recipes WHERE recipeId = ${rId};`;
    
    db.any(query)
    .then(function(rows) {
        res.send(rows);
    })
    .catch((error) => {
        res.send({'message' : error});
    })
});

app.get('/getRecipeByName/:name', (req,res) => {
    let rName = req.params.name;
    let query = `SELECT * FROM recipes WHERE recipename LIKE '$1';`;
    console.log(query);
    db.any(query,[rName])
    .then((rows) => {
        res.send(rows);
    })
    .catch((error) => {
        res.send({'message' : error});
    })
});

app.post('/addRecipe', (req,res) => {
    let query = `INSERT INTO recipes(recipename, preptimemins, cooktimemins, authorId, image, recipeurl) VALUES ('${req.body.name}', ${req.body.preptime}, ${req.body.cooktime}, ${req.body.author}, '${req.body.image}', '${req.body.url}') returning recipeName;`;
    db.any(query)
    .then((rows) => {
        res.send(rows);
        // res.send({"message": "Data inserted successfully"});
    })
    .catch((error) => {
        res.send({'message' : error});
    });
});

app.put('/updateRecipe', (req, res) => {
    let query = `UPDATE recipes SET authorId = ${req.body.authorId} WHERE recipename LIKE '%${req.body.name}%';`;
    console.log(query);
    db.any(query)
    .then((rows) => {
        console.log(rows);
        res.send({"message": "Data updated successfully"});
    })
    .catch((error) => {
        res.send({'message' : error});
    });
});

app.delete('/deleteRecipe/:name', (req, res) => {
    let query = `DELETE FROM recipes WHERE recipename LIKE '%${req.params.name}%';`;
    db.any(query)
    .then((rows) => {
        res.send({"message": "Data deleted successfully"});
    })
    .catch((error) => {
        res.send({'message' : error});
    });
});

app.listen(PORT, (err) => {
    console.log(`Server is running on port ${PORT}`);
});
