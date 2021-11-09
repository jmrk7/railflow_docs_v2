---
sidebar_position: 3
---

# NPM CLI 

## Release: 2.1
New Features
>
- Add support for Allure reports
- Parallel exporting of results
- Add new --max-concurrent parameter to set the max count of parallel exporting
- Automatic creation of configurations in TestRail

Bug Fixes
>
- Tests are exported to a wrong sub-section under some circumstances

## Release: 2.0
New Features
>
- Update dependency versions to get rid of various issues
- Node 11 or higher version is required

Bug Fixes
>
- "Field :results contains one or more invalid results (case C11507 unknown or not part of the test run)" error


## Release: 1.9
New Features
>
- Implement smart caching to reduce number of HTTP requests.
- Add "Smart Failure Assignment" feature

## Release: 1.8
New Features
>
- Add support for the new TestRail API bulk response JSON.
- Handle HTTP 429 "Too many requests" error returned from TestRail server and retry the request after some timeout

Bug Fixes
>
- Fix the bug in case type handling

## Release: 1.7
New Features
>
- Add possibility to map tests from report files into existing tests in TestRail
- Read license file from http(s)/ftp server

## Release: 1.6
New Features
>
- Adjust logging and write debug logs into file
- Write statistic info into the log file before and after exporting results
- Add new --case-type and --case-priority parameter, allow user to define case properties via the parameter

## Release: 1.5
New Features
>
- Add new --steps-field and --tr-step-results-field parameters
- Show full path to the report file in the error message in case of parsing error

## Release: 1.4
New Features
>
- Automatically identify and upload screenshots in NUnit and Cucumber test reports

Bug Fixes
>
- Fix the potential problem of using undefined object/variable for cases
- Error on close run attempt
- Fix the bug with failure on empty scenario name in Cucumber

## Release: 1.3
New Features
>
- Support for Cucumber reports
- Add new --tr-template-name parameter to set TestRail template name to be used
- Add new --timeout parameter for connecting with TestRail

## Release: 1.2
New Features
>
- Support for NUnit reports
- Refactor the code of parsing test reports
- Adjust parameter names, order and usage
- Allow users to set custom field labels in case-insensitive way

Bug Fixes
>
- Configuration names parameter is ignored

## Release: 1.1
New Features
>
- Support for TestNG reports
- Support for JUnit 5
- Show the query URL after uploading

Bug Fixes
>
- Fix slashes parsing in parameter description

## Release: 1.0
New Features
>
- Automatically parse test reports and export results into TestRail
- Automatically create tests, cases, sections, suites, milestones, test plans, and test runs
- Support for JUnit 4 reports
- All functions are implemented based on the NodeJS, independent of an OS