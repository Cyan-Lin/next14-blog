"use client";

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertImage,
  InsertSandpack,
  ListsToggle,
  MDXEditor,
  MDXEditorMethods,
  SandpackConfig,
  Separator,
  ShowSandpackInfo,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  sandpackPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { FC } from "react";

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      className="dark-theme dark-editor"
      ref={editorRef}
      markdown={markdown}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        // the default code block language to insert when the user clicks the "insert code block" button
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        // allows the user to change the code block language of the current selection
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", React: "JSX", css: "CSS" },
        }),
        imagePlugin({
          imageUploadHandler: () => {
            return Promise.resolve("https://picsum.photos/200/300");
          },
          imageAutocompleteSuggestions: [
            "https://picsum.photos/200/300",
            "https://picsum.photos/200",
          ],
        }),
        // the viewMode parameter lets you switch the editor to diff or source mode.
        // you can get the diffMarkdown from your backend and pass it here.
        diffSourcePlugin({
          diffMarkdown: "An older version",
          viewMode: "rich-text",
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <BlockTypeSelect />
              <CreateLink />
              <BoldItalicUnderlineToggles />
              <Separator />
              <CodeToggle />
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === "sandpack",
                    contents: () => <ShowSandpackInfo />,
                  },
                  {
                    fallback: () => (
                      <>
                        <InsertCodeBlock />
                        <InsertSandpack />
                      </>
                    ),
                  },
                ]}
              />
              <InsertImage />
              <ListsToggle options={["bullet", "number"]} />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
      onChange={console.log}
    />
  );
};

export default Editor;
