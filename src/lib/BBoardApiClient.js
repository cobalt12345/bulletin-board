import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from '../graphql/subscriptions';
import * as mutations from '../graphql/mutations';

export default class BBoardApiClient {

    constructor(onReceiveMessageCallback: function, channelName = 'BBoardMessagesChannel') {
        this.onReceiveMessageCallback = onReceiveMessageCallback;
        this.channelName = channelName;
        this.subscribe().then((value) => {console.debug('Subscribed...', value)});
    }

    async subscribe() {
        console.debug(`Subscribe to channel ${this.channelName}`)
        this.subscription = await API.graphql(graphqlOperation(subscriptions.subscribe2channel, {name: this.channelName}))
            .subscribe({
                    next: this.onReceiveMessageCallback,
                error: (error) => console.error('API subscription error', error)
            });
        console.debug(this.subscription);
    }

    publish(message: {Subject: '', Body: ''}) {
        console.debug(`Publish message '${JSON.stringify(message)}' to the channel ${this.channelName}`);

        const publish = API.graphql(graphqlOperation(mutations.publish2channel,
            {name: this.channelName, data: JSON.stringify(message)}));

        return publish;
    }

    unsubscribe() {
        console.debug(`Unsubscribe from channel ${this.channelName}`)
        this.subscription.unsubscribe();
    }
}