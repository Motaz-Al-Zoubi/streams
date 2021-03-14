#!/bin/bash

# dump-tables-mysql.sh
# Descr: 
# Dump MySQL table and views schema into separate SQL files for a specified database
# when dump_tables_views is passed `1` which is the default value
# Dump MySQL routines into separate SQL files for a specified database 
# into a file called routines.sql on the specified destination folder
# when dump_routines is passed `1` which is the default value
# Usage: Run without args for usage info.
# Author: @Trutane
# Ref: http://stackoverflow.com/q/3669121/138325
# Notes:
#  * Script will prompt for password for db access.
#  * Output files are compressed and saved in the current working dir, unless DIR is
#    specified on command-line.

[ $# -lt 4 ] && echo "Usage: $(basename $0) <DB_HOST> <DB_USER> <DB_NAME> <DIR> [<dump_tables_views>] [<dump_routines>]" && exit 1

DB_host=$1
DB_user=$2
DB=$3
DIR=$4
dump_tables_views=$5
dump_routines=$6

[ -n "$dump_tables_views" ] || dump_tables_views=1
[ -n "$dump_routines" ] || dump_routines=1

# create desitnation folder if not exist
mkdir -p $DIR

echo -n "DB password: "
read -s DB_pass

if [[ $dump_tables_views == 1 ]]; then 
    echo
    echo "Dumping tables and views into separate SQL command files for database '$DB' into dir=$DIR along with their triggers"

    tbl_count=1
    for t in $(mysql -NBA -h $DB_host -u $DB_user -p$DB_pass -D $DB -e 'show tables') 
    do 
        echo "DUMPING TABLE: $DB.$t index $tbl_count"
        mysqldump -h $DB_host -u $DB_user -p$DB_pass --protocol=tcp --no-data --set-gtid-purged=OFF $DB $t > $DIR/$DB.$t.sql 
        tbl_count=$(( tbl_count + 1 ))
    done

    echo "$tbl_count tables and views dumped from database '$DB' into dir=$DIR"
fi

# dump stored procedure and functions into routines file
if [[ $dump_routines == 1 ]]; then 
    echo
    echo "Dumping stored procedure and functions into routines file for '$DB' into dir=$DIR"
    routinesFileName="routines.sql"
    routinesFilePath=$DIR/$routinesFileName

    if [[ ! -e $routinesFilePath ]]; then
        touch $routinesFilePath
    fi

    mysqldump --host=$DB_host --user=$DB_user --password=$DB_pass --protocol=tcp --default-character-set=utf8 --skip-triggers  --no-data  --no-create-db --no-tablespaces --no-create-info --routines --events --set-gtid-purged=OFF $DB > $routinesFilePath

fi
