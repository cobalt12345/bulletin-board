import * as React from 'react';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default class AddMessageDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {opinion: ''};
        console.debug('AddMessageDialog initially open: ' + this.state.open);
        this.handleTextTypeIn = this.handleTextTypeIn.bind(this);
        this.onSave = this.onSave.bind(this);
        this.hotKeyHandlers = {
            SAVE_MESSAGE: this.onSave
        }
    }

    handleTextTypeIn(event) {
        this.setState({opinion: event.target.value});
    }

    onSave() {
        if (this.state.opinion.trim().length > 0) {
            this.props.onSave(this.state.opinion);
        }
        this.setState({opinion: ''});
    }

    render() {
        return (
            <GlobalHotKeys handlers={this.hotKeyHandlers} focused='true'>
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
                                />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                this.setState({opinion: ''})
                                this.props.onCancel();
                            }}>Cancel</Button>
                            <Button onClick={this.onSave}>Add</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </GlobalHotKeys>
        );
    }
}
