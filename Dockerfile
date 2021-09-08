FROM node:14-alpine AS build

COPY --chown=node:node / /home/node/flake-app

WORKDIR /home/node/flake-app

ENV SERVICE_URL=

RUN yarn install --frozen-lockfile --ignore-optional
RUN yarn build && yarn seed
RUN yarn install    --production \ 
                    --ignore-optional \
                    --network-timeout 100000 \
                    --ignore-scripts \
                    --frozen-lockfile

FROM node:14-alpine AS slim

COPY /nginx.conf /etc/nginx/nginx.conf

RUN apk add nginx
RUN chown -R node /var/lib/nginx

COPY --from=build --chown=node:node /home/node/flake-app/node_modules /home/node/flake-app/node_modules
COPY --from=build --chown=node:node /home/node/flake-app/common /home/node/flake-app/common
COPY --from=build --chown=node:node /home/node/flake-app/package.json /home/node/flake-app/package.json
COPY --from=build --chown=node:node /home/node/flake-app/service /home/node/flake-app/service
COPY --from=build --chown=node:node /home/node/flake-app/frontend/bundle /home/node/flake-app/frontend/bundle

# USER node

EXPOSE 8080

WORKDIR /home/node/flake-app/service

CMD [ "sh", "-c", "nginx && node ./dist/service.js"]
