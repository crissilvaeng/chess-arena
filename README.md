# chess-arena
Competition platform that enables the dispute between chess engines with Docker and UCI.

## Installation

### Dokku Plugins

```
sudo dokku plugin:install https://github.com/dokku/dokku-redis.git redis
sudo dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo
sudo dokku plugin:install https://github.com/dokku/dokku-nats.git nats
sudo dokku plugin:install https://github.com/dokku/dokku-rabbitmq.git rabbitmq
```
