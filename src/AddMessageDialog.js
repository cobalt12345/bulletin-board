import * as React from 'react';
import Amplify, { Storage, Predictions } from 'aws-amplify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Component} from "react";
import {TextField} from "@mui/material";
import {GlobalHotKeys} from "react-hotkeys";
import AudioRecorder from "./lib/AudioRecorder";
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default class AddMessageDialog extends Component {

    MAX_NUM_OF_CHARACTERS_PER_MSG = process.env.REACT_APP_MAX_NUM_OF_CHARACTERS_PER_MSG;

    constructor(props) {
        super(props);
        this.state = {opinion: '', isRecording: false, errorMessages: []};
        console.debug('AddMessageDialog initially open: ' + this.state.open);
        this.handleTextTypeIn = this.handleTextTypeIn.bind(this);
        this.onSave = this.onSave.bind(this);
        this.isMessageValid = this.isMessageValid.bind(this);
        this.hotKeyHandlers = {
            SAVE_MESSAGE: this.onSave
        }
    }

    handleTextTypeIn(event) {
        this.isMessageValid(event.target.value);
        this.setState({opinion: event.target.value})
    }

    isMessageValid(text) {

        if (text.length > this.MAX_NUM_OF_CHARACTERS_PER_MSG) {
            this.setState({errorMessages: [`Message exceeds ${this.MAX_NUM_OF_CHARACTERS_PER_MSG} characters`]});

            return false;
        } else {
            this.setState({
                errorMessages: []
            })

            return true;
        }

    }

    onSave() {
        const trimmedMessage = this.state.opinion.trim();
        if (trimmedMessage.length > 0 && this.isMessageValid(trimmedMessage)) {
            this.props.onSave(this.state.opinion);
            this.setState({opinion: ''});
        }
    }

    render() {

        return (
            <GlobalHotKeys handlers={this.hotKeyHandlers}>
                <div>
                    <Dialog
                        open={this.props.isOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => {
                            this.setState({opinion: ''});
                            this.props.onCancel();
                        }}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Add your opinion"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Your opinion:
                            </DialogContentText>
                            {
                                this.state.isRecording ? (<CircularProgress />) : (
                                <TextField
                                    id="filled-multiline-flexible"
                                    label="Multiline"
                                    multiline
                                    sx={{
                                        minWidth: 500
                                    }}
                                    maxRows={6}
                                    value={this.state.opinion}
                                    onChange={this.handleTextTypeIn}
                                    variant="filled"
                                    focused
                                    autoFocus
                                    error={this.state.errorMessages.length > 0}
                                    helperText={this.state.errorMessages.join('\n')}
                                />
                                )
                            }
                        </DialogContent>
                        <DialogActions>
                                <AudioRecorder onStartRecording={
                                    (start:boolean) => {this.setState({isRecording: start})}
                                }
                                onStopRecording={
                                    (start: boolean, text: string) => {
                                        this.setState({isRecording: start, opinion: text});
                                        this.handleTextTypeIn({target: {value: text}})
                                    }
                                }
                                />
                            <Button onClick={() => {
                                this.setState({opinion: '', errorMessages: []})
                                this.props.onCancel();
                            }} disabled={this.state.isRecording}>Cancel</Button>

                            <Button onClick={this.onSave} disabled={this.state.isRecording || this.state.errorMessages.length > 0}>Add</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </GlobalHotKeys>
        );
    }
}
