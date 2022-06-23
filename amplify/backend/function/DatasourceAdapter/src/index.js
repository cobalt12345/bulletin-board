const { v4: uuidv4 } = require('uuid');
const webpush = require('web-push');
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

async function getSubscriptions() {
    const client = new DynamoDBClient({region: 'eu-central-1'});
    const command = new ScanCommand({
        TableName: 'WebPushSubscription-htwebbaj4bcm5edviicia3ytma-dev',
        // AttributesToGet: ['id', 'subscription', 'topic'],
        FilterExpression: 'topic = :topicName',
        ExpressionAttributeValues: {":topicName":{"S":"imho"}}
    });
    try {
        const response = await client.send(command);
        console.debug(JSON.stringify(response));

        return response['Items'].map((item, index, array) => {
            const subscriptionObj = JSON.parse(item.subscription['S']);
            console.debug("Subscription: ", subscriptionObj);

            return subscriptionObj;
        });
    } catch (error) {
        console.error('Couldn\'t get subscriptions', error);
    }
}


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
    console.debug("Received event {}", JSON.stringify(event, 3));

    console.debug("Context {}", JSON.stringify(event, 3));
    let message = {
        id: uuidv4(),
        channel: event.arguments.channel,
        body: event.arguments.data,
        publishedAt: new Date().toISOString()
    };

    callback(null, message);

    let promises = [];
    try {
        let subscriptions = await getSubscriptions();
        console.debug("Subscriptions: ", subscriptions);

        subscriptions.forEach((subscription) => {
            let result = webpush.sendNotification(subscription, JSON.stringify({body: message.body, title: 'IMHO Board Message'}));
            promises.push(result);
        });
    } catch(err) {
        console.error(err)
    }
    await Promise.all(promises);

};