const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let database = null;
const mongooseOpts = { // options for mongoose 4.11.3 and above
  promiseLibrary: Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function startDatabase() {
  const mongo = new MongoMemoryServer({
    binary: {
      version: '4.2.9'
    }
  }, {
    instance: {
      debug: true
    }
  });
  try {
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri, mongooseOpts);
  } catch (error) {
    console.error('Database connection error: ', error);
  }
  database = mongoose.connection;

  database.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  database.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};