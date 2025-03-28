# Movie Search App 🎬

A React Native mobile app for searching movies using the OMDb API, with favorites functionality.

## Screenshots

### Home View
![Home View](https://github.com/user-attachments/assets/3d0e00e4-bce2-451d-b5f1-f0d4036367c2)



### Details View
![Details View](https://github.com/user-attachments/assets/c7da1748-2b46-4f17-823e-8c0002f00510)


## Features ✨
- Search movies by title
- View detailed movie information
- Save favorites locally
- Load more results with pagination
- Cross-platform (iOS, Android, Web)

## Prerequisites 📋
- Node.js v16 or later
- Expo CLI (`npm install -g expo-cli`)
- Git
- OMDb API key ([Get free key](http://www.omdbapi.com/apikey.aspx))

## Setup Instructions 🛠️

### 1. Clone the Repository
```bash
git clone https://github.com/Darkboy17/movie-search.git
cd MovieSearchApp
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment

Create .env file in root directory and paste the api key received on your email here:
```env
EXPO_PUBLIC_OMDB_API_KEY=your_api_key_here 
```
### 4. Run the App

For Mobile Development:
```bash
npx expo start
```

### Then choose your preferred method:

    - Android Emulator: Press a

    - iOS Simulator (Mac only): Press i

    - Physical Device: Scan QR code with Expo Go app

### For Web Development:
```bash
npx expo start --web
```
Open your browser and visit http://localhost:8081

### Build for Production 🚀

*Note: Make sure you have installed Android SDK and setup the paths correctly before running the command below!*
### Android APK
```bash
npx expo run:android
```
### iOS App (Requires macOS)
```bash
npx expo run:ios
```

### Web Export
```bash
npx expo export
```

Serve the web-build/ folder using any static server.
