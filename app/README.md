## Source directories

**client** - The frontend vue application served by the backend. Written in TypeScript and vue, and uses Webpack as asset bundler.

**server** - The backend application in charge of running most Telescope logic. Written in TypeScript and uses gulp as build tool.

### Distribution files

Building Telescope results in distribution files being placed at `app/build`. These files should not be comitted and contain a combination of server and client files.