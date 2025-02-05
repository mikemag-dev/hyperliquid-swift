import { Hyperliquid } from "hyperliquid";
import { stringify } from "querystring";

// ✅ Initialize SDK

// ✅ Expose SDK globally
// (globalThis as any).sdk = sdk;

// ✅ Expose API Methods for Swift

// Get all mids
(globalThis as any).getAllMids = function (callback: (data: any) => void) {
    console.log("[JS Debug] Callback type:", typeof callback);

    if (typeof callback !== "function") {
        console.error("[JS Debug] Callback is not a function!");
        return;
    }


    const sdk = new Hyperliquid({
        privateKey: ""
    });
    // callback({ message: "Hello from JS!" });
    // callback({ typeOfSdk: typeof sdk });

    sdk.info.getAllMids(true)
        .then((info) => {
        console.log("[JS Debug] getAllMids Info:", info);
        callback(info); // ✅ This should trigger Swift callback
        })
        .catch((error) => {
        console.error("[JS Debug] Error in getAllMids:", error);
        callback({ error: error.toString() });
        });
};




  
async function main() {
    const sdk = new Hyperliquid({
        privateKey: ""
    });
    try {
      await sdk.connect();
      console.log("[JS Debug] SDK Connected!");
    } catch (error) {
      console.error("[JS Debug] Error in main:", error);
  }
}

// main();