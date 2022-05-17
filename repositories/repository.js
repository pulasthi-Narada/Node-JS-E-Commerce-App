require('dotenv').config();

const fs = require('fs');
const crypto = require('crypto');
const mongoose = require('mongoose');

module.exports = class Repository {
  constructor(model) {
    if (!model) {
      throw new Error('Creating a repository requires a model');
    }

    this.model = model;

    mongoose.connect(process.env.DATABASE_URL);
    const db = mongoose.connection;
    db.on('error', (e) => console.error(e));
    // db.once('open', () => console.error('conected to DB!'));
  }

  async create(attrs) {
    const item = new this.model(attrs);

    const newItem = await item.save();
    return newItem;
  }

  async getAll() {
    const records = await this.model.find();
    return records;
  }

  async getOne(id) {
    const record = await this.model.findById(id);

    if (record) {
      return record;
    }
    return false;
  }

  async delete(id) {
    await this.model.findByIdAndRemove(id);
  }

  async update(id, attrs) {
    await this.model.findByIdAndUpdate(id, attrs);
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
