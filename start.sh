#!/bin/bash

if [ ! -d logs/ ]; then
    mkdir logs/
fi

# Ensure that "server.log" and "forever.log" have matching version numbers
if [ -f logs/server.log ] || [ -f logs/forever.log ]; then
    let "n=2"
    while [ -f logs/server${n}.log ]; do
        let "sn=sn++"
    done
    while [ -f logs/forever${n}.log ]; do
        let "sn=sn++"
    done
fi

echo Logging to:\nlogs/server${n}.log\nlogs/forever${n}.log

forever start -l logs/forever${n}.log -o logs/server${n}.log server.js
