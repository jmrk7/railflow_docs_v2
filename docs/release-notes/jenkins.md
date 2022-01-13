---
sidebar_position: 1
---

# Jenkins Plugin

## Release: 2.2
New Features
>
- Add support for enhanced NUnit reports (https://github.com/railflow/nunit_example)
- Add new "Search Mode" parameter

Bug Fixes
>
- Confirmation label does not appear on successful license activation
- Fix incorrect logging messages
- Error: Custom case field: 'Steps' ('custom_steps_separated') is required in your TestRail project


## Release: 2.1
New Features
>
- Support for Allure Reports
- Use Jenkins proxy configuration
- Add handling of enriched TestNG and JUnit test reports
- Automatic creation of configurations in TestRail
- Add validation for the "Milestone path" field
- Adjust labels for report format dropdown


Bug Fixes
>
- Incorrect expiration date displayed for perpetual licenses
- Tests are exported to a wrong sub-section under some circumstances
- Cannot delete all TestRail server items from Global configuration page

## Release: 2.0
New Features
>
- Add log level configuration

Bug Fixes
>
- "Field :results contains one or more invalid results (case C11507 unknown or not part of the test run)" error

## Release: 1.9
New Features
>
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

## Release: 1.6
New Features
>
- Add "Case Type" and "Case Priority" configuration fields.

## Release: 1.5
New Features
>
- Automatically identify proper test case field for steps and test result field for step results
- Show full path to the report file in the error message in case of parsing error

## Release: 1.4
New Features
>
- Automatically identify and upload screenshots in NUnit and Cucumber test reports

Bug Fixes
>
- Error on close run attempt
- Fix the bug with failure on empty scenario name in Cucumber

## Release: 1.3
New Features
>
- Support for Cucumber reports
- Add new "Template" parameter to set TestRail template name to be used

## Release: 1.2
New Features
>
- Support for NUnit reports
- Allow user to set custom field label in insensitive way

Bug Fixes
>
- Configuration names parameter is ignored

## Release: 1.1
New Features
>
- Support for TestNG reports
- Support for JUnit 5
- Show the query URL after uploading

## Release: 1.0
New Features
>
- Automatically parse test reports and export them into TestRail
- Automatically create tests, cases, sections, suites, milestones, test plans, and test runs
- Support for JUnit 4 reports