FROM node:14.15.4-slim

ENV NODE_ENV=production

EXPOSE 3000

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

WORKDIR /node

RUN mkdir app && chown -R node:node .

USER node

WORKDIR /node/app

COPY --chown=node:node package*.json .

RUN npm ci && npm cache clean --force

COPY --chown=node:node . .

ENTRYPOINT [ "/tini", "--" ]

CMD ["node", "src/app.js"]

