// setupWorker.js
const worker = new Worker('worker.js');

worker.onmessage = function(e) {
    // This will be called when the worker sends a message.
    // For simplicity, let's assume the message is the result of the download_files function.
    if (e.data.type === "progress") {
        document.getElementById("downloadProgress").value = e.data.value;
    } else {
        console.log("Files downloaded:", e.data);
    }
}

function startWorker() {
    // Example data to send to the worker
    const data = {
        batchid: "sampleBatchId",
        urls: ["https://jkorpela.fi/fileurl.html", "https://jkorpela.fi/HTML3.2/3.5.html"]
    };

    worker.postMessage(data);
}


// Example of how to send a message to the worker:
// worker.postMessage({ batchid: "someBatchId", urls: ["url1", "url2"] });
