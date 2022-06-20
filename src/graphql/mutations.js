/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const pushMessageToChannel = /* GraphQL */ `
  mutation PushMessageToChannel($channel: String!, $data: String!) {
    pushMessageToChannel(channel: $channel, data: $data) {
      id
      channel
      body
      publishedAt
    }
  }
`;
