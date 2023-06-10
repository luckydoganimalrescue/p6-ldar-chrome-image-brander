document.getElementById('imageFile').addEventListener('click', function () {
  let selectedFile = document.getElementById('imagedFile').files[0];
  let fileReader = new FileReader();

  fileReader.onloadend = function () {
    let arrayBuffer = fileReader.result;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { buffer: arrayBuffer, fileName: selectedFile.name });
    });
  };
  fileReader.readAsArrayBuffer(selectedFile);
});

document.getElementById("uploadForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const file = document.getElementById("imageFile").files[0];
  const email = document.getElementById("email").value;
  console.log(JSON.stringify({ filename: file.name }));

  fetch("https://qdit2kpvm2.execute-api.us-east-1.amazonaws.com/presign", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filename: file.name })
  })
 .then(response => response.json())
  .then(data => {
    const url = data.url;
    fetch(url, {
      method: "PUT",
      body: file
    })
    .then(() => {
      fetch("https://qdit2kpvm2.execute-api.us-east-1.amazonaws.com/brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: file.name, email: email })
      });
    });
    })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
});
