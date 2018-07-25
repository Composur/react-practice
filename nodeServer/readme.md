+---public
|   +---images
|   +---javascripts
|   \---stylesheets
|           style.css
|
+---routes
|       index.js
|       users.js
|
\---views
        error.jade
        index.jade
        layout.jade


### API设计

```
- status: 状态值，正常情况下只有 0(失败) 和 1(成功) 两种状态，可能会有别的情况
- data: 状态为成功时，返回数据挂载的对象
- type: 状态为失败时，返回的错误类型
- message: 状态为失败时，返回的错误信息
```