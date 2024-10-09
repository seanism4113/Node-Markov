/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");
const process = require("process");
const markov = require("./markov");

function generateText(text) {
	let mm = new markov.MarkovMachine(text);
	console.log(mm.makeText());
}

const makeText = (path) => {
	fs.readFile(path, "utf8", (err, data) => {
		if (err) {
			console.log(`Cannot read file ${path}: ${err}`);
			process.exit(1);
		}
		generateText(data);
	});
};

const makeTextUrl = async (url) => {
	let response;
	try {
		response = await axios.get(url);
	} catch (err) {
		console.log(`Cannot read URL: ${url}: ${err}`);
		process.exit(1);
	}
	generateText(response.data);
};

let [method, path] = process.argv.slice(2);

if (method === "file") {
	makeText(path);
} else if (method === "url") {
	makeTextUrl(path);
} else {
	console.error(`Unknown method ${method}`);
	process.exit(1);
}
