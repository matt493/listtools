const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let remDupelines = vscode.commands.registerCommand('listtools.findDistinctLines', async function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No active editor found');
			return;
		}

		const selectedText = editor.document.getText(editor.selection);
		if (!selectedText) {
			vscode.window.showInformationMessage('No lines selected');
			return;
		}

		const lines = selectedText.split(/\r?\n/).filter(line => line.trim() !== '');
		const distinctLines = Array.from(new Set(lines));

		if (distinctLines.length > 0) {
			distinctLines.unshift('Distinct Lines: lines with all duplicates removed');
			const document = await vscode.workspace.openTextDocument({ content: distinctLines.join('\n') });
    		vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
		} else {
			vscode.window.showInformationMessage('No distinct lines found');
		}
	});
	context.subscriptions.push(remDupelines);

	let sortLinesAsc = vscode.commands.registerCommand('listtools.sortLinesAscending', function () {
		vscode.commands.executeCommand("editor.action.sortLinesAscending");
	});
	context.subscriptions.push(sortLinesAsc);

	let sortLinesDesc = vscode.commands.registerCommand('listtools.sortLinesDescending', function () {
		vscode.commands.executeCommand("editor.action.sortLinesDescending");
	});
	context.subscriptions.push(sortLinesDesc);

	let findDupeLines = vscode.commands.registerCommand('listtools.findDuplicateLines', async function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No active editor found');
			return;
		}

		const selectedText = editor.document.getText(editor.selection);
		if (!selectedText) {
			vscode.window.showInformationMessage('No lines selected');
			return;
		}

		const lines = selectedText.split(/\r?\n/).filter(line => line.trim() !== '');

		const duplicateLines = Array.from(new Set(lines.filter((line, index) => lines.indexOf(line) !== index)));
		if (duplicateLines.length > 0) {
			duplicateLines.unshift('Duplicate Lines: lines with duplicates');
			const document = await vscode.workspace.openTextDocument({ content: duplicateLines.join('\n') });
    		vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
			
		} else {
			vscode.window.showInformationMessage('No duplicate lines found');
		}
	});
	context.subscriptions.push(findDupeLines);

	let findUniqueLines = vscode.commands.registerCommand('listtools.findUniqueLines', async function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No active editor found');
			return;
		}

		const selectedText = editor.document.getText(editor.selection);
		if (!selectedText) {
			vscode.window.showInformationMessage('No lines selected');
			return;
		}

		const lines = selectedText.split(/\r?\n/).filter(line => line.trim() !== '');
		const duplicateLines = lines.filter((line, index) => lines.indexOf(line) !== index);
		const uniqueLines = lines.filter(line => !duplicateLines.includes(line));
		if (uniqueLines.length > 0) {
			uniqueLines.unshift('Unique Lines: lines with no duplicates');
			const document = await vscode.workspace.openTextDocument({ content: uniqueLines.join('\n') });
    		vscode.window.showTextDocument(document, vscode.ViewColumn.Beside);
			
		} else {
			vscode.window.showInformationMessage('No unique lines found');
		}
	});
	context.subscriptions.push(findUniqueLines);

	let numberLines = vscode.commands.registerCommand('listtools.numberLines', async function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('No active editor found');
			return;
		}

		const selectedText = editor.document.getText(editor.selection);
		if (!selectedText) {
			vscode.window.showInformationMessage('No lines selected');
			return;
		}

		editor.edit((editBuilder) => {
			for (let i = editor.selection.start.line,lineNo = 1; i <= editor.selection.end.line; i++, lineNo++) {
				const line = editor.document.lineAt(i);
				editBuilder.insert(line.range.start, lineNo.toString() + ":\t");
			}
		});
	
	});
	context.subscriptions.push(numberLines);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
