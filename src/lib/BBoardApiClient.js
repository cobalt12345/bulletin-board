import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

import { v4 as uuidv4 } from 'uuid';

export default class BBoardApiClient {

    constructor(onReceiveMessageCallback: function, channelName = 'BBoardMessagesChannel') {
        this.onReceiveMessageCallback = onReceiveMessageCallback;
        this.channelName = channelName;
        this.subscribe();
    }

    subscribe(retrying = 0) {
        console.debug(`Subscribe to the channel ${this.channelName}`)
        setTimeout(() => {
            this.subscription = API.graphql(graphqlOperation(subscriptions.onCreateBoardMessage)).subscribe({
                next: (event) => {retrying = 0; this.onReceiveMessageCallback(event)},
                error: (error) => {
                    console.warn('API subscription error', JSON.stringify(error), 'Re-subscribe now');
                    if (retrying === 0) {
                        retrying = 50
                    }
                    this.subscribe(retrying * 2);
                },
                complete: () => console.debug('API subscription complete')
            });

            console.debug('Subscription:', this.subscription);
        }, retrying);

    }

    async publish(message) {
        console.debug(`Publish message '${message}' to the channel ${this.channelName}`);
        API.graphql(graphqlOperation(mutations.pushMessageToChannel, {channel: this.channelName,
            data: message})).then((value => {
                console.debug('Push notification:', JSON.stringify(value))
        }), (reason => {
            console.error('Push notification failed', reason)
        }))
        return API.graphql(graphqlOperation(mutations.createBoardMessage,
            {input: {channel: this.channelName, body: message, id: uuidv4(), publishedAt: new Date().toISOString()}}));

    }

    unsubscribe() {
        console.debug(`Unsubscribe from channel ${this.channelName}`)
        this.subscription.unsubscribe();
    }

    getMessages() {
        return API.graphql(graphqlOperation(queries.messagesByPublishDate, {channel: this.channelName,
            sortDirection: 'DESC'}));
    }

    getLastNMessages(numOfMessages:Number, nextToken:String) {
        return API.graphql(graphqlOperation(queries.messagesByPublishDate,
            {channel: this.channelName,
                sortDirection: 'DESC', limit: numOfMessages, nextToken}));
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