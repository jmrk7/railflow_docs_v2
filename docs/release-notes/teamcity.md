---
sidebar_position: 2
---

# TeamCity Plugin

## Release: 2.5
New Features
>
- Pytest reports: add support for custom test steps
- Robot reports: map robot tests into existing TestRail test cases by reading ID from "testrail.id" tag in robot report
- Set case title into the field defined by "Case Search Field" parameter on case creation
- Cucumber reports: Do not create separate steps for before/after hooks
- Cucumber reports: Add ability to map cucumber tests into existing test cases in TestRail by providing the ID in 'testrail.id' cucumber tag
- Robot reports: Add only fail and warn messages into step's 'Actual' field
- Allure reports: Add ability to map allure tests into existing test cases in TestRail by providing the ID in 'testrail.id' tag

Bug Fixes
>
- Robot reports: incorrect calculation of Elapsed time
- Pytest reports: failed tests in one class are always assigned to the first user from the list
- Cannot set value for custom multiselect field


## Release: 2.4
New Features
>
- Rename the plugin to host it on TeamCity marketplace

## Release: 2.3
New Features
>
- Add support for Robot native reports
- Add support for custom Railflow Pytest reports (https://docs.railflow.io/docs/testing-frameworks/pytest)
- Add support for SpecFlow NUnit reports
- Add support for customized xUnit reports (https://github.com/railflow/railflow-xunit-examples)
- Add support for custom MSTest (TRX) reports (https://github.com/railflow/railflow-mstest-examples)
- Add "Fully Qualified Test Name" parameter which allows exporting fully qualified test names into TestRail
- Add "Case Search Field" parameter which allows Railflow to search for existing tests cases by the value of some custom field
- Railflow searches for the existing tests in TestRail in case-insensitive way
- Add "Upload Mode" parameter which controls whether Railflow should create new tests and update existing tests in TestRail

Bug Fixes
>
- MSTest (TRX) reports: incorrect handling of Smart Failure Assignment from the report


## Release: 2.2
New Features
>
- Add support for enhanced NUnit reports (https://github.com/railflow/nunit_example)
- Add new "Search Mode" parameter

Bug Fixes
>
- Fix incorrect logging messages
- Error: Custom case field: 'Steps' ('custom_steps_separated') is required in your TestRail project


## Release: 2.1
New Features 
>
- Support for Allure Reports
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
- Show full path of the report file in the error message to know what exact file cannot be parsed

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