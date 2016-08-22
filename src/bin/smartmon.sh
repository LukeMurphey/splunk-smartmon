#!/bin/sh

# Create a reference to the smartctl command
SMARTCTL="smartctl"

# Get the list of disks
#DISKS=`$SMARTCTL --scan`
DISKS=$($SMARTCTL --scan)

# Run smartctl on each disk
while read -r DISK; do
    eval $SMARTCTL -a $DISK
done <<< "$DISKS"