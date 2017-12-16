#!/bin/bash

htext="Usage: `basename $0` <command> -- manage the LCARS Database server

    `basename $0` start         starts the server
    `basename $0` stop          stops the server
    `basename $0` info          shows info about running forever processes
        
    `basename $0` (-h|--help)   displays this help text"

if [[ "$1" = "start" ]]; then
    if [[ ! -d logs/ ]]; then
        mkdir logs/
    fi

    echo "Starting server..."

    forever start -l logs/forever.log -e logs/error.log -o logs/server.log server.js

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
