import { app, BrowserWindow } from 'electron'; // eslint-disable-line
import fs from 'fs';
import path from 'path';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

// Enable for production debugging
// require('electron-debug')({ enabled: true, showDevTools: 'right' }); // eslint-disable-line

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
	? 'http://localhost:9080'
	: `file://${__dirname}/index.html`;

function loadEnv() {
	const raw = fs.readFileSync(path.join(__dirname, '../../', '.env')).toString();
	const lines = raw.split('\n');

	for (let i = 0; i < lines.length; i += 1) {
		const vars = lines[i].split('=');

		process.env[vars[0]] = vars[1];
	}
}

function createWindow() {
	loadEnv();

	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		height: 800,
		useContentSize: true,
		width: 1200,
		resizable: false,
	});

	mainWindow.loadURL(winURL);

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
	autoUpdater.quitAndInstall()
})

app.on('ready', () => {
	if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
