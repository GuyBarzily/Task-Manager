import { gql } from '@apollo/client';

export const TASK_LIST_UPDATED = gql`
subscription TaskListUpdated {
  taskListUpdated {
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
