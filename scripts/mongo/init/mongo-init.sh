#!/bin/bash
set -e

mongosh <<EOF
use ${MONGO_INITDB_DATABASE}
db.createUser(
  {
    user: "${MONGO_USERNAME}",
    pwd: "${MONGO_PASSWORD}",
    roles: [{
      role: "readWrite",
      db: "${MONGO_INITDB_DATABASE}"
    }]
  }
)
EOF