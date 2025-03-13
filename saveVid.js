

function createDownloadButton(name, videoElement) {
  
  let capStrm = videoElement.captureStream();

  let recorder = new MediaRecorder(capStrm);
  let data = [];
  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();


  const a = document.createElement('a');
  a.textContent = 'LINK_TO_DOWNLOAD';
  a.addEventListener('click', ()=>{
    recorder.stop();
    let recordedBlob = new Blob(data, { type: "video/webm" });
    let url = URL.createObjectURL(recordedBlob);

    const ab = document.createElement('a');
    ab.href = url
    ab.download = name ?? 'downloadName';
    ab.click();
  });
  videoElement.parentElement.parentElement.append(a);
}

const video = document.getElementsByTagName('video')

createDownloadButton('nameOfTheFile.mp4', video[0])