const fs = require("fs");
const axios = require("axios");
const process = require("process");
const markov = require("./markov");

describe(`Test markov class makeChains method`, () => {
	let phrase;

	beforeEach(() => {
		phrase = new markov.MarkovMachine("The cat in the hat in a hat");
		console.log(phrase);
	});

	test("Test makeChains keys", () => {
		// let chains = phrase.makeChains();
		expect(Object.keys(phrase.chains)).toContain("the");
		expect(Object.keys(phrase.chains)).toContain("cat");
		expect(Object.keys(phrase.chains)).toContain("in");
	});

	test("Test makeChains keys arrays", () => {
		// let chains = phrase.makeChains();
		expect(phrase.chains["the"]).toContain("hat");
		expect(phrase.chains["in"]).toContain("the");
		expect(phrase.chains["in"]).toContain("a");
	});

	test("Test makeTest method", () => {
		// let chains = phrase.makeChains();
		expect(phrase.chains["the"]).toContain("hat");
		expect(phrase.chains["in"]).toContain("the");
		expect(phrase.chains["in"]).toContain("a");
	});
});

describe("Test the markov class makeText method", () => {
	let phrase;

	beforeEach(() => {
		phrase = new markov.MarkovMachine("The cat in the hat in a hat");
		console.log(phrase);
	});

	test("Test the default length", () => {
		const result = phrase.makeText();
		const wordCount = result.split(" ").length;
		expect(wordCount).toBeLessThanOrEqual(100);
	});

	test("Test specific length", () => {
		const result = phrase.makeText((numWords = 5));
		const wordCount = result.split(" ").length;
		expect(wordCount).toBeLessThanOrEqual(5);
	});

	test("Test to make sure returns string", () => {
		const result = phrase.makeText((numWords = 5));
		expect(typeof result).toBe("string");
	});
});
