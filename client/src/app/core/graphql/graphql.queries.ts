import { gql } from 'apollo-angular';

const GET_NOTES = gql`
  query {
    notes {
      id
      title
      description
      date
    }
  }
`;

const ADD_NOTE = gql`
  mutation addNote($title: String!, $description: String!) {
    addNote(title: $title, description: $description) {
      id,
      title
      description,
      date
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation updateNote($id: Int!, $title: String!, $description: String!) {
    updateNote(id: $id, title: $title, description: $description) {
      id
      title
      description,
      date
    }
  }
`;

const DELETE_NOTE = gql`
  mutation deleteNote($id: Int!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export { GET_NOTES, ADD_NOTE, DELETE_NOTE, UPDATE_NOTE };
