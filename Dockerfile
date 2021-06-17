FROM node:14-alpine

WORKDIR /root

COPY package*.json ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

FROM node:14-alpine

ENV NODE_ENV production

COPY --from=0 /root/package*.json /root
COPY --from=0 /root/dist /root/dist

WORKDIR /root

RUN yarn --frozen-lockfile

CMD ["node", "dist/main"]
