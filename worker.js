// worker.js
// importScripts('./vail_verifier.bundle.js');

onmessage = function(e) {
    // This will be called when the main thread sends a message.
    // For simplicity, let's assume the message is an array of URLs to download.
    try {
        wasm_bindgen.download_files(e.data.batchid, e.data.urls).then(result => {
            // Send the result back to the main thread.
            postMessage(result);
        }).catch(error => {
            postMessage({ type: "error", message: error.toString() });
        });
    } catch (error) {
        postMessage({ type: "error", message: error.toString() });
    }
    
}
