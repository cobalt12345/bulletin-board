/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const getBoardMessage = /* GraphQL */ `
  query GetBoardMessage($id: ID!) {
    getBoardMessage(id: $id) {
      id
      channel
      body
      publishedAt
      createdAt
      updatedAt
    }
  }
`;
export const listBoardMessages = /* GraphQL */ `
  query ListBoardMessages(
    $filter: ModelBoardMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBoardMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        channel
        body
        publishedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByPublishDate = /* GraphQL */ `
  query MessagesByPublishDate(
    $channel: String!
    $publishedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBoardMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByPublishDate(
      channel: $channel
      publishedAt: $publishedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        channel
        body
        publishedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
