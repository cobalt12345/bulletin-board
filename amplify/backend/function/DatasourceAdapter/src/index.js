const { v4: uuidv4 } = require('uuid');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context, callback) => {
    console.debug("Received event {}", JSON.stringify(event, 3));
    console.debug("Context {}", JSON.stringify(event, 3));
    let message = {
        id: uuidv4(),
        channel: event.arguments.channel,
        body: event.arguments.data,
        publishedAt: new Date().toISOString()
    };

    callback(null, message);
};