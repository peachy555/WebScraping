const request = require('request');
const cheerio = require('cheerio');

request('https://news.ycombinator.com/', (error, response, html) => {
	if(!error && response.statusCode == 200) {
		const $ = cheerio.load(html);

		const output = [];
		const titles = [];

		$('.storylink').each((i, el) => {

			const title= $(el).text();

			// dataset["Title"] = title;
			titles.push(title);
		});

		console.log(titles);

	}
});
