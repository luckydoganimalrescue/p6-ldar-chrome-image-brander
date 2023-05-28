function handleUpload(file, buffer) {
  let formData = new FormData();
  let blob = new Blob([new Uint8Array(buffer)], {type: file.type});
  formData.append('file', blob, file.name);

  fetch('YOUR_AWS_API', {
    method: 'POST',
    body: formData
  }).then(response => response.json())
  .then(data => {
    console.log(data);
    // Here you could add code to update the UI or give the user feedback
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => handleUpload(file, event.target.result);
        reader.readAsArrayBuffer(file);
      };
      input.click();
    }
  });
});
