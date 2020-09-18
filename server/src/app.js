const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const { getDatabase } = require('./database/mongo');

const Chapter = require('./database/models/chapter');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Chapter {
      _id: ID!
      title: String!
      availableFor: String!
    }

    input ChapterInput {
      title: String!
      availableFor: String!
    }

    type RootQuery {
      chapters: [Chapter!]!
    }

    type RootMutation {
      createChapter(chapterInput: ChapterInput): Chapter
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    chapters: async () => await Chapter.find(),
    createChapter: async (args) => {
      const chapter = new Chapter({
        title: args.eventInput.title,
        availableFor: args.eventInput.availableFor,
      });
      try {
        await chapter.save();
        return chapter;
      } catch (error) {
        console.error('Chapter creation failed due to error: ', error);
        throw error;
      }
    },
  },
  graphiql: true
}));

app.get('/', (req, res, next) => {
  res.send('Hello!');
});

// app.listen(3000);

getDatabase()
  .then(() => app.listen(3000))
  .catch((error) =>
    console.error('error: ', error));