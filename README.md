## antd design with next js

## npm install antd --save , npm install @ant-design/nextjs-registry --save

## Supports custom themes

// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
token: {
fontSize: 16,
colorPrimary: '#52c41a',
},
};

export default theme;

## antd component make genericComponent for reuseabolity

## use 3rd party phone component with it
