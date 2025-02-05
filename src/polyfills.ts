// src/polyfills.ts

// ✅ Import `js-timers` (first attempt to polyfill setTimeout/setInterval)
import "js-timers";

// ✅ Import core polyfills for fetch, TextEncoder, and Buffer
import "whatwg-fetch";
import "fast-text-encoding";
import { Crypto } from "@peculiar/webcrypto";
import { Buffer } from "buffer";
import process from "process";

// Alias `globalThis` as `global`
const global = globalThis as any;

// ✅ Polyfill `crypto`
global.crypto = new Crypto();

// ✅ Polyfill `Buffer`
global.Buffer = Buffer;

// ✅ Polyfill `process`
global.process = process;

// ✅ Manually polyfill `setTimeout` if still undefined (JavaScriptCore Fix)
if (typeof global.setTimeout === "undefined") {
  console.warn("[JS Debug] Warning: setTimeout is missing. Applying manual polyfill...");
  global.setTimeout = function (fn: () => void, delay: number): number {
    const id = Math.floor(Math.random() * 1000000);
    Promise.resolve().then(() => setTimeout(fn, delay));
    return id;
  };
}

// ✅ Polyfill `clearTimeout`
if (typeof global.clearTimeout === "undefined") {
  global.clearTimeout = function (_id: number): void {};
}

// ✅ Polyfill `setInterval`
if (typeof global.setInterval === "undefined") {
  global.setInterval = function (fn: () => void, delay: number): number {
    const id = Math.floor(Math.random() * 1000000);
    function loop() {
      fn();
      setTimeout(loop, delay);
    }
    setTimeout(loop, delay);
    return id;
  };
}

// ✅ Polyfill `clearInterval`
if (typeof global.clearInterval === "undefined") {
  global.clearInterval = function (_id: number): void {};
}

// ✅ Log debugging info
console.log("[JS Debug] setTimeout Type:", typeof global.setTimeout);
console.log("[JS Debug] setInterval Type:", typeof global.setInterval);
console.log("[JS Debug] Polyfills successfully applied!");

// ✅ Type definitions for global objects
declare global {
  interface Window {
    setTimeout(callback: () => void, delay: number): number;
    clearTimeout(id: number): void;
    setInterval(callback: () => void, delay: number): number;
    clearInterval(id: number): void;
  }
}
