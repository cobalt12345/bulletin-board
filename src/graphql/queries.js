/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allMessages = /* GraphQL */ `
  query AllMessages {
    allMessages {
      id
      channel
      body
      publishedAt
    }
  }
`;
export const lastNMessages = /* GraphQL */ `
  query LastNMessages($numOfMessages: Int!) {
    lastNMessages(numOfMessages: $numOfMessages) {
      id
      channel
      body
      publishedAt
    }
  }
`;
export const getWebPushSubscription = /* GraphQL */ `
  query GetWebPushSubscription($id: ID!) {
    getWebPushSubscription(id: $id) {
      id
      subscription
      topic
      createdAt
      updatedAt
    }
  }
`;
export const listWebPushSubscriptions = /* GraphQL */ `
  query ListWebPushSubscriptions(
    $filter: ModelWebPushSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWebPushSubscriptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        subscription
        topic
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
