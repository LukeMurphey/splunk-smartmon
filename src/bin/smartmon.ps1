# Determine if this is a 32-bit or 64-bit OS
$arch = "win64"

if ($Env:PROCESSOR_ARCHITECTURE -eq "x86") {
    if ($Env:PROCESSOR_ARCHITEW6432) {
        $arch = "win32"
    }
}

# Create a reference to the smartctl command
$smartctl = $Env:SPLUNK_HOME + "\etc\apps\smartmon\bin\$arch\smartctl.exe"

# Get the list of drives
$drives = Invoke-Expression ("& '$smartctl' --scan")

# Break up the drives list into an array
$drives_list = $drives.Split("{\n}")

# Run smartctl on each disk
for($i=0; $i -lt $drives_list.Count; $i++){
    $disk = $drives_list[$i].Split("{ }")[0]
    Invoke-Expression ("& '$smartctl' -a $disk")
}
