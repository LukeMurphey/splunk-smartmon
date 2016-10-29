================================================
Overview
================================================

This app provides a mechanism to detect hard-drive failures before they occur. This app reads the data from the self-monitoring technology (also known as S.M.A.R.T. ) built into most drives in order to alert you when a drive appears to be failing.



================================================
Configuring Splunk
================================================

The app contains a series of scripts that will:

  1) Perform a S.M.A.R.T. self-test: this is recommended monthly
  2) Obtain S.M.A.R.T. data: this is recommended hourly
  
Several versions of the scripts are included:

  +-------------------------+------------------------------------------+------------------------------+--------------------+
  |         Script          |                 Purpose                  |         Environment          |       Notes        |
  +-------------------------+------------------------------------------+------------------------------+--------------------+
  | smartmon_results.cmd    | Obtain S.M.A.R.T. data and tests results | Windows                      | Enabled by default |
  | smartmon_results.ps1    | Obtain S.M.A.R.T. data and tests results | Windows (Powershell version) |                    |
  | smartmon_results.sh     | Obtain S.M.A.R.T. data and tests results | *nix                         |                    |
  | smartmon_short_test.cmd | Performs a short self-test               | Windows                      | Enabled by default |
  | smartmon_short_test.ps1 | Performs a short self-test               | Windows (Powershell version) |                    |
  | smartmon_short_test.sh  | Performs a short self-test               | *nix                         |                    |
  +-------------------------+------------------------------------------+------------------------------+--------------------+

smartctl binaries for Windows are included by default in order to make installation easier. For this reason, the CMD scripts are enabled by default.


Windows
________________________________________________
This app doesn't require Python and can be installed on a Universal Forwarder as well as a heavy forwarder. The input for performing hourly data gathering and monthly tests should work by default. No further changes should be necessary other than installing the app on a forwarder.

The app publishes views that will appear when the app is installed on a Search Head. It is recommended that you install the app on the Search Heads in order to monitor the Search Head disks and to use the analysis views.


Non-Windows
________________________________________________

Install smartctl
The binaries are not included for non-Windows platforms. You will need to first install smartctl for your platform. See smartmontools.org for more details. Note that native packages may be available for your platform. For example, apt-get can be used to install smartmontools on Ubuntu (e.g. "sudo apt-get install smartmontools"). Make sure smartctl is in the path so that Splunk can run it. smartctl will also need root access. Thus, make sure it runs with the proper permissions.

Enable collection scripts
The collection scripts are not enabled by default since the smartctl binaries are not included with by default for non-Windows platforms. You will need to edit the inputs in order enable them. This can be done in the Splunk Manager by enabling the "smartmon_results.sh" and/or "smartmon_short_test.sh" script accordingly. You can also deploy a local version of inputs.conf to enable them:

       [script://./bin/smartmon_results.sh]
       disabled = 0
       
       [script://./bin/smartmon_short_test.sh]
       disabled = 0

See http://lukemurphey.net/projects/splunk-smartmon/wiki/Installation.



================================================
Getting Support
================================================

Go to the following website if you need support:

     http://splunk-base.splunk.com/apps/3279/answers/

You can access the source-code and get technical details about the app at:

     https://github.com/LukeMurphey/splunk-smartmon



================================================
FAQ
================================================

Q: Does running smartctl cause a performance degradation?

A: Reading the smartctl values has no performance impact. There are scripts that will invoke a short test on a monthly basis. The short test only lasts a few minutes and most disks will give IO preference to the test. Thus, these too should have no performance impact.

----------------------------------------------------------------------------------------------

Q: I am seeing some error messages when smartctl runs; what do I do?

A: See https://www.smartmontools.org/wiki/FAQ for information on how to deal with the error.

     

================================================
Change History
================================================

+---------+------------------------------------------------------------------------------------------------------------------+
| Version |  Changes                                                                                                         |
+---------+------------------------------------------------------------------------------------------------------------------+
| 0.5     | Initial release                                                                                                  |
|---------|------------------------------------------------------------------------------------------------------------------|
| 0.6     | Updated README                                                                                                   |
|         | Added last observed time (useful to determine if hosts are reliably reporting data)                              |
|         | Added temperature monitoring to the disk details page                                                            |
|         | Fixing issue where attributes were sometimes listed as blank (due to parse issue)                                |
|         | Disk details page now includes panels in tabs                                                                    |
|         | Added rendering of self-test logs to disk details page                                                           |
|         | Added search to alert you to failing disks                                                                       |
|         | Changed the line-breaker to work with multiple versions of smartmontools                                         |
|         | Warning messages from smartctl are now parsed and displayed on the dashboards                                    |
|---------|------------------------------------------------------------------------------------------------------------------|
| 1.0     | Fix commented out but incorrect cron schedule                                                                    |
|         | Fixed incorrect regex on Disk Details dashboard that sometimes caused self test results to be parsed incorrectly |
|         | Added single value of disks with warnings                                                                        |
|         | Added filtering option for disks with warnings on the Disk Monitoring dashboard                                  |
+---------+------------------------------------------------------------------------------------------------------------------+
