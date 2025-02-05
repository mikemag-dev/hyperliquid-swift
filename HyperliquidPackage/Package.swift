// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "HyperliquidPackage",
    platforms: [.iOS(.v13), .macOS(.v11)],
    products: [
        .library(
            name: "HyperliquidPackage",
            targets: ["HyperliquidPackage"]
        ),
    ],
    targets: [
        .target(
            name: "HyperliquidPackage",
            dependencies: [],
            resources: [
                .copy("hyperliquid.min.js") // ✅ Include JavaScript file
            ]
        ),
        .executableTarget(
            name: "HyperliquidExample",
            dependencies: ["HyperliquidPackage"],
            path: "Examples"
        ),
    ]
)
