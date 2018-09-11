const { app, BrowserWindow } = require('electron')
const ioHook = require('iohook')

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 400,
		minWidth: 900,
		minHeight: 304,
		alwaysOnTop: false,
		icon: `${__dirname}/icon.ico`
	})
	mainWindow.setMenu(null)

	mainWindow.loadFile(`${__dirname}/pages/index.html`)

	// Start ioHook to get inputs
	ioHook.start()

	// Send info about the key pressed to renderer process
	ioHook.on('keydown', event => {
		mainWindow.webContents.send('keydown', { event })
	})
	ioHook.on('keyup', event => {
		mainWindow.webContents.send('keyup', { event })
	})

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

app.on('before-quit', () => {
	ioHook.unload();
	ioHook.stop();
})
