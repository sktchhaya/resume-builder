const express=require('express');
const app =express();
const Joi = require('joi');
const db = require('./util/database');

app.use(express.json());
//const bodyParser = require('body-parser')
//app.use(bodyParser.json());


// Default response
app.get('/', (req, res)=> {
	res.send('Hello World!');
});


// GET all the books
app.get('/api/books', (req, res)=> {

	db.execute('select * from books')
	.then(result=>{
		res.send(result[0]);
	})
	.catch(err=>{
		console.log(err);
	});
	
});


// GET a specified book searched by an ID
app.get('/api/books/:id', (req,res)=> {

	db.execute(`select * from books where id=${req.params.id}`)
	.then(result=>{
		if(result[0].length>0){
			res.send(...result[0]);}
		else {res.send("Book not found in the database with this ID");}
	})
	.catch(err=>{
		console.log(err);
	});

});


// POST (INSERT) a book into database
app.post('/api/books', (req, res)=>{
	
	// Using JOI for input validation
	const schema= Joi.object({
		title: Joi.string().min(2).required(),
		author: Joi.string().min(3).required()
	});
	const result = schema.validate(req.body);
	if(result.error)  {
		res.status(400).send(result.error.details[0].message);
		return;
	}

    db.execute(`INSERT INTO books (title, author) VALUES ('${req.body.title}', '${req.body.author}')`)
	.then(result => {res.send("Book added in the database and affected rows are:"+result[0].affectedRows);})
	.catch(err=>{
		console.log(err);
	});

});

// Update book Info (PUT)
app.put('/api/books/:id', (req, res)=>{

	db.execute(`UPDATE books SET title='${req.body.title}', author='${req.body.author}' where id=${req.params.id}`)
	.then(result => {res.send("Updated the the book details in the database:"+result[0].affectedRows);})
	.catch(err=>{
		console.log(err);
	});


});


// Update book Info (PUT)
app.delete('/api/books/:id', (req, res)=>{

	//console.log('This is my parsed things'+req.body.title+req.body.author);

	db.execute(`DELETE FROM books where id=${req.params.id}`)
	.then(result => {res.send("Book deleted from the database and affected rows are:"+result[0].affectedRows);})
	.catch(err=>{
		console.log(err);
	});


});

//PORT
const port=process.env.PORT || 3000;
app.listen(port, ()=>{console.log("Now Listening to requests at port: "+port)});