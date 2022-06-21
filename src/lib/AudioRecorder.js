import React, { useState } from 'react';
import MicrophoneStream from 'microphone-stream';
import Button from "@mui/material/Button";

export default function AudioRecorder(props) {
    const [recording, setRecording] = useState(false);
    const [micStream, setMicStream] = useState();
    const [audioBuffer] = useState(
        (function () {
            let buffer = [];

            function add(raw) {
                buffer = buffer.concat(...raw);
                return buffer;
            }

            function newBuffer() {
                console.log("resetting buffer");
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
        console.log('start recording');
        audioBuffer.reset();

        window.navigator.mediaDevices.getUserMedia({video: false, audio: true}).then((stream) => {
            const microphoneStream = new MicrophoneStream({bufferSize: 256, objectMode: true});
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
        console.log('stop recording');
        const {finishRecording} = props;

        micStream.stop();
        setMicStream(null);
        setRecording(false);

        const resultBuffer = audioBuffer.getData();

        if (typeof finishRecording === "function") {
            finishRecording(resultBuffer);
        }

    }

    async function onStartStopRecord() {
        if (recording) {
            console.debug('Stop recording');
            await stopRecording();
        } else {
            console.debug('Start recording');
            await startRecording();
        }
    }

    return (
        <Button onClick={onStartStopRecord}>
            {(() => {
                return recording ? 'Stop' : 'Start';
            })()}
        </Button>
    );
}