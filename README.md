# ReactNativeiMessageApp
React Native enabled Xcode template for iMessage App using BundleBus
<br>
<img src="https://github.com/zenome/ReactNativeiMessageApp/blob/master/screenshot/iMessage_with_BundleBus.png" alt="iMessageApp with Bundlebus" width="200" />

ReactNativeiMessageApp is a Xcode template project for iMessage Application which has enabled the React Native and BundleBus.

# How to

### Download repository and install npm modules.
~~~~
> cd ReactNativeiMessageApp/rnMessage
> npm install
~~~~

### Run Server
* Run [BundleBus_backend](https://github.com/zenome/BundleBus_backend).


### Set backend server address
* I believe you already download and run [bundlebus-backend](https://github.com/zenome/BundleBus_backend).
* This command let you set your backend server address.

#### Command
* Run below command.
~~~~
> bundlebus server <http://youraddress:port>
~~~~

### Register ###
* `register` command will registers your react-native app to the server.

#### Command 
* Run below command from your react-native-app root folder where `package.json` reside.
~~~
> bundlebus register
Repository clone url : {Enter your github repository}
Repository - github token : {Enter your github token}
~~~
* Guthub token can be created from this [link.](https://help.github.com/articles/creating-an-access-token-for-command-line-use/)

### Release ###
* `release` command will pull your sources from the github and build it.

#### Command
* Run below command from your react-native-app root folder where `package.json` reside.
~~~
> bundlebus release <os>
~~~
where os should be `android` or `ios`.
* the BundleBus server will pull the git sources and build it.

### Deploy ###
* Once the app is ready to be published, use `deploy` command to simply do the job.

#### Command
* Run below command from your project root folder where `package.json` reside.
~~~~
> bundlebus deploy <os>
~~~~

### Run iOS App
* Open the Xcode project
* Modify appkey and moduleName in MessagesViewController.m
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
* Build
