# Soulja Boy Speedrun Tool

This project is a desktop application built using Node.js and Electron. It is designed to automate the creation of the beat for 'Crank That' by Soulja Boy inside FL Studio. It is highly likely that unless you are willing to manually edit all the of mouse co-ordinates in the main.js file to correspond with your own FL Studio layout and screen resolution, it will not work as desired at all and will instead wreak untold havoc. Nonetheless in case anyone is mad enough to try, I am sharing the code. Below are instructions on how to set it up and run it.

---

## Features
- Displays real-time mouse coordinates which you can use to edit the code.
- Allows setting custom coordinates for cymbal sampler.
- Automates complex mouse and keyboard sequences with a single click.

---

## Prerequisites
Before using the application, ensure you have the following installed:

1. [Node.js](https://nodejs.org/)
2. [npm](https://www.npmjs.com/) (comes bundled with Node.js)

You can check if these are installed by running the following commands in your terminal:

```bash
node -v
npm -v
```

If the above commands return version numbers, you're good to go.

---

## Installation
1. Clone this repository or download the zip file and extract it:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install the dependencies by running:
   ```bash
   npm install
   ```

This will download and set up all the required packages.

---

## Running the Application
1. Start the application using the following command:
   ```bash
   npm start
   ```

2. A window should open displaying the application interface.

---

## How to Use

### Real-Time Mouse Coordinates
- Open the application to see the mouse coordinates updating in real-time. You can use the coordinates to update the code in main.js to work with your layout. Following this, ensure your FL Studio layout remains exactly the same so that no coordinates change - this includes which folders are open in the browser etc.

### FL Studio Prerequisites
1. Make sure "typing keyboard to piano keyboard" is disabled.
2. Make sure picker panel is enabled.
3. Make sure tempo is set to 140.
4. Make sure your ['Crank That' sample folder](https://drive.google.com/drive/u/0/folders/1dx0fPBhkKi5XwLYJwMD7tXUqeh-C3xyO) is open in the browser and 808 clav is selected.


### Setting Cymbal Sampler Coordinates
1. Click the **"Get Cymbal Sampler Coordinates"** button to run the sequence only up to the point of opening the cymbal sampler.
2. Retrieve the mouse coordinates for the reverse button and enter their values in the `X` and `Y` fields, then submit the form.
3. Undo everything in FL Studio to return to the starting point for the run.

### Starting the Automation Sequence
- Click the **"Start"** button to execute the pre-defined mouse and keyboard automation sequence.

---

## Troubleshooting

### Common Issues
1. **Electron not found error**:
   Run the following command to rebuild the Electron environment:
   ```bash
   npm run rebuilding
   ```

2. **Dependencies not installing properly**:
   Ensure your Node.js and npm versions are up-to-date:
   ```bash
   node -v
   npm -v
   ```

### Logging Issues
Check the terminal logs for additional error messages if the application doesn’t work as expected.

---

## Contributing
Feel free to submit issues or pull requests if you encounter bugs or want to contribute improvements.

---

