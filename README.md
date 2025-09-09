# Quote of the Day App

A simple mobile application built with React Native and Expo that displays random quotes from an API and allows users to share them.



---

## Features

* **Fetch Quotes**: Get a new random quote with the press of a button.
* **Display Quote**: Shows the quote's content and author.
* **Share Functionality**: Allows users to share the quote through other apps.

---

## Setup and Installation

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS version recommended)
* [Git](https://git-scm.com/)
* An Android/iOS emulator or a physical device with the [Expo Go](https://expo.dev/client) app installed.

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the application:**
    ```bash
    npx expo start
    ```

5.  Scan the QR code with the Expo Go app on your phone, or press `a` or `i` in the terminal to launch it in an Android or iOS emulator.

---

## Build Instructions

To build a standalone `.apk` file, you can use Expo Application Services (EAS).

1.  **Install the EAS CLI:**
    ```bash
    npm install -g eas-cli
    ```

2.  **Run the build command:**
    ```bash
    eas build --platform android --profile preview
    ```
