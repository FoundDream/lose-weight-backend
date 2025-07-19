# 减肥 App 后端服务

基于 Node.js + TypeScript + Express + PostgreSQL + Prisma 构建的减肥应用后端 API。

## 技术栈

- **运行环境**: Node.js 22
- **开发语言**: TypeScript
- **Web 框架**: Express.js
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **认证**: JWT
- **密码加密**: bcrypt
- **数据验证**: Zod

## 项目结构

```
lose-weight-backend/
├── src/
│   ├── controllers/         # 控制器层
│   │   └── authController.ts
│   ├── services/           # 业务逻辑层
│   │   └── authService.ts
│   ├── middleware/         # 中间件
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── routes/            # 路由定义
│   │   └── authRoutes.ts
│   ├── config/            # 配置文件
│   │   └── database.ts
│   ├── types/             # TypeScript类型定义
│   │   └── auth.ts
│   ├── utils/             # 工具函数
│   │   ├── jwt.ts
│   │   └── password.ts
│   ├── app.ts            # Express应用配置
│   └── server.ts         # 服务器启动文件
├── prisma/
│   └── schema.prisma     # 数据库模型定义
├── package.json
├── tsconfig.json
└── .env                  # 环境变量配置
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env` 并配置数据库连接：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/lose_weight_db"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=3000
NODE_ENV=development
```

### 3. 设置数据库

确保 PostgreSQL 已启动，然后运行：

```bash
# 生成Prisma客户端
npm run db:generate

# 推送数据库结构（开发环境）
npm run db:push

# 或者使用迁移（生产环境推荐）
npm run db:migrate
```

### 4. 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动。

## API 接口

### 健康检查

```
GET /health
```

### 用户认证

#### 注册用户

```
POST /api/auth/register

Request Body:
{
  "username": "your_username",
  "password": "your_password"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "your_username",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### 用户登录

```
POST /api/auth/login

Request Body:
{
  "username": "your_username",
  "password": "your_password"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "your_username",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### 获取用户信息

```
GET /api/auth/profile

Headers:
Authorization: Bearer your_jwt_token

Response:
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "your_username",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

## 开发脚本

```bash
npm run dev          # 启动开发服务器（热重载）
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run db:generate  # 生成Prisma客户端
npm run db:push      # 推送数据库结构
npm run db:migrate   # 运行数据库迁移
npm run db:studio    # 打开Prisma Studio
```

## 数据库模型

### User 表

| 字段       | 类型     | 描述         |
| ---------- | -------- | ------------ |
| id         | Int      | 主键，自增   |
| username   | String   | 用户名，唯一 |
| password   | String   | 密码哈希     |
| created_at | DateTime | 创建时间     |
| updated_at | DateTime | 更新时间     |

## 安全特性

- JWT Token 认证
- bcrypt 密码哈希加密（12 轮加盐）
- Zod 数据验证
- 错误处理中间件
- CORS 支持

## 后续扩展

项目架构已为后续功能扩展做好准备：

- 体重记录管理
- 饮食记录管理
- 运动记录管理
- 目标设定功能
- 数据统计分析
- 文件上传功能

每个新功能模块可以按照相同的分层架构添加对应的 controllers、services、routes 等文件。
