import { gql } from "apollo-boost";

export const TODOS_QUERY = gql`
  {
    todos {
      id
      title
      dueDate
      completed
      createdAt
      updatedAt
      author {
        name
      }
    }
  }
`;

export const COMPLETED_TODO = gql`
  {
    todos(where: { completed: true }) {
      id
      title
      dueDate
      completed
      createdAt
      updatedAt
      author {
        name
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation (
    $title: String
    $description: String
    $dueDate: Date
    $completed: Boolean
  ) {
    createTodo(
      data: {
        title: $title
        description: $description
        dueDate: $dueDate
        completed: $completed
      }
    ) {
      id
      title
    }
  }
`;

export const PUBLISH_NEW_TODO = gql`
  mutation ($id: ID!) {
    publishTodo(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;
