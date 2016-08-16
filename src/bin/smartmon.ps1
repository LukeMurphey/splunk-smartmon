# Get the list of drives
$drives = .\win32\smartctl.exe --scan

# Break up the drives list into an array
$drives_list = $drives.Split("{\n}")

for($i=0; $i -lt $drives_list.Count; $i++){
    $disk = $drives_list[$i].Split("{ }")[0]
    .\win32\smartctl.exe -a $disk
}
