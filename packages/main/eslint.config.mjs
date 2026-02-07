// @ts-check

import { eslintBaseConfig } from '@swiftpost/config/eslintBaseConfig.mjs';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...eslintBaseConfig,
];

export default eslintConfig;
