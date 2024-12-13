import { gql } from '@apollo/client';

export const CREATE_TASK_LIST = gql`
  mutation CreateTaskList($title: String!, $taskIds: [ID!]!,$visible: Boolean!) {
    createTaskList(title: $title, taskIds: $taskIds, visible: $visible) {
      id
      title
      tasks {
        id
        title
      }
      visible
    }
  }
`;

export const GET_ALL_TASK_LISTS = gql`
  query GetAllTaskLists {
    taskLists {
      id
      title
      tasks {
        id
        title
        priority
        deadline
        description
        completed
      }
      visible
    }
  }
`;


export const CREATE_TASK = gql`
    mutation CreateTask(
        $title: String!
        $priority: String!
        $deadline: String
        $description: String
        $completed: Boolean
        $listId: ID!
    ) {
        createTask(
            title: $title
            priority: $priority
            deadline: $deadline
            description: $description
            completed: $completed
            listId: $listId
        ) {
            id
            title
            priority
            deadline
            description
            completed
        }
    }
`;
export const UPDATE_TASK = gql`
    mutation UpdateTask(
        $id: ID!
        $title: String!
        $priority: String!
        $deadline: String
        $description: String
        $completed: Boolean
    ) {
        updateTask(
            id: $id
            title: $title
            priority: $priority
            deadline: $deadline
            description: $description
            completed: $completed
        ) {
            id
            title
            priority
            deadline
            description
            completed
        }
    }
`;


