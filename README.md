# 全栈应用程序文档

## 项目概述

这是一个使用Rust后端和React TypeScript前端实现的全栈应用程序，提供用户对象的增删改查功能。该项目是作为面试场景下的题目实现的，严格按照要求实现了核心功能，并使用TODO注释标记了可扩展的部分。

## 项目结构

```
fullstack-demo/
├── backend/             # Rust后端
│   ├── src/
│   │   └── main.rs      # 主程序代码
│   ├── Cargo.toml       # Rust依赖配置
│   └── API.md           # API文档
├── frontend/            # React TypeScript前端
│   ├── src/
│   │   ├── components/  # UI组件
│   │   ├── interfaces/  # TypeScript接口
│   │   ├── services/    # API服务
│   │   ├── App.tsx      # 主应用组件
│   │   └── App.css      # 样式文件
│   ├── cypress/         # E2E测试
│   │   └── e2e/         # 测试用例
│   └── package.json     # 前端依赖配置
├── todo.md              # 项目任务清单
└── TEST_INSTRUCTIONS.md # 测试说明
```

## 技术栈

### 后端
- Rust
- Actix-web (Web框架)
- Serde (序列化/反序列化)
- UUID (唯一ID生成)

### 前端
- React
- TypeScript
- React Router
- Cypress (E2E测试)

## 功能特性

- 用户对象的增删改查操作
- RESTful API设计
- 响应式前端界面
- 端到端测试

## 可扩展部分

项目中使用TODO注释标记了可扩展的部分，包括：

### 后端
- 添加更多用户字段（角色、创建时间等）
- 添加电子邮件格式验证
- 添加分页支持
- 添加软删除选项
- 添加用户认证功能

### 前端
- 添加电子邮件格式验证
- 添加更多表单验证
- 添加删除确认功能
- 添加分页支持
- 添加更多页脚内容

## 安装与运行

请参考项目根目录下的`TEST_INSTRUCTIONS.md`文件获取详细的运行说明。
