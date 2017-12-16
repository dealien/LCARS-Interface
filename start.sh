#!/bin/bash

help="Usage: `basename $0` <command> -- manage the LCARS Database server

    `basename $0` start         starts the server
    `basename $0` stop          stops the server
    `basename $0` info          shows info about running forever processes
        
    `basename $0` (-h|--help)   displays this help text"

if [ $1 -eq "start"]; then
    if [ ! -d logs/ ]; then
        mkdir logs/
    fi

    # Ensure that "server.log", "error.log", and "forever.log" have matching version numbers
    if [ -f logs/server.log ] || [ -f logs/forever.log ]; then
        let "n=2"
        while [ -f logs/server${n}.log ]; do
            let "sn=sn++"
        done
        while [ -f logs/error${n}.log ]; do
            let "sn=sn++"
        done
        while [ -f logs/forever${n}.log ]; do
            let "sn=sn++"
        done
    fi

    echo Logging to:\nlogs/server${n}.log\nlogs/error${n}.log\nlogs/forever${n}.log

    forever start -l 'logs/forever${n}.log -e logs/error${n}.log -o logs/server${n}.log server.js'

elif [ $1 -eq "stop" ]; then
    echo Stopping server...

    forever stop server.js

    echo Server stopped

elif [ $1 -eq "info" ]; then
    forever list

elif [ $1 -eq "-h" ] || [ $1 -eq "--help"]; then
    echo "$help"
    exit 0

else
    echo "$help"
    exit 0
fi