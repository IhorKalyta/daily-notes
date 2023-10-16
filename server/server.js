const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString } = require("graphql");

const app = express();

const Notes = [
  { id: 1, title: 'First', description: 'some description', date: '2023-10-02 12:47:38' }
];

const NoteType = new GraphQLObjectType({
  name: 'Note',
  description: 'This is a note',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    notes: {
      type: new GraphQLList(NoteType),
      description: 'List of All Notes',
      resolve: () =>  Notes
    }
  })
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addNote: {
      type: NoteType,
      description: 'Add a new Note',
      args: {
          title: {
              type: new GraphQLNonNull(GraphQLString)
          },
          description: {
              type: new GraphQLNonNull(GraphQLString)
          },
      },
      resolve: (root, args) => {
          const newNote = {
              id: Notes.length + 1,
              title: args.title,
              description: args.description,
              date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
          }
          Notes.push(newNote);
          return newNote;
    }},
    updateNote: {
      type: NoteType,
      description: 'Update a Note',
      args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          title: {
              type: new GraphQLNonNull(GraphQLString)
          },
          description: {
              type: new GraphQLNonNull(GraphQLString)
          },
      },
      resolve: (root, args) => {
          const note = Notes.find(note => note.id === args.id);
          if(note) {
            note.title = args.title;
            note.description = args.description;
            return note;
          }
          return null;
    }},
    deleteNote: {
      type: NoteType,
      description: 'Delete a Note',
      args: {
          id: {
              type: new GraphQLNonNull(GraphQLInt)
          },
      },
      resolve: (root, args) => {
          const note = Notes.find(note => note.id === args.id);
          if(note){
              Notes.splice(Notes.indexOf(note), 1);
              return note;
          }
          return null;
      }
    },
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
app.listen(4000);

console.log("Running a GraphQL API server at localhost:4000/graphql");
