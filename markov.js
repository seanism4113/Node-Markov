/** Textual Markov Chain Generator */

class MarkovMachine {
	/** build markov machine; read in text.*/
	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.makeChains();
	}

	makeChains() {
		let chains = {};

		for (let i = 0; i < this.words.length; i++) {
			let currentWord = this.words[i].toLowerCase();
			let nextWord = i < this.words.length - 1 ? this.words[i + 1].toLowerCase() : null;

			if (!chains[currentWord]) {
				chains[currentWord] = [];
			}
			chains[currentWord].push(nextWord);
		}
		this.chains = chains;
	}

	/** return random text from chains */
	makeText(numWords = 100) {
		let text = [];
		let chains = this.chains;
		let chainsLength = Object.keys(chains).length;
		let randNum = (val) => Math.floor(Math.random() * val);

		let firstWord = Object.keys(chains)[randNum(chainsLength)];
		text.push(firstWord);

		for (let i = 0; text.length < numWords; i++) {
			let currentWord = text[i];
			let optionWordsLength = chains[currentWord]?.length;

			if (optionWordsLength === undefined) {
				console.error(`Word "${currentWord}" not found in chains.`);
				break;
			}

			let addWord = optionWordsLength > 0 ? chains[currentWord][randNum(optionWordsLength)] : null;

			if (addWord === null) break;
			text.push(addWord);
		}

		return text.join(" ");
	}
}

module.exports = {
	MarkovMachine: MarkovMachine,
};
