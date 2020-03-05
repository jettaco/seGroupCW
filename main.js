const electron = require('electron')
const { app, BrowserWindow, ipcMain } = require('electron')
var win;
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })


  win.loadFile('setup.html')
}

ipcMain.on("getPlayers", function(e, args){
  console.log("Received player details from startup")
  win.loadFile('game.html')
  win.webContents.on('did-finish-load', () => {
  win.webContents.send("sendPlayersInitGame", args)
});
})

app.whenReady().then(createWindow)
