#!/bin/sh
day=$1

url=gs://logs_sink_hawaya/appengine.googleapis.com/request_log/$1

echo Downloading file from $url
destinationFolder=./Data/$1

echo "Creating folder $destinationFolder if not exist"
mkdir -p $destinationFolder

echo Saving files to $destinationFolder
gsutil -m cp -r $url $destinationFolder
