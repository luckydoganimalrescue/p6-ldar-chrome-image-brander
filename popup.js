document.getElementById('uploadButton').addEventListener('click', function() {
  let selectedFile = document.getElementById('selectedFile').files[0];
  let fileReader = new FileReader();

  fileReader.onloadend = function() {
    let arrayBuffer = fileReader.result;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {buffer: arrayBuffer, fileName: selectedFile.name});
    });
  };
  fileReader.readAsArrayBuffer(selectedFile);
});
