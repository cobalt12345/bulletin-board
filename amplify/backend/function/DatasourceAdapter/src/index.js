

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context, callback) => {
    console.debug("Received event {}", JSON.stringify(event, 3));
    console.debug("Context {}", JSON.stringify(event, 3));
    let message = {channel: event.arguments.channel, message: event.arguments.message};
    callback(null, message);
};