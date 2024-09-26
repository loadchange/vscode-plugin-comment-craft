import * as vscode from "vscode";
import { COMMENT_PREFIXES } from "./constant";

type SupportedLanguage = "en" | "zh" | "ja" | "ko" | "zhHant" | "de";

let decorationTypes: { [key: string]: vscode.TextEditorDecorationType } = {};

export function activate(context: vscode.ExtensionContext) {
  console.log("Comment Prefixes extension is now active!");

  // 创建装饰类型
  COMMENT_PREFIXES.forEach((prefix) => {
    decorationTypes[prefix.prefix] = vscode.window.createTextEditorDecorationType({
      backgroundColor: prefix.color,
      color: "#FFFFFF", // 白色文字
      fontWeight: "bold",
    });
  });

  const provider = vscode.languages.registerCompletionItemProvider(
    { scheme: "file", language: "*" },
    {
      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.match(/\/\/\s*/)) {
          return undefined;
        }

        return createCompletionItems(linePrefix);
      },
    },
    " ",
    "/" // 触发字符
  );

  context.subscriptions.push(provider);

  // 监听文本变化事件
  vscode.workspace.onDidChangeTextDocument((event) => {
    if (event.contentChanges.length === 0) return;

    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const change = event.contentChanges[0];
    const position = editor.selection.active;
    const linePrefix = editor.document.lineAt(position.line).text.substr(0, position.character);

    // 检查是否刚刚插入了注释
    if (change.text === "/" && linePrefix.endsWith("//")) {
      vscode.commands.executeCommand("editor.action.triggerSuggest");
    }

    // 更新装饰
    if (event.document === editor.document) {
      updateDecorations(editor);
    }
  });

  // 添加编辑器变化监听器
  const changeEditorSubscription = vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      updateDecorations(editor);
    }
  });

  context.subscriptions.push(changeEditorSubscription);

  // 初始化当前编辑器的装饰
  if (vscode.window.activeTextEditor) {
    updateDecorations(vscode.window.activeTextEditor);
  }
}

function updateDecorations(editor: vscode.TextEditor) {
  const text = editor.document.getText();
  COMMENT_PREFIXES.forEach((prefix) => {
    const regex = new RegExp(`\\/\\/\\s*(${prefix.prefix}:)`, "gi");
    let match;
    const decorations: vscode.DecorationOptions[] = [];

    while ((match = regex.exec(text))) {
      const startPos = editor.document.positionAt(match.index + match[0].indexOf(prefix.prefix));
      const endPos = editor.document.positionAt(match.index + match[0].indexOf(prefix.prefix) + prefix.prefix.length + 1); // +1 to include the colon
      const decoration = { range: new vscode.Range(startPos, endPos) };
      decorations.push(decoration);
    }

    editor.setDecorations(decorationTypes[prefix.prefix], decorations);
  });
}

function getLanguage(): SupportedLanguage {
  const vscodeLanguage = vscode.env.language;

  if (vscodeLanguage.startsWith("zh-hant")) return "zhHant";
  if (vscodeLanguage.startsWith("zh")) return "zh";
  if (vscodeLanguage.startsWith("ja")) return "ja";
  if (vscodeLanguage.startsWith("ko")) return "ko";
  if (vscodeLanguage.startsWith("de")) return "de";

  return "en"; // 默认使用英语
}

function createCompletionItems(linePrefix: string): vscode.CompletionItem[] {
  const language = getLanguage();

  return COMMENT_PREFIXES.map((prefixObj) => {
    const description = prefixObj.description[language];
    const label = `${prefixObj.prefix} - ${description}`;

    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Keyword);
    
    // 检查是否需要在 "//" 后添加空格
    const needsSpace = !linePrefix.endsWith(" ");
    
    // 设置插入文本，根据需要添加空格
    item.insertText = needsSpace ? ` ${prefixObj.prefix}: ` : `${prefixObj.prefix}: `;

    // 设置过滤文本，使用户可以通过输入前缀来过滤
    item.filterText = prefixObj.prefix;

    return item;
  });
}

export function deactivate() {
  // 清理装饰类型
  Object.values(decorationTypes).forEach((decorationType) => decorationType.dispose());
}
