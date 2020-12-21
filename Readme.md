# Tool to handle streams

- To download logs for `19-12-2020` just pass the day number to the download script:
```
./download.sh 19
```

This command is going to download logs for `19 Dec` day and put them in folder called `19` within `./Data` folder.

- To view the stats of this day run 
```
node index.js 19
```

where `19` is the name of the folder within `./Data` folder

- To view the stats of the whole data exist in `./Data` folder just run the script without any parameters
```
node index.js
```
    