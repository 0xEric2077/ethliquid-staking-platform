# Ethliquid

Ethliquid 是一个基于 Next.js + React + Tailwind CSS + TypeScript 的 ETH 流动质押与 DeFi 前端平台。

## 项目简介

Ethliquid 为以太坊用户提供一站式质押（Staking）和 DeFi 服务，主打高收益、低费用和社区驱动的验证者分配策略。用户可将 ETH 质押获得 LSTETH，参与多种 DeFi 策略，提升资产收益。

## 主要功能
- ETH 质押与解押，获得 LSTETH
- LSTETH 在 DeFi 生态中的多种用例（流动性、再质押、借贷等）
- 实时收益、TVL、费用等数据展示
- FAQ、文档、账户管理等辅助功能

## 技术栈
- Next.js 13+（App Router）
- React 19
- TypeScript
- Tailwind CSS & tailwindcss-animate
- Framer Motion（动画）
- Lucide-react（图标）

## 目录结构
- `app/`         页面与布局（Next.js 13+ App Router）
- `components/`  复用型 UI 组件（layout、ui、icons 等）
- `public/`      静态资源（图片、SVG、字体等）
- `lib/`         工具函数（可扩展为 hooks、api 等）

## 快速开始

```bash
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)

## 部署

推荐使用 [Vercel](https://vercel.com/) 一键部署，或自托管：

```bash
npm run build
npm start
```

## 贡献
欢迎 issue、PR 及建议！

---

原始 Next.js 模板说明见下方。

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# ethliquid
