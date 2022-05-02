const fs = require('fs');
const { parse } = require('path');

class UsersRepository {
	constructor(filename) {
		if (!filename) {
			throw new Error('Creating a repository requires a filename');
		}

		this.filename = filename;
		try {
			fs.accessSync(this.filename);
		} catch (err) {
			fs.writeFileSync(this.filename, '[]');
		}
	}

	async getAll() {
		return JSON.parse( 
			await fs.promises.readFile(this.filename, {
				encoding: 'utf8'
			})
		);
	}
}

async function test() {
	const repo = new UsersRepository('users.json');

	await repo.getAll();
}

test();
