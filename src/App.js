import * as React from 'react';
import './App.css';
import {AppBar, Box, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import {Component} from "react";
import ProTip from "./ProTip";
import IconButton from '@mui/material/IconButton';
import AddComment from '@mui/icons-material/AddComment';
import AddMessageDialog from "./AddMessageDialog";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {configure, GlobalHotKeys} from "react-hotkeys";
import {Item, keyMap} from "./lib/utils";
import BBoardApiClient from "./lib/BBoardApiClient";
import subscribe from './lib/subscribe-to-webpush';

if (process.env.REACT_APP_ENV === 'production') {
    global.consoleDebug = console.debug;
    console.debug = function () {
        global.consoleDebug("Console debug is disabled in production");
    }
}


configure({
    ignoreTags: []
})

class OpinionBoard extends Component {

    messagesPerPage = process.env.REACT_APP_NUM_OF_MESSAGES_PER_PAGE;
    darkTheme = createTheme({ palette: { mode: 'dark' } });
    lightTheme = createTheme({ palette: { mode: 'light' } });
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            messages: [],
            nextToken: null,
            itemsAlreadyRequested: false
        }
        this.onAddMessage = this.onAddMessage.bind(this);
        this.onSaveMessage = this.onSaveMessage.bind(this);
        this.onCancelMessage = this.onCancelMessage.bind(this);
        this.onReceiveMessage = this.onReceiveMessage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.hotKeyHandlers = {
            NEW_MESSAGE: this.onAddMessage
        }
    }

    componentDidMount() {
        this.apiClient = new BBoardApiClient(this.onReceiveMessage);

        this.apiClient.getLastNMessages(this.messagesPerPage).then(allMessages => {
            console.debug(`Initial ${this.messagesPerPage} messages:`, allMessages);
            const nextToken = allMessages.data.messagesByPublishDate.nextToken;
            const messages = [];
            allMessages.data.messagesByPublishDate.items.forEach(item => messages.push(item));
            this.setState({messages, nextToken})
        });

        subscribe(process.env.REACT_APP_WEB_PUSH_TOPIC, this.apiClient)
            .then((value) => {
                console.debug('Subscribed to webpush topic', value);
            })
            .catch((reason) => {
                console.error('Subscription to webpush failed', reason)
            });

        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        if (this.state.nextToken && !this.state.itemsAlreadyRequested) {
            this.setState({itemsAlreadyRequested: true});
            this.apiClient.getLastNMessages(this.messagesPerPage, this.state.nextToken).then(nMessages => {
                console.debug(`Next ${this.messagesPerPage} messages:`, nMessages);
                const nextToken = nMessages.data.messagesByPublishDate.nextToken;
                const nextMessages = [];
                nMessages.data.messagesByPublishDate.items.forEach(item => nextMessages.push(item));
                this.setState((prevState) => ({messages: prevState.messages.concat(nextMessages), nextToken,
                    itemsAlreadyRequested: false}));
            });
        } else if (this.state.itemsAlreadyRequested) {
            //console.debug('Next message items already requested');
        } else if (!this.state.nextToken) {
            // console.debug('There no more messages');
        }

    }

    componentWillUnmount() {
        this.apiClient.unsubscribe();
    }

    /**
     * Save new message means send it to the queue, than receive it and expose on the board.
     *
     * @param message
     */
    onSaveMessage(message) {
        console.debug("Save message: " + message);
        let channel = this.apiClient.publish(message)
            .then((value) =>
                {console.debug('Message published', JSON.stringify(value))})
            .catch((reason) => {console.error('Message publish failed', reason)});

        this.setState({dialogOpen: false});
    }

    onReceiveMessage(message) {
        if (message) {
            console.debug('Received message:', JSON.stringify(message));
            let arrayOfMessage = [];
            let messageObj = message.value.data.onCreateBoardMessage;
            console.debug('Message body:', JSON.stringify(messageObj));
            arrayOfMessage.push(messageObj);
            this.setState((prevState, props) => {
                const messagesIncremented = arrayOfMessage.concat(prevState.messages);
                return {
                    messages: messagesIncremented
                }
            });
        }
    }

    onAddMessage() {
        console.debug('Add message');
        this.setState({dialogOpen: true})
    }

    onCancelMessage() {
        console.debug('Cancel message');
        this.setState({dialogOpen: false});
    }

    render() {
        const messageItems = this.state.messages.map((message, index) => {
            return (
                        <Item key={index} elevation={10}>
                                {message.body.split('\n').map((messageRow, messageRowIndex) => {
                                    return <div key={messageRowIndex}>{messageRow}</div>;
                                })}
                        </Item>
            )

        });
        return (
            <GlobalHotKeys keyMap={keyMap} handlers={this.hotKeyHandlers} focused>
                <Container maxWidth="xl">
                <AppBar position="sticky">
                    <Toolbar variant="regular">
                        <Typography variant="h6" color="inherit" component="div">
                            Don't be afraid! Tell your opinion.
                        </Typography>
                        <IconButton
                            onClick={this.onAddMessage}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ m: 2 }}
                        >
                            <AddComment />
                        </IconButton>
                        <ProTip />
                    </Toolbar>
                </AppBar>
                <Box sx={{
                    height: 500
                }}>
                    <Paper elevation={10}>
                        <Typography variant="h4" component="h1" gutterBottom>
                        </Typography>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <ThemeProvider theme={this.lightTheme}>
                                <Box id="messages"
                                    sx={{
                                        p: 2,
                                        bgcolor: 'background.default',
                                        display: 'grid',
                                        gridTemplateColumns: { md: '1fr 1fr 1fr 1fr 1fr' },
                                        gap: 2,
                                        color: 'text.secondary',
                                    }}>
                                        {messageItems}
                                </Box>
                            </ThemeProvider>
                        </Grid>
                    </Paper>
                </Box>
                <AddMessageDialog isOpen={this.state.dialogOpen} onSave={this.onSaveMessage}
                                  onCancel={this.onCancelMessage} />
            </Container>
            </GlobalHotKeys>
    );
    }

}

export default OpinionBoard;
