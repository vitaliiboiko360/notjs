

let video = document.getElementsByTagName('video')[0];

let owner = document.getElementById('owner');
let button = document.createElement('button');
button.innerText = 'BUTTON_TO_START';
button.style = "width:80px;heigth:60px;color:grey;font-size:14px";

owner.appendChild(button);

button.addEventListener("click",
  () => {
    video.currentTime = 0;
    video.play();
    let streamToCapture = video.mozCaptureStream();
    let recorder = new MediaRecorder(streamToCapture);
    let data = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();

    let recordedBlob = new Blob(data, { type: "video/webp" });
    let url = URL.createObjectURL(recordedBlob);

    let a = document.createElement('a');
    a.href = url;
    a.download = "RecordedVideo_1.webp";

    let b = document.createElement('button');
    b.style = "widht:100px;height:60px;color:white;font-size:14px";
    b.innerText = "SAVE_BUTTON_PRESS";

    a.appendChild(b);

    owner.appendChild(a);
  

          .then((recordedChunks) => {
      let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      recording.src = URL.createObjectURL(recordedBlob);

      downloadButton.href = recording.src;
      downloadButton.download = "RecordedVideo.webm";
    });



    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        preview.srcObject = stream;
        downloadButton.href = stream;
        preview.captureStream =
          preview.captureStream || preview.mozCaptureStream;
        return new Promise((resolve) => (preview.onplaying = resolve));
      })
      .then((stream) => {
        let recorder = new MediaRecorder(stream);
        let data = [];

        recorder.ondataavailable = (event) => data.push(event.data);
        recorder.start();

        let stopped = new Promise((resolve, reject) => {
          recorder.onstop = resolve;
          recorder.onerror = (event) => reject(event.name);
        });

        let recorded = wait(lengthInMS).then(() => {
          if (recorder.state === "recording") {
            recorder.stop();
          }
        });

        return Promise.all([stopped, recorded]).then(() => data);
      })
      .then((recordedChunks) => {
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        recording.src = URL.createObjectURL(recordedBlob);
        downloadButton.href = recording.src;
        downloadButton.download = "RecordedVideo.webm";

        console.log(
          `Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`,
        );
      })
      .catch((error) => {
        if (error.name === "NotFoundError") {
          log("Camera or microphone not found. Can't record.");
        } else {
          log(error);
        }
      });
  },
  false,
);