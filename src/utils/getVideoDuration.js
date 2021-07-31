const getDuration = file => {
  const url = URL.createObjectURL(file);

  return new Promise(resolve => {
    const audio = document.createElement('audio');
    audio.muted = true;
    const source = document.createElement('source');
    source.src = url; // --> blob URL
    audio.preload = 'metadata';
    audio.appendChild(source);
    audio.onloadedmetadata = () => {
      resolve(audio.duration / 60);
    };
  });
};

export default getDuration;
