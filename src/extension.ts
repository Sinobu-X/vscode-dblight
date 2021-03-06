// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import DbTable from './db-table';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-dblight" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.dblightmodel', (clickedFile: vscode.Uri, selectedFiles: vscode.Uri[]) => {
		// The code you place here will be executed every time your command is executed

		// console.log(clickedFile);
		// console.log(selectedFiles);

		selectedFiles.forEach((filepath) => {
			var table = DbTable.load(filepath.path);
			// Display a message box to the user
			vscode.window.showInformationMessage(`Table ${table.category}.${table.code} loaded.`);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
