#!/usr/bin/bash
tsc
for file in ./out/*.js; do
    # 
    # example of expression
    # sed -i -E "s/(import.*PlayerWsConnection)/\1\.mjs/" WebSocketServer.mjs
    #fileName = eval $(basename $file .mjs)
    #echo "${fileName}"
    #if [ "${fileName}" = "WebSocketServer" ]; then
      # echo "$file"
      # echo "echo s\/(import.*PlayerWsConnection)\/\1\.mjs\/" "$file"
      echo ''
    #fi

    mv "$file" "./out/$(basename "$file" .js).mjs"
done
sed -i -E "s/(import.*PlayerWsConnection)[^\.]/\1\.mjs'/" ./out/WebSocketServer.mjs
node ./out/WebSocketServer.mjs