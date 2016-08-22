@echo off

:: Determine if this is a 32-bit or 64-bit OS
Set ARCH=win64
IF %PROCESSOR_ARCHITECTURE% == x86 (
  IF NOT DEFINED PROCESSOR_ARCHITEW6432 Set ARCH=win32
  )

:: Create a reference to the smartctl command
SET SMARTCTL=%SPLUNK_HOME%\etc\apps\smartmon\bin\%ARCH%\smartctl.exe

:: Get the list of drives
SET COMMAND_TO_RUN="%SMARTCTL%" --scan

:: Run smartctl on each disk
for /f "usebackq tokens=*" %%a in (`%COMMAND_TO_RUN%`) do (
	for /f "tokens=1 delims= " %%b in ("%%a") do (
		"%SMARTCTL%" -a %%b
	)
)
