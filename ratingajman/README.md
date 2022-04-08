# floating-rating-package

Plugin made on React Native purely for Ajman App

## 🔧 Install

floating-rating-package is available on npm. It can be installed with the following command:

```
npm install floating-rating-package --save
```

floating-rating-package is available on yarn as well. It can be installed with the following command:

```
yarn add floating-rating-package
```

## Usage

```js
import {FloatingRating} from 'floating-rating-package';

export default function App() {
  return (
        <FloatingRating lang={"Enter Language Here [1 for Endlish, 2 for Arabic, 3 for Urdu]"} />
  );
}
```


## Dependencies 

Please make sure to install these before using the plugin 
```
    "@react-native-community/async-storage": "^1.12.1",
    "@react-native-community/checkbox": "^0.5.12",
    "@react-native-community/netinfo": "^6.0.0",
    "@react-navigation/native": "^6.0.6",
    "@react-navigation/native-stack": "^6.2.5",
    "@unsw-gsbme/react-native-keep-awake": "^1.0.5",
    "react-native-audio-recorder-player": "^3.1.1",
    "react-native-blob-util": "^0.13.17",
    "react-native-circular-progress": "^1.3.7",
    "react-native-device-info": "^8.4.8",
    "react-native-document-picker": "5.0.4",
    "react-native-fs": "^2.18.0",
    "react-native-image-picker": "^4.0.6",
    "react-native-mov-to-mp4": "^0.2.2",
    "react-native-pdf": "^6.4.0",
    "react-native-permissions": "^3.3.1",
    "react-native-safe-area-context": "^3.3.2",
    "react-native-screens": "^3.9.0",
    "react-native-star-rating": "^1.1.0",
    "react-native-vector-icons": "^9.0.0",
    "react-native-video": "^5.2.0",
    "react-redux": "^7.2.6",
    "redux": "^4.1.2",
    "redux-logger": "^3.0.6",
    "redux-persist": "^6.0.0",
    "redux-thunk": "^2.4.1"
```
## ❗ Issues

If you think any of the `floating-rating-package` can be improved, please do open a PR with any updates and submit any issues. Also, I will continue to improve this, so you might want to watch/star this repository to revisit.

<!-- ## 🌟 Contribution

We'd love to have your helping hand on contributions to `floating-rating-package` by forking and sending a pull request!

Your contributions are heartily ♡ welcome, recognized and appreciated. (✿◠‿◠)

How to contribute:

- Open pull request with improvements
- Discuss ideas in issues
- Spread the word
- Reach out with any feedback -->


## ✨ Integration


React-native-blob-util 


If react-native-blob-util exists then good, if react-native-blob exist delete it & install this one 

Add Kotlin dependency in appGradle 
```
ext {

kotlinVersion = '1.5.0'

}
```

Also include this 
```
dependencies {

classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion" //add this for rating plugin

}
```

If Android shows white screen, 
	1- delete node modules & re-install again
	2- do Gradlew clean and then run app


If audio doesn’t work in in iOS, we have to create a bridging header first. 
For more info: https://riptutorial.com/ios/example/32537/how-to-create-a-swift-bridging-header-manually

```
Props Lang for Floating Rating
1 = Eng
2 = Arabic
3 = Urdu
```
<!-- ## ⚖️ License -->

## ✨ Contributors

## Athar Zaib
### Ghazanfar Ali
### Rabee Javed 
### Osama Zulfiqar
### Special thanks to all contributors!


