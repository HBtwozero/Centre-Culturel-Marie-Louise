// Modules to control application life and create native browser window
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    return;
}

const server = require('./server');

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')


// const electron = require('electron')

// // Enable live reload for Electron too
// require('electron-reload')(__dirname, {
//     // Note that the path to electron may vary according to the main file
//     electron: require(`${__dirname}/node_modules/electron`)
// });


let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.maximize();
    mainWindow.show();

    mainWindow.loadURL(
            `file://${path.join(__dirname, 'index.html')}`
        )
        // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = null
    })


}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})



ipcMain.on('app-quit', (evt, arg) => {
    app.quit()
})


ipcMain.on('app-reload', (event, arg) => {
    mainWindow.reload();
});