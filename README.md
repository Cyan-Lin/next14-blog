# DONE:

- 已處理 mdx editor 的 ul、ol 跑板問題
- 使用 markdown-to-jsx 套件，用來處理 markdown 傳換成 jsx
- 新增 customMarkdown、customJsxs component
- Post model 新增 content(文章內容)
- 修改文章內容的 style
- 增加 antd UI 框架
- 字體調整: font-family: var(--font-noto-sans-tc), var(--font-roboto), sans-serif;
- 編輯器新增最小高度與 padding + 預 loading UI
- 新增 blog modal 的 categories 屬性，array of strings，將文章分門別類
- 增加 antd custom css theme.ts(部分 css 還需要用 global 客製化)
- API route 新增 POST(新增文章 API)
- use client 的時後需要用到 env 變數，新增在 next.contfig

# TODO:

- 開始施工新增文章的功能(title、desc、content、slug、categories(額外一個 modal:title+desc)、createdAt、img 最後再優化，上傳圖檔至雲端)
- 編輯文章功能
