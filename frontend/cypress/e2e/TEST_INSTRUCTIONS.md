# 测试运行说明

## 启动后端服务

```bash
cd backend
cargo run
```

后端服务将在 http://localhost:8080 上运行。

## 启动前端服务

在另一个终端窗口中：

```bash
cd frontend
npm start
```

前端服务将在 http://localhost:3000 上运行。

## 运行E2E测试

确保后端和前端服务都在运行，然后在另一个终端窗口中：

```bash
cd frontend
npm run test:e2e
```

这将运行Cypress测试，验证用户CRUD操作的功能。
