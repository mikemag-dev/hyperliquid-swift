import Foundation
import JavaScriptCore

public class Hyperliquid {
    private var context: JSContext?

    public init() {
        context = JSContext()

        // Handle JavaScript exceptions
        context?.exceptionHandler = { _, exception in
            if let exc = exception {
                let message = exc.toString() ?? "No message"
                let stack = exc.objectForKeyedSubscript("stack")?.toString() ?? "No stack"
                print("🔥 JavaScript Exception: \(message)\nStack Trace:\n\(stack)")
            }
        }

        // Define global variables to avoid reference errors
        context?.evaluateScript("var self = globalThis; var window = globalThis; var global = globalThis;")

        // Load the JavaScript file
        if let jsPath = Bundle.module.path(forResource: "hyperliquid.min", ofType: "js") {
            do {
                let jsString = try String(contentsOfFile: jsPath, encoding: .utf8)
                context?.evaluateScript(jsString)
                print("[JS Debug] Successfully loaded hyperliquid.min.js")
            } catch {
                print("❌ Error loading JavaScript file: \(error)")
            }
        } else {
            print("❌ Could not find hyperliquid.min.js in module resources.")
        }
    }

    /// Calls an async JavaScript function and waits for a callback response
    public func callAPI(function: String, parameters: [Any] = [], completion: @escaping (Any?) -> Void) {
        let functionCheck = context?.evaluateScript("typeof setTimeout")
        print("🛠 setTimeout Type in JS:", functionCheck?.toString() ?? "undefined")

        print("🔍 Calling JS function: \(function) with parameters: \(parameters)")

        guard let jsFunction = context?.objectForKeyedSubscript(function) else {
            print("❌ JavaScript function \(function) not found")
            completion(nil)
            return
        }

        // Define a Swift closure to handle the callback from JavaScript
        let callback: @convention(block) (JSValue) -> Void = { result in
            print("✅ JS Callback Invoked with Result:", result.toObject() ?? "nil")
            completion(result.toObject())
        }

        // Convert the Swift closure into a JavaScript function
        let jsCallback = JSValue(object: callback, in: context)

        print("🔍 JS Callback Type in Swift:", jsCallback?.isObject ?? false)

        // Call the JavaScript function with parameters and callback
        jsFunction.call(withArguments: parameters + [jsCallback as Any])
    }


    /// Fetch all market IDs
    public func getAllMids(completion: @escaping (Any?) -> Void) {
        callAPI(function: "getAllMids", completion: completion)
    }
}
