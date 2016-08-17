@echo off

:: Determine if this is a 32-bit or 64-bit OS
Set ARCH=win64
IF %PROCESSOR_ARCHITECTURE% == x86 (
  IF NOT DEFINED PROCESSOR_ARCHITEW6432 Set ARCH=win32
  )

:: Get the list of disks
SET COMMAND_TO_RUN="%SPLUNK_HOME%\etc\apps\smartmon\bin\%ARCH%\smartctl.exe" --scan

:: Run smartctl on each disk
for /f "usebackq tokens=*" %%a in (`%COMMAND_TO_RUN%`) do (
	for /f "tokens=1 delims= " %%b in ("%%a") do (
		"%SPLUNK_HOME%\etc\apps\smartmon\bin\%ARCH%\smartctl.exe" -a %%b
	)
)
