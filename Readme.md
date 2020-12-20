# Tool to handle streams

- To download `19-12-2020` folder:
```
gsutil cp -r \
  gs://logs_sink_hawaya/appengine.googleapis.com/request_log/2020/12/19/ \
  .
```

this command is going to download logs for `19 Dec` day and put them in folder called `19`

- To View the stats of this day run 
```
node index.js > aggregation.json
```
    