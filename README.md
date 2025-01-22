
<a href="https://www.typescriptlang.org/">
  <img
    src="https://raw.githubusercontent.com/typescript-package/core/refs/heads/main/ts-package-barcode-logo-512.png"
    width="20%"
    title="@typescript-package/callback"
  />
</a>

## typescript-package/callback

<!-- npm badge -->
[![npm version][typescript-package-npm-badge-svg]][typescript-package-npm-badge]
[![GitHub issues][typescript-package-badge-issues]][typescript-package-issues]
[![GitHub license][typescript-package-badge-license]][typescript-package-license]

**Version:** v0.0.1

A lightweight TypeScript library to manage various callback functions.

## Overview

- **Defining** the various type of callbacks from `@typedly/callback`.
- Optional default **payload merging**.
- Ability to **use the default types** from the `@typedly/context` for `context` and `@typedly/payload` for `payload`.

---

## Table of contents

- [Installation](#installation)
- [Api](#api)
- [Contributing](#contributing)
- [Code of Conduct](code-of-conduct)
- [Git](#git)
  - [Commit](#commit)
  - [Versioning](#versioning)
- [License](#license)

## Installation

```bash
npm install @typescript-package/callback --save-peer
```

## Api

```typescript
import {
   // Class.
   Callback
} from '@typescript-package/callback';
```

## Contributing

Your contributions are **valued**! If you'd like to contribute, please feel **free** to submit a pull request. Help is always appreciated.

## Code of Conduct

By participating in this project, you agree to follow **[Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)**.

## GIT

### Commit

Please follow the following commit message conventions:

- [AngularJS Git Commit Message Conventions][git-commit-angular]
- [Karma Git Commit Msg][git-commit-karma]
- [Conventional Commits][git-commit-conventional]

### Versioning

The package follows [Semantic Versioning 2.0.0][git-semver] for all releases. The versioning format is:

**Given a version number MAJOR.MINOR.PATCH, increment the:**

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards-compatible manner, and
- PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © typescript-package ([license][typescript-package-license])

<!-- This package: typescript-package  -->
  <!-- GitHub: badges -->
  [typescript-package-badge-issues]: https://img.shields.io/github/issues/typescript-package/callback
  [isscript-package-badge-forks]: https://img.shields.io/github/forks/typescript-package/callback
  [typescript-package-badge-stars]: https://img.shields.io/github/stars/typescript-package/callback
  [typescript-package-badge-license]: https://img.shields.io/github/license/typescript-package/callback
  <!-- GitHub: badges links -->
  [typescript-package-issues]: https://github.com/typescript-package/callback/issues
  [typescript-package-forks]: https://github.com/typescript-package/callback/network
  [typescript-package-license]: https://github.com/typescript-package/callback/blob/master/LICENSE
  [typescript-package-stars]: https://github.com/typescript-package/callback/stargazers
<!-- This package -->

<!-- Package: typescript-package -->
  <!-- npm -->
  [typescript-package-npm-badge-svg]: https://badge.fury.io/js/@typescript-package%2Fcallback.svg
  [typescript-package-npm-badge]: https://badge.fury.io/js/@typescript-package%2Fcallback

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/
