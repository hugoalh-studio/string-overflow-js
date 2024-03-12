# String Overflow (JavaScript)

[**⚖️** MIT](./LICENSE.md)

**🗂️**
[![GitHub: hugoalh-studio/string-overflow-js](https://img.shields.io/badge/hugoalh--studio/string--overflow--js-181717?logo=github&logoColor=ffffff&style=flat "GitHub: hugoalh-studio/string-overflow-js")](https://github.com/hugoalh-studio/string-overflow-js)
[![NPM: @hugoalh/string-overflow](https://img.shields.io/badge/@hugoalh/string--overflow-CB3837?logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/string-overflow")](https://www.npmjs.com/package/@hugoalh/string-overflow)

**🆙** ![Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/string-overflow-js?sort=semver&color=2187C0&label=&style=flat "Latest Release Version") (![Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/string-overflow-js?color=2187C0&label=&style=flat "Latest Release Date"))

A JavaScript module to truncate the string with the specify length; Safe with the emojis, URLs, and words.

## 🎯 Target

- Bun ^ v1.0.0
- Cloudflare Workers
- Deno >= v1.34.0
  > **🛡️ Require Permission**
  >
  > *N/A*
- NodeJS >= v20.9.0

### 🔗 Other Edition

- [TypeScript](https://github.com/hugoalh-studio/string-overflow-ts)

## 🔰 Usage

### Via Installation

> **🎯 Supported Target**
>
> - Cloudflare Workers
> - NodeJS

1. Install via console/shell/terminal:
    - Via NPM
      ```sh
      npm install @hugoalh/string-overflow[@<Tag>]
      ```
    - Via PNPM
      ```sh
      pnpm add @hugoalh/string-overflow[@<Tag>]
      ```
    - Via Yarn
      ```sh
      yarn add @hugoalh/string-overflow[@<Tag>]
      ```
2. Import at the script (`<ScriptName>.js`):
    ```js
    import ... from "@hugoalh/string-overflow";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `package.json`](./package.json) property `exports` for available sub paths.

### Via NPM Specifier

> **🎯 Supported Target**
>
> - Bun
> - Deno

1. Import at the script (`<ScriptName>.js`):
    ```js
    import ... from "npm:@hugoalh/string-overflow[@<Tag>]";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `package.json`](./package.json) property `exports` for available sub paths.

## 🧩 API

- ```ts
  class StringTruncator {
    constructor(maximumLength: number, options: StringTruncatorOptions = {}): StringTruncator;
    truncate(item: string, maximumLengthOverride?: number): string;
    static truncate(item: string, maximumLength: number, options: StringTruncatorOptions = {}): string;
  }
  ```
- ```ts
  function truncateString(item: string, maximumLength: number, options: StringTruncatorOptions = {}): string;
  ```
- ```ts
  enum StringTruncateEllipsisPosition {
    end = "end",
    End = "end",
    middle = "middle",
    Middle = "middle",
    start = "start",
    Start = "start"
  }
  ```
- ```ts
  interface StringTruncatorOptions extends StringDissectorOptions {
    /**
    * Ellipsis mark of the target string.
    * @default "..."
    */
    ellipsisMark?: string;
    /**
    * Ellipsis position at the target string.
    * @default "end"
    */
    ellipsisPosition?: StringTruncateEllipsisPosition | keyof typeof StringTruncateEllipsisPosition;
  }
  ```

## ✍️ Example

- ```js
  const text = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores sit. Duo iriure vel dolore illum diam. Ea vero diam diam tincidunt molestie elitr te sed nisl ut vulputate tincidunt accusam sit sed. Amet sea dolore rebum amet accusam labore dolor no sadipscing labore. Sit erat sit sed voluptua tempor sit ea dolor et.";

  /* Either */
  new StringTruncator(100).truncate(text);
  truncateString(text, 100);
  //=> "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores ..."

  /* Either */
  new StringTruncator(100, { safeWords: false }).truncate(text);
  truncateString(text, 100, { safeWords: false });
  //=> "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores si..."
  ```
