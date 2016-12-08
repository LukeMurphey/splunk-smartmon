#!/bin/sh

# Create a reference to the smartctl command
SMARTCTL="smartctl"

# Get the list of disks
DISKS=$($SMARTCTL --scan)
TEST="short"

# Set the IFS to split the output of smartctl by newlines
IFS='
'

# Run smartctl on each disk
for DISK in $DISKS
do
	# Get just the disk name (everything before the first space)
	DISK_CLEAN="$(echo "$DISK" | cut -d ' ' -f 1)"
	$SMARTCTL -t $TEST $DISK_CLEAN
done