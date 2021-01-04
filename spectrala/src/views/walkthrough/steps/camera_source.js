import React from 'react';

export default (
    <div>
        Establish a visual of the spectrum inside the spectrometer.
        <details>
            <summary>
                Stream from an iPhone or Android using the app DroidCam
            </summary>
            <ol type="1">
                <li>
                    Install DroidCam on your device (
                    <a
                        href="https://apps.apple.com/us/app/droidcam/id1510258102"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        iOS
                    </a>
                    ) (
                    <a
                        href="https://play.google.com/store/apps/details?id=com.dev47apps.droidcam&hl=en_US&gl=US"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Android
                    </a>
                    ).
                </li>
                <li>
                    In the source selection menu on the left side of the screen,
                    select the leftmost icon that looks like a smartphone.
                </li>
                <li>
                    Ensure your smartphone and computer are connected to the
                    same local network (Both are using Wi-Fi with the same
                    name).
                </li>
                <li>
                    Input the IP and Port displayed on the screen in the
                    DroidCam app into Spectrala under the source select buttons.
                </li>
            </ol>
        </details>
        <details>
            <summary>Any other stream on your local network</summary>
            <ol type="1">
                <li>
                    In the source selection menu on the left side of the screen,
                    select the icon second to the left that looks like a
                    broadcast pin.
                </li>
                <li>
                    Ensure your camera stream and computer are connected to the
                    same local network.
                </li>
                <li>
                    Input the stream URL into Spectrala under the source select
                    buttons.
                </li>
            </ol>
        </details>
        <details>
            <summary>Stream from a webcam</summary>
            <ol type="1">
                <li>
                    In the source selection menu on the left side of the screen,
                    select the icon second to the right that looks like a video
                    camera.
                </li>
                <li>
                    Choose the desired webcam from the dropdown menu. If no
                    webcams appear, ensure you haven't accidentaly blocked
                    Spectrala from accessing the webcam and that the camera is
                    plugged into the computer.
                </li>
            </ol>
        </details>
        <details>
            <summary>Upload previously captured images</summary>
            <ol type="1">
                <li>
                    In the source selection menu on the left side of the screen,
                    select the rightmost icon that looks like a piece of paper.
                </li>
                <li>Select an image to upload from your computer.</li>
            </ol>
            Note that you'll be able to repeat this process to upload additional
            images going forward.
        </details>
    </div>
);
