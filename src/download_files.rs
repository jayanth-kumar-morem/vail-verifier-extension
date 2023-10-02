use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, Response, console};
use js_sys::{Array, Date, Promise};
use std::collections::HashMap;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

async fn download_file(url: &str) -> Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");

    let request = Request::new_with_str_and_init(url, &opts)?;

    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;

    assert!(resp_value.is_instance_of::<Response>());
    let resp: Response = resp_value.dyn_into().unwrap();

    JsFuture::from(resp.blob()?).await
}

#[wasm_bindgen]
pub async fn download_files(batchid: &str, urls: Array) -> Result<JsValue, JsValue> {
    log("Starting file download process...");

    let datetime = Date::new_0().to_iso_string();
    let folder_name = format!("{}_{}", batchid, datetime);
    log(&format!("Files will be saved in folder: {}", folder_name));

    let mut file_map: HashMap<String, JsValue> = HashMap::new();

    for i in 0..urls.length() {
        let url: String = urls.get(i).as_string().unwrap();
        log(&format!("Downloading file from URL: {}", url));

        match download_file(&url).await {
            Ok(blob) => {
                log(&format!("Successfully downloaded file from URL: {}", url));
                file_map.insert(url, blob);
            },
            Err(e) => {
                log(&format!("Error downloading file from URL: {}. Error: {:?}", url, e));
            }
        }
    }

    // Here, you would typically save the files in the desired folder.
    // However, WebAssembly doesn't have direct access to the file system.
    // You would need to pass the blobs to JavaScript and use a library or API to save them.

    log("File download process completed.");

    Ok(JsValue::from_serde(&file_map).unwrap())
}
