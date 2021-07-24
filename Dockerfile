FROM node:14-alpine
WORKDIR /vindigo

# Install dependencies
COPY package.json .
COPY packages/vindigo-server/package.json packages/vindigo-server/
COPY packages/vindigo-client/package.json packages/vindigo-client/
COPY packages/vindigo-cli/package.json packages/vindigo-cli/
RUN yarn install

# Build the source
COPY . .
RUN yarn build

# Start the app platform
VOLUME ["/vindigo/data"]
ENTRYPOINT ["sh", "./bootstrap.sh"]
CMD ["node", "vindigo", "run"]