![Teleboard](.github/logo-light.png "Teleboard")

---

## 🚧 DISCLAIMER 🚧
This project is currently in early development and is currently not useable in any way, shape, or form. 

## Introducion

Teleboard is a next generation planning tool focused on productivity and usability for your team.

At its core, Teleboard offers an efficient way of creating, listing, and viewing your projects tasks. Inspired by other great planning tools, teleboard provides you with plenty of customization and extensibility, allowing it to fit your specific needs.

## Features
- Implements an easy to use task hierarchy (Boards > Lists > Tasks)
- Instant live syncing across multiple browsers
- User and account management on a per-board basis
- Self hosted for full control over your data and setup
- Support for theming and customized themes
- Extensible with plugins and an easy to use API
- Fully open source and licensed under [MIT](https://opensource.org/licenses/MIT)

## Installation

### Prerequisites
Teleboard is built using [node](https://nodejs.org/en/) which means you will need to install NodeJS version 9 or higher. Make sure you also install npm, the package manager for node (it usually comes bundled with node).

### Setup
First, obtain a copy of Teleboard by cloning it from this repo
```
git clone https://github.com/ExodiusStudios/teleboard.git
```

Once you have obtained a local copy from github, run the following commands to prepare your instance of Teleboard.
```
npm install -g yarn    # Install the yarn package manager
yarn install           # Install required dependencies
chmod +x ./teleboard   # Grant execute permission to the CLI
```

*Notice: If you decide to help contribute to Teleboard, this setup will get you development ready as well ;)*

### Using the CLI (Command Line Interface)

The CLI provides a useful array of commands allowing you to manage your Teleboard setup. In order to launch Teleboard, run the following command:

```
./teleboard start
```

Teleboard will be started in the background and can now be accessed on `http://localhost:8045`.


The CLI provides many more commands used to manage your Teleboard setup. The following snippet is directly generated from `./teleboard help`.

```
./teleboard <cmd> [options]

Commands:
  teleboard start    Launch the Teleboard server
  teleboard stop     Terminate the Teleboard server
  teleboard status   Show the current daemon status
  teleboard run      Start the Teleboard server in the foreground
  teleboard config   Display the Teleboard config
  teleboard compile  Build the teleboard client and server

Options:
  --version  Show version number
  --json     Print out all messages in JSON form
  --help     Show help
```

## Development setup
Before you can start contributing to Teleboard, make sure to follow the installation tutorial. 

### Run development setup
A development setup with hot reloading can be started with the following two commands (You may have to run them in separate terminals).

```
yarn dev:client
yarn dev:server
```

When working on the source code, the frontend and backend will automatically be reloaded as you save files.

### Building distribution files
Distributes files are built separately for the client and server

```
yarn build:client
yarn build:server

# Shortcut to run both commands at once
./teleboard compile
```

### Publishing contributions

TODO: Code of Conduct

## License

[MIT](LICENSE)

Copyright (c) 2020-present, Julian Mills
