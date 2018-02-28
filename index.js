let express = require('express');
let bodyParser = require('body-parser')
let Youtube = require('youtube-stream-url');

let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

let port = process.env.PORT || 3000;

app.get('/watch', async (req, res) => {
	let v = req.query.v;

	let data = await Youtube.getInfo({url: 'https://www.youtube.com/watch?v=' + v})

	if (!data) {
		return res.json({
			success: false
		});
		
	}

	return res.json({
		success: true,
		data
	});


});

app.post('/getLink', async (req, res) => {
	let url = req.body.url;

	console.log(req.body);

	let data = await Youtube.getInfo({url})

	if (!data) {
		return res.json({
			success: false
		});
		
	}

	return res.json({
		success: true,
		data
	});
});

app.listen(port, (err) => {
	if (err) {
		console.log(err);
		return;
	}

	console.log("SERVER RUNNING ON PORT " + port);
})
