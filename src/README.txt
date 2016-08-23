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

Q: How do I enable the use of a proxy server?

A: To use a proxy server, re-run the app setup page and enter the information for a proxy server.

----------------------------------------------------------------------------------------------

Q: Can I allow non-admin users to make and edit inputs?

A: Yes, just assign users the "edit_modinput_web_input" capability. You will likely want to give them the "list_inputs" capability too.



================================================
Known Issues
================================================

* FireFox does not recognize username and password authentication for proxy configurations. You will need to setup the browser directly with a custom proxy setting before running the input.

     

================================================
Change History
================================================

+---------+------------------------------------------------------------------------------------------------------------------+
| Version |  Changes                                                                                                         |
+---------+------------------------------------------------------------------------------------------------------------------+
| 0.5     | Initial release                                                                                                  |
|---------|------------------------------------------------------------------------------------------------------------------|
| 0.6     | Updated README                                                                                                   |
+---------+------------------------------------------------------------------------------------------------------------------+
