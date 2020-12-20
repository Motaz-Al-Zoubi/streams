#!/bin/sh
gsutil -m cp -r \
  gs://logs_sink_hawaya/appengine.googleapis.com/request_log/2020/12/20/ \
  /home/motaz/code/mine/streams/Data
