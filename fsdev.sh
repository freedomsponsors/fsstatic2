#!/bin/bash
RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
YELLOW='\e[0;33m'


# Cuz no one likes to be memorizing commands
# Instructions:
# 1) ". fsdev.sh"
# 2) "fshelp"
# 3) Be happy

export FS="$(dirname ${BASH_SOURCE[0]})"

#. ci/funcs.sh

function fshelp {
    echo -e "${GREEN}build${RESTORE}             Builds the entire front end into the ${RED}'dist'${RESTORE} folder"
    echo -e "                  Parameters:"
    echo -e "                  --mock <true|false> Use mock api (default: true)"
    echo -e ""
    echo -e "${GREEN}runserver${RESTORE}         Runs the development playground on port ${RED}9001${RESTORE}"
    echo -e ""
    echo -e "${GREEN}produce_alias${RESTORE}     Prints instructions on how to create a persistent shortcut"
    echo -e "                  for this development environment"
    echo -e ""
}

function build {
    CD=$(pwd)
    cd $FS
    dorun "gulp js $*" "fsstatic build"
    exitcode=$?
    cd $CD
    return $exitcode
}

function runserver {
    gulp runserver
}

function produce_alias {
    echo "The green command below will create an alias that you can use "
    echo "to drop into FS dev env from anywhere in your bash."
    echo "You might want to add it to your ~/.bashrc file"
    echo_green "alias fs='cd $(readlink -e $FS) && . fsdev.sh'"    
}

function runjshint {
    echo ""
    # CD=$(pwd)
    # cd $QM
    # dorun "jshint static/src/js/* estante-components/src/js/*" "JSHint"
    # exitcode=$?
    # cd $CD
    # return $exitcode
}


function echo_red {
    echo -e "\e[31m$1\e[0m";
}

function echo_green {
    echo -e "\e[32m$1\e[0m";
}

function echo_yellow {
    echo -e "${YELLOW}$1${RESTORE}";
}

function now_milis {
    date +%s%N | cut -b1-13
}

function dorun {
    cmd="$1"
    name="$2"
    echo ----------------------------------
    echo_green "STARTING $name ..."
    echo "$cmd"
    t1=$(now_milis)
    $cmd
    exitcode=$?
    t2=$(now_milis)
    delta_t=$(expr $t2 - $t1)
    if [ $exitcode == 0 ]
    then
        echo_green "FINISHED $name in $delta_t ms"
        echo ----------------------------------
    else
        echo_red "ERROR! $name (status: $exitcode, time: $delta_t ms)"
        echo ----------------------------------
        return $exitcode
    fi
}

echo_green "Welcome to the FS development environment. See available commands below:"
echo_green "Hint: autocomplete should be enabled for them ;)"
echo_red   "------------------------------------------------------------------------"
fshelp
