/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const subscribe2channel = /* GraphQL */ `
  subscription Subscribe2channel($channel: String!) {
    subscribe2channel(channel: $channel) {
      id
      channel
      body
      publishedAt
    }
  }
`;
export const onCreateWebPushSubscription = /* GraphQL */ `
  subscription OnCreateWebPushSubscription {
    onCreateWebPushSubscription {
      id
      subscription
      topic
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateWebPushSubscription = /* GraphQL */ `
  subscription OnUpdateWebPushSubscription {
    onUpdateWebPushSubscription {
      id
      subscription
      topic
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteWebPushSubscription = /* GraphQL */ `
  subscription OnDeleteWebPushSubscription {
    onDeleteWebPushSubscription {
      id
      subscription
      topic
      createdAt
      updatedAt
    }
  }
`;
