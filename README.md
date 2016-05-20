# splunk-smart

This app provides a mechanism for monitoring the host for hard-drive failures using S.M.A.R.T technology (via https://sourceforge.net/projects/smartmontools/).

A hard-drive will be flagged as having issues if any of the following shows issues (per https://www.backblaze.com/blog/hard-drive-smart-stats/):

* SMART 5 – Reallocated_Sector_Count. (1-4 warning, > 4 replace)
* SMART 187 – Reported_Uncorrectable_Errors. (> 1 replace)
* SMART 188 – Command_Timeout. (1-13 warning, > 13 replace)
* SMART 197 – Current_Pending_Sector_Count. (> 1 replace)
* SMART 198 – Offline_Uncorrectable. (> 1 replace)
