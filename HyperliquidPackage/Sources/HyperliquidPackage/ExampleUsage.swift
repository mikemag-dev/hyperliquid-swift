import Foundation

public struct ExampleUsage {
    public static func runExample(completion: @escaping () -> Void) {
        let hl = Hyperliquid()
        let dispatchGroup = DispatchGroup()

        // Fetch all market IDs
        dispatchGroup.enter()
        print("🔍 Fetching all market IDs...")
        hl.getAllMids { result in
            print("✅ All Market IDs:", result ?? "nil")
            dispatchGroup.leave()
        }

        // Fetch market info for BTC
        // dispatchGroup.enter()
        // hl.getMarketInfo(market: "BTC") { result in
        //     print("✅ BTC Market Info:", result ?? "nil")
        //     dispatchGroup.leave()
        // }

        // Wait for all async tasks to complete
        dispatchGroup.notify(queue: .main) {
            print("✅ All async JS calls completed.")
            completion()
        }
    }
}
