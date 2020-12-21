#!/bin/sh
day=$1

url=gs://logs_sink_hawaya/appengine.googleapis.com/request_log/2020/12/$1/

echo Downloading file from $url
destinationFolder=/home/motaz/code/mine/streams/Data

echo Saving files to $destinationFolder
gsutil -m cp -r $url $destinationFolder
