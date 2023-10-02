import * as wasmBindings from "./vail_verifier_extension.js";

const wasm = {
  loadWasm: async function () {

    const buffer = await this.fetchingWasm("./vail_verifier_extension_bg.wasm");
    console.log({ buffer });
    const module = await this.compileWASMManually(buffer);
    console.log({module});
    console.log({ wasmBindings });
    const instance = await this.instantiateWASM(module);
    console.log({ instance });

    // Say hello from .wasm file
    console.log("Hello from .wasm file ")
    console.log(instance.exports.sayHello("JKLM"))

  },
  fetchingWasm: async function (path) {
    const response = await fetch(path);
    return await response.arrayBuffer();
  },
  compileWASM: async function (buffer) {
    return await WebAssembly.compile(buffer);
  },
  compileWASMManually: async function (buffer) {
    if (!WebAssembly.validate(buffer)) {
      throw new WebAssembly.CompileError("Invalid Bytes");
    }
    const module = new WebAssembly.Module(buffer);
    console.log("Imports: ", WebAssembly.Module.imports(module));
    console.log("Exports: ", WebAssembly.Module.exports(module));
    console.log(
      "Custom Sections: ",
      WebAssembly.Module.customSections(module, "name")
    );
    return module;
  },
  instantiateWASM: async function (module) {
    // The following wasmBindings.* functions arent exported from the js file
    // Need wbg imports, need to figure out how to get them
    return await WebAssembly.instantiate(module, {
      // imports
      // wbg: {
      //   __wbindgen_object_drop_ref: function (arg0) {
      //     return wasmBindings.__wbindgen_object_drop_ref(arg0);
      //   },
      //   __wbindgen_cb_drop: function (arg0) {
      //     return wasmBindings.__wbindgen_cb_drop(arg0);
      //   },
      //   __wbindgen_string_new: function (arg0, arg1) {
      //     return wasmBindings.__wbindgen_string_new(arg0, arg1);
      //   },
      //   __wbindgen_is_undefined: function (arg0) {
      //     return wasmBindings.__wbindgen_is_undefined(arg0);
      //   },
      //   __wbindgen_object_clone_ref: function (arg0) {
      //     return wasmBindings.__wbindgen_object_clone_ref(arg0);
      //   },
      //   __wbindgen_is_undefined: function (arg0) {
      //     return wasmBindings.__wbindgen_is_undefined(arg0);
      //   },
      //   __wbindgen_debug_string: function (arg0, arg1) {
      //     return wasmBindings.__wbindgen_debug_string(arg0, arg1);
      //   },
      //   __wbindgen_throw: function (arg0, arg1) {
      //     return wasmBindings.__wbindgen_throw(arg0, arg1);
      //   },
      //   __wbindgen_closure_wrapper187: function (arg0, arg1, arg2) {
      //     return wasmBindings.__wbindgen_closure_wrapper187(arg0, arg1, arg2);
      //   },
      //   __wbg_instanceof_Window_9029196b662bc42a: function (arg0) {
      //     return wasmBindings.__wbg_instanceof_Window_9029196b662bc42a(arg0);
      //   },
      //   __wbg_fetch_336b6f0cb426b46e: function (arg0, arg1) {
      //     return wasmBindings.__wbg_fetch_336b6f0cb426b46e(arg0, arg1);
      //   },
      //   __wbg_set_b34caba58723c454: function (arg0, arg1, arg2, arg3, arg4) {
      //     return wasmBindings.__wbg_set_b34caba58723c454(
      //       arg0,
      //       arg1,
      //       arg2,
      //       arg3,
      //       arg4
      //     );
      //   },
      //   __wbg_instanceof_Response_fc4327dbfcdf5ced: function (arg0) {
      //     return wasmBindings.__wbg_instanceof_Response_fc4327dbfcdf5ced(arg0);
      //   },
      //   __wbg_json_2a46ed5b7c4d30d1: function (arg0) {
      //     return wasmBindings.__wbg_json_2a46ed5b7c4d30d1(arg0);
      //   },
      //   __wbg_headers_b439dcff02e808e5: function (arg0) {
      //     return wasmBindings.__wbg_headers_b439dcff02e808e5(arg0);
      //   },
      //   __wbg_newwithstrandinit_cad5cd6038c7ff5d: function (arg0, arg1, arg2) {
      //     return wasmBindings.__wbg_newwithstrandinit_cad5cd6038c7ff5d(
      //       arg0,
      //       arg1,
      //       arg2
      //     );
      //   },
      //   __wbg_newnoargs_581967eacc0e2604: function (arg0, arg1) {
      //     return wasmBindings.__wbg_newnoargs_581967eacc0e2604(arg0, arg1);
      //   },
      //   __wbg_call_cb65541d95d71282: function (arg0, arg1) {
      //     return wasmBindings.__wbg_call_cb65541d95d71282(arg0, arg1);
      //   },
      //   __wbg_new_b51585de1b234aff: function () {
      //     return wasmBindings.__wbg_new_b51585de1b234aff();
      //   },
      //   __wbg_self_1ff1d729e9aae938: function () {
      //     return wasmBindings.__wbg_self_1ff1d729e9aae938();
      //   },
      //   __wbg_window_5f4faef6c12b79ec: function () {
      //     return wasmBindings.__wbg_window_5f4faef6c12b79ec();
      //   },
      //   __wbg_globalThis_1d39714405582d3c: function () {
      //     return wasmBindings.__wbg_globalThis_1d39714405582d3c();
      //   },
      //   __wbg_global_651f05c6a0944d1c: function () {
      //     return wasmBindings.__wbg_global_651f05c6a0944d1c();
      //   },
      //   __wbg_resolve_53698b95aaf7fcf8: function (arg0) {
      //     return wasmBindings.__wbg_resolve_53698b95aaf7fcf8(arg0);
      //   },
      //   __wbg_then_f7e06ee3c11698eb: function (arg0, arg1) {
      //     return wasmBindings.__wbg_then_f7e06ee3c11698eb(arg0, arg1);
      //   },
      //   __wbg_then_b2267541e2a73865: function (arg0, arg1, arg2) {
      //     return wasmBindings.__wbg_then_b2267541e2a73865(arg0, arg1, arg2);
      //   },
      //   __wbg_set_092e06b0f9d71865: function (arg0, arg1, arg2) {
      //     return wasmBindings.__wbg_set_092e06b0f9d71865(arg0, arg1, arg2);
      //   },
      //   __wbg_call_01734de55d61e11d: function (arg0, arg1, arg2) {
      //     return wasmBindings.__wbg_call_01734de55d61e11d(arg0, arg1, arg2);
      //   },
      //   __wbg_new_43f1b47c28813cbd: function (arg0, arg1) {
      //     return wasmBindings.__wbg_new_43f1b47c28813cbd(arg0, arg1);
      //   },
      //   __wbg_resolve_53698b95aaf7fcf8: function (arg0) {
      //     return wasmBindings.__wbg_resolve_53698b95aaf7fcf8(arg0);
      //   },
      //   __wbg_then_f7e06ee3c11698eb: function (arg0, arg1) {
      //     return wasmBindings.__wbg_then_f7e06ee3c11698eb(arg0, arg1);
      //   },
      //   __wbg_then_b2267541e2a73865: function (arg0, arg1, arg2) {
      //     return wasmBindings.__wbg_then_b2267541e2a73865(arg0, arg1, arg2);
      //   },
      //   __wbg_set_092e06b0f9d71865: function (arg0, arg1, arg2) {
      //     return wasmBindings.__wbg_set_092e06b0f9d71865(arg0, arg1, arg2);
      //   },
      //   __wbindgen_debug_string: function (arg0, arg1) {
      //     return wasmBindings.__wbindgen_debug_string(arg0, arg1);
      //   },
      //   __wbindgen_throw: function (arg0, arg1) {
      //     return wasmBindings.__wbindgen_throw(arg0, arg1);
      //   },
      //   __wbindgen_closure_wrapper187: function (arg0, arg1, arg2) {
      //     return wasmBindings.__wbindgen_closure_wrapper187(arg0, arg1, arg2);
      //   },
      // },
    });
  },
};
globalThis.wasm = wasm;

const runtime = chrome.runtime || browser.runtime;

async function run() {
  await wasm_bindgen(runtime.getURL("vail_verifier_extension_bg.wasm"));
}

export { run };
