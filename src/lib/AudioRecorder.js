import React, { useState } from 'react';
import MicrophoneStream from 'microphone-stream';
import Button from "@mui/material/Button";
import {PlayArrow, Stop} from "@mui/icons-material";
import {Predictions} from "aws-amplify";

export default function AudioRecorder(props) {

    const [recording, setRecording] = useState(false);
    const [micStream, setMicStream] = useState();
    const [transcribing, setTranscribing] = useState();

    const [audioBuffer] = useState(
        (function () {
            let buffer = [];

            function add(raw) {
                buffer = buffer.concat(...raw);
                return buffer;
            }

            function newBuffer() {
                // console.log("resetting buffer");
                buffer = [];
            }

            return {
                reset: function () {
                    newBuffer();
                },
                addData: function (raw) {
                    return add(raw);
                },
                getData: function () {
                    return buffer;
                }
            };
        })()
    );

    async function startRecording() {
        // console.log('start recording');
        props.onStartRecording(true);
        audioBuffer.reset();

        window.navigator.mediaDevices.getUserMedia({video: false, audio: true}).then((stream) => {
            const microphoneStream = new MicrophoneStream({bufferSize: 256, objectMode: false});
            microphoneStream.setStream(stream);
            microphoneStream.on('data', (chunk) => {
                let raw = MicrophoneStream.toRaw(chunk);
                if (raw == null) {
                    return;
                }
                audioBuffer.addData(raw);
            });
            setRecording(true);
            setMicStream(microphoneStream);
        });
    }

    async function stopRecording() {
        // console.log('stop recording');
        setTranscribing(true);
        micStream.stop();
        setMicStream(null);
        setRecording(false);

        const resultBuffer = audioBuffer.getData();

        await convertFromBuffer(resultBuffer);

    }

    async function convertFromBuffer(bytes) {
        await Predictions.convert({
            transcription: {
                source: {
                    bytes
                },
                // language: "en-US", // other options are "en-GB", "fr-FR", "fr-CA", "es-US"
            },
        }).then(({ transcription: { fullText } }) => {
            // console.debug('Transcribed text: ', fullText);
            // this.setState({opinion: fullText, isRecording: false});
            props.onStopRecording(false, fullText);
            setTranscribing(false);
        }).catch(err => console.error(JSON.stringify(err, null, 2)))
    }

    async function onStartStopRecord() {
        if (recording) {
            // console.debug('Stop recording');
            await stopRecording();
        } else {
            // console.debug('Start recording');
            await startRecording();
        }
    }

    return (
            <Button onClick={onStartStopRecord}
                    variant="outlined"
                    color="error"
                    startIcon={recording ? <Stop/> : <PlayArrow/>}
                    disabled={transcribing}>

                {(() => {
                    return recording ? 'Stop speech recognition' : 'Start speech recognition';
                })()}
            </Button>
    );
}