if [ ! -d logs/ ]; then
    mkdir logs/
fi
if [ -f logs/server.log ]; then
    let "n=2"
    while [ -f logs/server${n}.log ]; do
        let "n=n++"
    done
fi
echo Logging to logs/server${n}.log

forever start -o server${n}.log server.js
