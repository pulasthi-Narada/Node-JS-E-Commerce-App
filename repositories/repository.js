require('dotenv').config();

const fs = require('fs');
const crypto = require('crypto');
const mongoose = require('mongoose');

module.exports = class Repository {
  constructor(model) {
    if (!model) {
      throw new Error('Creating a repository requires a model');
    }

    this.filename = model;
    this.model = model;

    mongoose.connect(process.env.DATABASE_URL);
    const db = mongoose.connection;
    db.on('error', (e) => console.error(e));
    // db.once('open', () => console.error('conected to DB!'));
  }

  async create(attrs) {
    // attrs.id = this.randomId();

    // const records = await this.getAll();
    // records.push(attrs);
    // await this.writeAll(records);

    // return attrs;

    const item = new this.model(attrs);

    const newItem = await item.save();
    return newItem;
  }

  async getAll() {
    const records = await this.model.find();
    return records;
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2),
    );
  }

  async getOne(id) {
    const record = await this.model.findById(id);

    if (record) {
      return record;
    }
    return false;
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filter) {
    let record;

    try {
      record = await this.model.find(filter);

      if (record.length) {
        return record;
      }
      return false;
    } catch (err) {
      throw new Error(err);
    }
  }
};
