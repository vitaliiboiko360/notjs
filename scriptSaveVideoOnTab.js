let divElement = document.createElement('div');
document.body.append(divElement);
divElement.style.position = 'absolute';
divElement.style.top = 0;
divElement.style.left = 0;
divElement.style.height = '100px';
divElement.style.width = '200px';
divElement.style.backgroundColor = 'grey';

let buttonSaveVideo = document.createElement('button');
buttonSaveVideo.textContent = 'SAVE';
buttonSaveVideo.style.width = '80px';
buttonSaveVideo.style.height = '60px';
buttonSaveVideo.style.color = 'balck';
buttonSaveVideo.style.fontSize = '14px';

let buttonInitRecorder = document.createElement('button');
buttonInitRecorder.textContent = 'Init Record';

divElement.append(buttonSaveVideo);
divElement.append(buttonInitRecorder);

var recorder;
var data = [];

const onClick = async () => {
  let captureScreenStream = await navigator.mediaDevices.getDisplayMedia({
    preferCurrentTab: true,
    video: true,
    audio: {
      autoGainControl: false,
      echoCancellation: false,
      noiseSuppression: false,
    },
    systemAudio: 'include',
  });

  const [track] = stream.getVideoTracks();
  const captureTarget = document
    .getElementById('46349191b07f499ea3d87f5e55dde27f')
    .getElementsByTagName('video')[0];

  console.log(`restriction target element ${captureTarget}`);
  const restrictionTarget = await RestrictionTarget.fromElement(captureTarget);
  await track.restrictTo(restrictionTarget);

  recorder = new MediaRecorder(captureScreenStream);
  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
};
buttonInitRecorder.addEventListener('click', onClick);
buttonSaveVideo.addEventListener('click', () => {
  recorder.stop();
  let recordedBlob = new Blob(data, { type: 'video/webm' });
  let url = URL.createObjectURL(recordedBlob);
  let a = document.createElement('a');
  a.href = url;
  a.download = `RecordedVideo_${Date.now()}.webm`;
  a.click();
});
