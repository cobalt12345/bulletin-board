import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

export default class BBoardApiClient {

    constructor(onReceiveMessageCallback: function, channelName = 'BBoardMessagesChannel') {
        this.onReceiveMessageCallback = onReceiveMessageCallback;
        this.channelName = channelName;
        this.subscribe();
    }

    subscribe() {
        console.debug(`Subscribe to channel ${this.channelName}`)
        this.subscription = API.graphql(graphqlOperation(subscriptions.subscribe2channel, {channel: this.channelName}))
            .subscribe({
                    next: this.onReceiveMessageCallback,
                error: (error) => console.error('API subscription error', error)
            });
        console.debug(this.subscription);
    }

    async publish(message) {
        console.debug(`Publish message '${message}' to the channel ${this.channelName}`);

        return API.graphql(graphqlOperation(mutations.pushMessageToChannel,
            {channel: this.channelName, data: message}));

    }

    unsubscribe() {
        console.debug(`Unsubscribe from channel ${this.channelName}`)
        this.subscription.unsubscribe();
    }

    storeWebPushSubscription(subscription, topic) {
        console.debug(`Store webpush subscription ${subscription} to the topic ${topic}`);

        return API.graphql(graphqlOperation(mutations.createWebPushSubscription, {input: {
                id: uuidv4(),
                subscription,
                topic
            }}))

    }
}