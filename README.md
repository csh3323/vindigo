![Vindigo](.github/banner.png "Vindigo")

<p align="center">
  <a href="https://github.com/ExodiusStudios/vindigo/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/ExodiusStudios/vindigo"> 
  </a> 
</p>

---

## 🚧 **DISCLAIMER** 🚧
This project is currently in early development and is currently not useable in any way, shape or form. **Do not use in production!**

## Introducion

Vindigo is a next generation planning tool focused on productivity and usability for your team.

At its core, Vindigo offers an efficient way of creating, listing, and viewing your projects tasks. Inspired by other great planning tools, vindigo provides you with plenty of customization and extensibility, allowing it to fit your specific needs.

## Features
- Implements an easy to use task hierarchy (Boards - Lists - Tasks)
- Instant live syncing across multiple browsers
- User and account management on a per-board basis
- Self hosted for full control over your data and setup
- Support for theming and customized themes
- Extensible with plugins and an easy to use API
- Fully open source and licensed under [MIT](https://github.com/ExodiusStudios/vindigo/blob/master/LICENSE)

## Installation

### Prerequisites
Vindigo is built using [node](https://nodejs.org/en/) which means you will need to install NodeJS version 12 or higher. Make sure you also also have npm, the package manager for node (it usually comes bundled directly with node).

### Setup
First, obtain a copy of Vindigo by cloning it from this repo
```
git clone https://github.com/ExodiusStudios/vindigo.git
```

Once you have obtained a local copy from github, run the following commands to prepare your instance.
```
npm install -g yarn   # Install the yarn package manager
yarn install          # Install required dependencies
yarn build            # Build distribution files
```

You can now use the CLI to manage your Vindigo instance.

**Windows**
```
.\vindigo
```

**Unix based systems**
```
chmod +x ./vindigo    # Grant execute permission to the CLI
./vindigo
```

*Notice: If you decide to help contribute to Vindigo, this setup will get you development ready as well ;)*

### Using the CLI (Command Line Interface)

The CLI provides many useful commands allowing you to manage your Vindigo setup. In order to launch Vindigo, run the following command.

```
./vindigo start
```

Vindigo will be started in the background and can now be accessed on `http://localhost:8045`.

The CLI provides many more commands used to manage your Vindigo setup. The following snippet is directly generated from `./vindigo help`.

```
./vindigo <cmd> [options]

Commands:
  vindigo start    Launch the Vindigo server
  vindigo stop     Terminate the Vindigo server
  vindigo status   Show the current daemon status
  vindigo config   Display the Vindigo config
  vindigo run      Start the Vindigo server in the foreground

Options:
  --version  Show version number
  --json     Print out all messages in JSON form
  --help     Show help
```

## Development setup
Before you can start contributing to Vindigo, make sure to follow the installation tutorial. 

### Run development setup
A development setup with hot reloading can be started with the following two commands (You may have to run them in separate terminals).

```
yarn serve:server
yarn serve:client
```

When working on the source code, the frontend and backend will automatically be reloaded as you save files.

### Building distribution files
Distributes files are built separately for the client and server

```
yarn build:client
yarn build:server

# Shortcut to run both commands at once
./vindigo compile
```

### Publishing contributions

TODO: Code of Conduct

## License

[MIT](LICENSE)

Copyright (c) 2020-present, Julian Mills
