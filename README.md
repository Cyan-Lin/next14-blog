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
- 新增文章功能
- 編輯文章功能(一般功能)
- 新增 logo
- 新增 Cusor
- 優化 markdown 樣式
- 首頁、about page 修改，contact 不需要，確認 admin 不會被看到
- markdown 其他像 table 格式等等補齊(已新增)
- next-auth 由 ^5.0.0-beta.15 降版至 ^4.24.7，原因為 beta 版在 call API 的時候拿不到 session 的問題導致無法直接驗證 user 的權限，網路資源找不到一個可用的解答。降版並修改後，已經可以正常使用
- 新增/編輯 category 功能已新增
- 排版參考: https://medium.com/
- blog 新排版
- 編輯文章的時候要驗證身分，使用 session，user 在登入 github 後，在 authOptions 的 callback 中設定，把 user 在 mongoDB 的資訊存入 session 中，在需要權限的 page(或是查詢 adminOnly 的 blog post)，以及建立/編輯 post 的時候，取出來使用，若沒有權限，則無法對 post 進行操作

# TODO:

- 圖片功能(非必要、非緊急)
- blog list 分 category 顯示的功能
- 編輯文章功能
  - img 最後再優化，上傳圖檔至雲端
- homePage、aboutPage 需補上
