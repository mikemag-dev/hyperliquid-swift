import Foundation
import HyperliquidPackage

let dispatchGroup = DispatchGroup()
dispatchGroup.enter()

ExampleUsage.runExample {
    dispatchGroup.leave()
}

// Wait for all async tasks to finish
dispatchGroup.wait()

print("✅ Finished executing all JavaScript API calls.")
