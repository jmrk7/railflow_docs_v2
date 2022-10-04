---
sidebar_position: 4
---

# ReadyAPI

## Release: 2.2
Bug Fixes
>
- Fix license activation for auto-generated trial licenses

## Release: 2.1
New Features
>
- Add license activation screen into the installer
- Add a new "TR_update_cases" property which tells testrunner and testengine to export test cases into TestRail instead of running it.

## Release: 2.0
New Features
>
- Add support for exporting Security test results
- Add support for exporting Load/Performance test results

Bug Fixes
>
- Error: Custom case field: 'Steps' ('custom_steps_separated') is required in your TestRail project

## Release: 1.9
Bug Fixes
>
- "Could not find test runner for test case ..." error

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
- Improve logging

## Release: 1.6
New Features
>
- Add properties for defining test case type and priority

## Release: 1.5
New Features
>
- Clear values of TR_id fields when test case is moved

## Release: 1.4
New Features
>
- Add ability to configure custom result fields

Bug Fixes
>
- Property expansion does not work for test case custom fields
- NullPointerException during exporting of testcases inside disabled suites

## Release: 1.3
New Features
>
- Add properties for defining test case template name

## Release: 1.2
New Features
>
- Add wizard for custom case fields configuration

## Release: 1.1
New Features
>
- Add export action for test suites and projects
- Show the run URL after uploading results

## Release: 1.0
New Features
>
- Initial release, add functionality for exporting test cases and results
