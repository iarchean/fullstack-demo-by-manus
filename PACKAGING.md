# 全栈应用程序 - 打包说明

## 项目结构

项目已经按照要求完成，包含以下主要部分：

```
fullstack-demo/
├── backend/             # Rust后端
│   ├── src/main.rs      # 主程序代码（包含User CRUD API）
│   ├── Cargo.toml       # Rust依赖配置
│   └── API.md           # API文档
├── frontend/            # React TypeScript前端
│   ├── src/
│   │   ├── components/  # UI组件（UserList, UserCreate, UserEdit）
│   │   ├── interfaces/  # TypeScript接口（User定义）
│   │   ├── services/    # API服务（UserService）
│   │   ├── App.tsx      # 主应用组件（路由配置）
│   │   └── App.css      # 样式文件
│   ├── cypress/         # E2E测试
│   │   └── e2e/         # 测试用例
│   └── package.json     # 前端依赖配置
├── README.md            # 项目说明
└── TEST_INSTRUCTIONS.md # 测试运行说明
```

## 打包步骤

如需打包项目，可以按照以下步骤操作：

### 后端打包

```bash
cd backend
cargo build --release
```

编译后的可执行文件将位于 `target/release/` 目录中。

### 前端打包

```bash
cd frontend
npm run build
```

构建后的静态文件将位于 `build/` 目录中。

## 部署建议

1. 后端可以部署在支持Rust的服务器上
2. 前端静态文件可以部署在任何Web服务器上
3. 确保前端配置中的API URL指向正确的后端地址

## 注意事项

- 本项目是面试场景下的演示应用，实际生产环境需要添加更多安全措施
- 后端目前使用内存存储，生产环境应替换为数据库存储
- 所有可扩展部分已用TODO注释标记
