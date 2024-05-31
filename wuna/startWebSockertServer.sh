#!/usr/bin/bash
tsc
for file in ./out/*.js; do
    mv "$file" "./out/$(basename "$file" .js).mjs"
done
node ./out/WebSocketServer.mjs