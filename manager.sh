#!/bin/bash

htext="Usage: `basename $0` <command> -- manage the LCARS Database server

    `basename $0` start         starts the server
    `basename $0` stop          stops the server
    `basename $0` info          shows info about running forever processes
        
    `basename $0` (-h|--help)   displays this help text"

echo Beginning of manager script
if [[ "$1" = "start" ]]; then
    if [[ ! -d logs/ ]]; then
        mkdir logs/
    fi

    # Set up logging and preserve old log files
    if [ -f $(pwd)/logs/server.log ]; then
        if [[ ! -d logs/old/ ]]; then
            mkdir logs/old/
        fi
        n=1
        if [ -f $(pwd)/logs/old/server${n}.log ]; then
            while [ -f $(pwd)/logs/old/server${n}.log ]; do
                let sn=$((n++))
            done

        fi
        mv $(pwd)/logs/server.log $(pwd)/logs/old/server${n}.log
    fi

    echo Logging to $(pwd)/logs/server.log
    echo "Starting server..."

    # forever start -l $(pwd)/logs/server.log -e $(pwd)/logs/error.log -o $(pwd)/logs/server.log server.js
    forever start -l $(pwd)/logs/server.log server.js

elif [[ "$1" = "stop" ]]; then
    echo Stopping server...

    forever stop server.js

    echo Server stopped

elif [[ "$1" = "info" ]]; then
    forever list

elif [[ "$1" = "-h" ]] || [[ "$1" = "--help" ]]; then
    echo "$htext"
    exit 0

else
    echo "$htext"
    exit 0
fi
