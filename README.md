# CityPop

CityPop is an Android and Ios application that was built with React-Native and the tool Expo. The user can through the app search for a country and get a list of its five most populated cities sorted after population. The user can even choose to search for a specific city and get its population. The application's code is intended to be a work sample for my job application at WeKnowIt.

## Installation

Run the following commands on your terminal

```bash
git clone https://gitlab.liu.se/nazel607/citypop.git
cd citypop
npm install
npm start
```

Then download the Expo app on your Ios or Android device and scan the QR code that is provided in the terminal (For Android you can do it directly from the app whereas on iPhone you should use your camera app). Make sure that both your computer and your device are connected to the same Wifi.

## Usage

To change the colors of the theme in the app you can go to app/config/colors.js

To change the design of the loading icon, head over to app/assets/animations/loader.json

When searching for a specific country, if the country is not found the first time, try again but with a different search word. For example, try United States instead of The United States of America. This is a weakness of the used API Geonames.

## Known issues

1. The first issue is the one mentioned above. One solution to this issue is to hardcode every possible name of each country. E.g, US, USA, The US, United States, United States of America, etc. Otherwise, use another API that provides the wanted results.
2. A known issue with the app is the keyboard pushing up the view in the SearchScreen. A solution is to add

```bash
android:windowSoftInputMode="adjustPan"
```

to the AndroidManifest.xml file. That would though require us to eject the Expo project to a bare one instead of a managed one. The problem is now reduced by putting the header high up in the screen so that it does not get covered by the search bar.

## Contributions

Under app/helperFunctions/countrycodes.js there is a function that was brought from [gist.github.com](https://gist.github.com/maephisto/9228207). Another contribution to this app is the loading animation which can be found here [Lottie](https://lottiefiles.com/78259-loading).

A special thanks to both contributors.
