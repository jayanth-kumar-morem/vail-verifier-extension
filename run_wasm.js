import * as wasmBindings from './vail_verifier_extension.js';

const wasm = {
  loadWasm: async function() {
    const buffer = await this.fetchingWasm(
      "./vail_verifier_extension_bg.wasm"
    );
    console.log({buffer})
    const module = await this.compileWASM(buffer);
    console.log(module)
    const instance = await this.instantiateWASM(module);
    console.log({instance});
  },
  fetchingWasm: async function (path) {
    const response = await fetch(path);
    return await response.arrayBuffer();
  },
  compileWASM: async function (buffer) {
      return await WebAssembly.compile(buffer);
  },
  instantiateWASM: async function(module){
    return await WebAssembly.instantiate(module, {wasmBindings});
    // return await WebAssembly.instantiate(module);
  }
};
globalThis.wasm = wasm;


const runtime = chrome.runtime || browser.runtime;

async function run() {
  await wasm_bindgen(runtime.getURL('vail_verifier_extension_bg.wasm'));
}

export { run };
