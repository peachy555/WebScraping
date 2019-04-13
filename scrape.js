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

		$('.storylink').each((i, el) => {
			// Extract title
			const title= $(el).text();
			titles.push(title);

			// Extract link
			const link= $(el).attr('href');
			links.push(link);
		});

		$('.subtext').each((i, el) => {
			// Extract users
			const user= $(el).find('.hnuser').text();
			users.push(user);

			// Extract total_points
			var total_point= $(el).find('.score').text();
			total_point = total_point.match(/[0-9]+/g);
			total_point = parseInt(total_point, 10);
			total_points.push(total_point);

			// Extract total_comments
			var subtext= $(el).text();
			const hasComment= subtext.match(/(comment)/g);
			var total_comment = 0;
			if(hasComment) {
				// Extract number of comments
				subtext = subtext.replace(/\s/g, "");
				subtext = subtext.slice(subtext.length-12);
				subtext = subtext.match(/[0-9]+/g);
				total_comment = parseInt(subtext, 10);
			}
			total_comments.push(total_comment);
		});

		// Compile into object, push into output array
		titles.forEach((i, el) => {
			const inst = new Object();

			inst["title"] = titles[el];
			inst["user"] = users[el];
			inst["total_points"] = total_points[el];
			inst["total_comments"] = total_comments[el];
			inst["link"] = links[el];

			output.push(inst);
		});
		console.log(output);
	}
});
