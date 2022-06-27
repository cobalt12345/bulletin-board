/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const pushMessageToChannel = /* GraphQL */ `
  mutation PushMessageToChannel($channel: String!, $data: String!) {
    pushMessageToChannel(channel: $channel, data: $data) {
      id
      channel
      body
      publishedAt
      createdAt
      updatedAt
    }
  }
`;
export const createWebPushSubscription = /* GraphQL */ `
  mutation CreateWebPushSubscription(
    $input: CreateWebPushSubscriptionInput!
    $condition: ModelWebPushSubscriptionConditionInput
  ) {
    createWebPushSubscription(input: $input, condition: $condition) {
      id
      subscription
      topic
      createdAt
      updatedAt
    }
  }
`;
export const updateWebPushSubscription = /* GraphQL */ `
  mutation UpdateWebPushSubscription(
    $input: UpdateWebPushSubscriptionInput!
    $condition: ModelWebPushSubscriptionConditionInput
  ) {
    updateWebPushSubscription(input: $input, condition: $condition) {
      id
      subscription
      topic
      createdAt
      updatedAt
    }
  }
`;
export const deleteWebPushSubscription = /* GraphQL */ `
  mutation DeleteWebPushSubscription(
    $input: DeleteWebPushSubscriptionInput!
    $condition: ModelWebPushSubscriptionConditionInput
  ) {
    deleteWebPushSubscription(input: $input, condition: $condition) {
      id
      subscription
      topic
      createdAt
      updatedAt
    }
  }
`;
export const createBoardMessage = /* GraphQL */ `
  mutation CreateBoardMessage(
    $input: CreateBoardMessageInput!
    $condition: ModelBoardMessageConditionInput
  ) {
    createBoardMessage(input: $input, condition: $condition) {
      id
      channel
      body
      publishedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateBoardMessage = /* GraphQL */ `
  mutation UpdateBoardMessage(
    $input: UpdateBoardMessageInput!
    $condition: ModelBoardMessageConditionInput
  ) {
    updateBoardMessage(input: $input, condition: $condition) {
      id
      channel
      body
      publishedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteBoardMessage = /* GraphQL */ `
  mutation DeleteBoardMessage(
    $input: DeleteBoardMessageInput!
    $condition: ModelBoardMessageConditionInput
  ) {
    deleteBoardMessage(input: $input, condition: $condition) {
      id
      channel
      body
      publishedAt
      createdAt
      updatedAt
    }
  }
`;
