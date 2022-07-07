# Whole application description

Current repository contains a simple implementation of a Bulletin Message Board.<br/>
Messages on the board are exposed as paper stickers.<br/>

![Message Board UI](https://github.com/cobalt12345/bulletin-board/blob/ca4fa8dd75bbf6089883d9e6957732eb58550445/ui.png)

User can either type in, or dictate a message. Voice messages are transformed to the text. Voice recognition is
supported at the moment for English language only.


## Application Architecture

Application is written on ReactJs with Amplify framework.
It uses AWS AppSync as a back-end to publish/subscribe messages. Messages are stored in the DynamoDB.<br/><br/>
<strong>Voice records are not stored!</strong><br/><br/>
Lambda function implements a fanout for Web Push notifications - user is notified about new message on the
board even if he/she has closed an application tab.<br/>

![Message Board UI](https://github.com/cobalt12345/bulletin-board/blob/ca4fa8dd75bbf6089883d9e6957732eb58550445/bulletin-board-design.png)

Web Push notifications are supported for the desktop Google Chrome only. Implementation for Apple devices requires
a registered developer account.


## See how it works
<a href="https://www.imho.talochk.in/">IMHO - Free Anonymous Message Board</a>
