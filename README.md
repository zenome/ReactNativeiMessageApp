# ReactNativeiMessageApp
React Native enabled Xcode template for iMessage App using BundleBus
<img src="https://github.com/zenome/ReactNativeiMessageApp/blob/master/screenshot/iMessage_with_BundleBus.png" alt="iMessageApp with Bundlebus" width="400" />

ReactNativeiMessageApp is a Xcode template project for iMessage Application which has enabled the React Native and BundleBus.

# How to
1. Run [BundleBus_backend](https://github.com/zenome/BundleBus_backend).
2. Download repository and install npm modules.
~~~~
$> cd ReactNativeiMessageApp
$> npm install
~~~~
3. Open the Xcode project
4. Modify appkey and moduleName in MessagesViewController.m
```objectivec
    NSString *appKey = @"YOUR_BUNDLEBUS_APP_KEY";
    BundleBus *bundlebus = [[BundleBus alloc] init];
    [bundlebus silentUpdate:appKey];
```
```objectivec
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"YOUR_REACTNATIVE_APP_NAME"
                                                 initialProperties:nil
                                                     launchOptions:nil];

```
5. Build
