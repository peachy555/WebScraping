const request = require('request');
const cheerio = require('cheerio');

request('https://news.ycombinator.com/', (error, response, html) => {
	if(!error && response.statusCode == 200) {
		const $ = cheerio.load(html);

		const output = [];

		const titles = [];
		const users = [];
		const total_points = [];
		const total_comments = [];
		const links = [];

		// Extract titles and links into an array
		$('.storylink').each((i, el) => {
			const title= $(el).text();
			titles.push(title);

			const link= $(el).attr('href');
			links.push(link);
		});

		// Extract users into an array
		$('.subtext').each((i, el) => {
			const user= $(el).find('.hnuser').text();
			users.push(user);

			const total_point= $(el).find('.score').text();
			total_points.push(total_point);
		});

		// // Extract total_comments into an array
		// $('.').each((i, el) => {
		// 	const total_comment= $(el).text();
		// 	total_comments.push(total_comment);
		// });

		titles.forEach((i, el) => {
			const inst = new Object();

			inst["title"] = titles[el];
			inst["user"] = users[el];
			inst["total_points"] = total_points[el];
			// inst["total_comments"] = total_comments[el];
			inst["link"] = links[el];

			output.push(inst);

		});

		console.log(output);
	}
});
