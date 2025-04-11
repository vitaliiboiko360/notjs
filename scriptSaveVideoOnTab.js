let divElement = document.createElement('div');
document.body.append(divElement);
divElement.style.position = 'absolute';
divElement.style.top = 0;
divElement.style.left = 0;
divElement.style.height = '100px';
divElement.style.width = '200px';
divElement.style.backgroundColor = 'grey';
divElement.style.zIndex = '100';

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

document.body.append(divElement);

var recorder;
var data = [];

const onClick = async () => {
  console.log('before capture stream');
  let captureScreenStream = await navigator.mediaDevices.getDisplayMedia({
    preferCurrentTab: true,
    // video: true,
    // audio: false,
    // {
    //   autoGainControl: false,
    //   echoCancellation: false,
    //   noiseSuppression: false,
    // },
    //systemAudio: 'include',
  });

  console.log(`before getVideoTracks`);
  const [track] = captureScreenStream.getVideoTracks();
  console.log(`before getElementsByTagName`);
  const captureTarget = document.querySelector('#result');
  captureTarget.style.isolation = 'isolate'; /* Forms a stacking context. */
  captureTarget.style.transformStyle = 'flat';
  console.log('after getElementsByTagName');

  console.log(`restriction target element ${captureTarget}`);

  const restrictionTarget = await RestrictionTarget.fromElement(captureTarget);
  console.log('restrictTo');
  console.log(track);
  await track.restrictTo(restrictionTarget);
  console.log(`after track is restricted`);
  recorder = new MediaRecorder(captureScreenStream);
  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();
};
buttonInitRecorder.addEventListener('click', onClick);

const onClick2 = () => {
  recorder.stop();
  console.log(`save button`);
  let recordedBlob = new Blob(data, { type: 'video/webm' });
  let url = URL.createObjectURL(recordedBlob);
  let a = document.createElement('a');
  a.textContent = 'link';
  a.href = url;
  a.download = `RecordedVideo_${Date.now()}.webm`;
  divElement.append(a);
  a.click();
};
buttonSaveVideo.addEventListener('click', onClick2);
