#!/bin/bash

htext="Usage: `basename $0` <command> -- manage the LCARS Database server
    `basename $0` start         starts the server
    `basename $0` stop          stops the server
    `basename $0` info          shows info about running forever processes

    `basename $0` (-h|--help)   displays this help text"

if [[ "$1" = "start" ]]; then
    echo -e "\033[38;5;245mChecking for existing instances of the server...\033[0m"
    forever stop server.js
    if [ $? -eq 0 ]; then
        echo -e "\033[32mExisting instance found and stopped\033[0m"
    else
        echo No existing instance found
    fi
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
    echo -e "\033[38;5;245mLogging to $(pwd)/logs/server.log\033[0m"
    forever start -l $(pwd)/logs/server.log server.js
    if [ $? -eq 0 ]; then
        echo -e "\033[32mServer started\033[0m"
    else
        echo -e "\033[31mERROR: Failed to start server\033[0m"
    fi
elif [[ "$1" = "stop" ]]; then
    echo Stopping server...
    forever stop server.js
    if [ $? -eq 0 ]; then
        echo -e "\033[32mServer stopped\033[0m"
    else
        echo -e "\033[31mERROR: Failed to stop server\033[0m"
    fi
elif [[ "$1" = "info" ]]; then
    forever list
elif [[ "$1" = "-h" ]] || [[ "$1" = "--help" ]]; then
    echo "$htext"
    exit 0
else
    echo "$htext"
    exit 0
fi
