const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let remDupelines = vscode.commands.registerCommand('listtools.removeDuplicateLines', function () {
		vscode.window.showInformationMessage('Removing duplicate lines');
		let op = vscode.commands.executeCommand("editor.action.removeDuplicateLines");
		console.log(op.then())
	});
	context.subscriptions.push(remDupelines);

	let sortLinesAsc = vscode.commands.registerCommand('listtools.sortLinesAscending', function () {
		vscode.window.showInformationMessage('Sorting lines ascending',);
		vscode.commands.executeCommand("editor.action.sortLinesAscending");
	});
	context.subscriptions.push(sortLinesAsc);

	let sortLinesDesc = vscode.commands.registerCommand('listtools.sortLinesDescending', function () {
		vscode.window.showInformationMessage('Sorting lines descending',);
		vscode.commands.executeCommand("editor.action.sortLinesDescending");
	});
	context.subscriptions.push(sortLinesDesc);

	let findDupeLines = vscode.commands.registerCommand('listtools.findDuplicateLines', function () {
		vscode.window.showInformationMessage('Finding duplicate lines',);
		//TODO: Find duplicate lines
	});
	context.subscriptions.push(findDupeLines);

	let findUniqueLines = vscode.commands.registerCommand('listtools.findUniqueLines', function () {
		vscode.window.showInformationMessage('Finding unique lines',);
		//TODO: Find unique lines
	});
	context.subscriptions.push(findUniqueLines);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
