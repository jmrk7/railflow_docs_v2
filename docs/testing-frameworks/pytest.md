---
sidebar_position: 3
---

# Pytest

## Overview
:::info
Railflow Pytest plugin allows Pytest users to easily integrate their Pytest framework tests with TestRail using Railflow Pytest `markers`. This integration, allows users to `map` Pytest tests to tests, suites, plans, milestones, and runs in TestRail. You can also use these markers to automatically take and attach screenshot for failing tests. This is particularly useful for Selenium WebDriver and Appium tests.
:::

## How does Railflow Pytest Plugin work?
:::info
Pytest like all other test framework, produces a test results xml using `pytest --junitxml=path` argument. Railflow CI Plugins and CLI can process this results file and automatically parse and upload them into TestRail. For most users, this would be sufficient. For user that have a need to `map` Pytest tests to tests in TestRail or want to use automatic screenshots, they would need to use the Railflow Pytest plugin. 

Railflow Pytest plugin produces an enriched json report via `pytest --jsonfile results.json` argument. This report is then processed by Railflow CI Plugins and CLI in the same way and you end up with advanced mapping and configuration results in TestRail.
:::


## Requirements
- Python 2.7, 3.4 or greater
- Pytest

## Installation
[Railflow pytest plugin](https://pypi.org/project/pytest-railflow-testrail-reporter/) is available on pypi and easily installable using pip 

`pip install pytest-railflow-testrail-reporter`

## Railflow Plugin Usage
Railflow pytest plugin exposes the `@pytest.mark.railflow` marker at the class and function level. 

### Railflow configuration attributes description

Attribute Name | Description |
------------| -------------|
title| Name of the test suite or test case|
case_type| Case type in TestRail, <br/>`e.g.: Automated, Compatibility, etc...`|
case_priority| Case type in TestRail, <br/> `e.g.: Critical, High, etc...`|
case_fields| Values for custom case fields in TestRail,  <br/>` e.g.: ['field1=value1','field2=value2']`|
result_fields| Values for result fields in TestRail,  <br/>`e.g.: ['field1=value1','field2=value2']`|
jira_ids| Jira IDs.These values will be populated as a case field 'refs'. Should input as an array of strings,  <br/>`e.g.: ['jid1','jid2']`
testrail_ids| IDs of test cases in TestRail. Should input as an array of integers,  <br/>`e.g.: [1,2,3]`
smart_failure_assignment| Array of TestRail users to automatically assign failed test cases. Should input as a string array,  <br/>`e.g.: ['aaa@test.com','bbb@test.com']`

These attributes can be either used in class level or function level.

### Function Level Attributes
Pytest `function level attributes` are used to map pytest tests to existing tests in TestRail. Function level attributes override class level attributes.

  | Function level attributes |
  |-------------------------- |
  |  jira\_ids  |
  |  case\_fields  |
  |  result\_fields  |
  |  testrail\_ids  |
  |  case\_type   |
  |  case\_priority  |
  |  title  |
```jsx title="Pytest function level attributes" 

import pytest

@pytest.mark.railflow(
        title = "method title",
        jira_ids=["11111"],
        case_fields=[
          {
            "name": "Required text field",
            "value": "method"
          }
        ],
        result_fields=[
          {
            "name": "Custom field",
            "value": "Result from method"
          }
        ],
        case_type="Compatibility",
        case_priority="High"
)
def test_add():
a = 2 + 7
assert a == 9
```

### Class Level Attributes
Pytest `class level attributes` are applied to `all` the functions within the class. If a marked class also contains a marked function, the `function level marker takes precedence and will override the class level marker`.

  | Class level attributes |
  |-------------------------- |
  |  case\_fields  |
  |  result\_fields  |
  |  case\_type  |
  |  case\_priority  |
  |  smart\_failure\_assignment   |
  |  title  |
  ```jsx title="Pytest class level attributes"
  
@pytest.mark.railflow(
        jira_ids=["301219"],
        case_fields=[
          {
            "name": "Required text field",
            "value": "Class"
          }
        ],
        result_fields=[
          {
            "name": "Custom field",
            "value": "Result from class"
          }
        ],
        case_type="Automated",
        case_priority="Critical",
        smart_failure_assignment=["user1@gmail.com, user2@gmail.com"]
)
class TestClass:
    def test_add(self):
        a = 3
        b = 2
        c = a + b
        assert c == 5

    @pytest.mark.railflow(jira_ids=["301215"])
    def test_sub(self):
        a = 3
        b = 2
        c = a - b
        assert c == 1

```

### Adding arbitrary attachments into test report

The `testrail_add_screenshot` fixture can be used to add arbitrary attachments into the test report:

```shell
def test_add(testrail_add_screenshot):
    a = 3
    b = 2
    c = a + b
    assert c == 5
    testrail_add_screenshot("screenshot path")
```

### Selenium Automatic Screenshots

Railflow plugin supports [Pytest Splinter](https://github.com/pytest-dev/pytest-splinter) and if your selenium/appium tests uses pytest-splinter plugin, then Railflow plugin automatically takes screenshots of failed tests and upload them to TestRail (yes, really)

test_browser.py
```jsx title="Pytest splinter example"
import pytest

@pytest.mark.railflow(
        jira_ids=["301219"],
        case_fields=[
          {
            "name": "Required text field",
            "value": "Class"
          }
        ],
        result_fields=[
          {
            "name": "Custom field",
            "value": "Result from class"
          }
        ],
        case_type="Automated",
        case_priority="Critical",
        smart_failure_assignment=["user1@gmail.com, user2@gmail.com"]
)
def test_google(browser):
"""Test using real browser."""
url = "https://www.google.com"
browser.visit(url)
browser.fill('q', 'splinter - python acceptance testing for web applications')
# Find and click the 'search' button
button = browser.find_by_name('btnK')
# Interact with elements
  button.click()
assert browser.is_text_present('splinter.cobrateam.info'), "splinter.cobrateam.info wasn't found... We need to"
' improve our SEO techniques'
```
In the example above, the failing test will generate a screenshot and add the local path to the screenshot will be dumped in the json results file. Once the json results file is processed by Railflow CI Plugins or CLI, the pytest test results along with screenshots will be viewable in TestRail.

### Running Tests
Run your pytest tests normally with the jsonfile argument `--jsonfile test_results.json`. This argument will generate an enriched test results report containing details about the test run.

```shell
pytest --splinter-webdriver chrome --jsonfile test_results.json test_browser.py
```

### View Report

test_results.json
```shell
[
    {
        "class_name": null,
        "test_name": "test_google",
        "details": "Test using real browser.",
        "markers": "",
        "result": "FAILED",
        "duration": 8.737954783000077,
        "timestamp": "2022-03-06T10:51:51",
        "message": "browser = <splinter.driver.webdriver.chrome.WebDriver object at 0x7f55c6f50670>\n\n    @pytest.mark.railflow(\n         jira_ids=[\"301219\"],\n        case_fields=[\n            {\n                \"name\": \"Required text field\",\n                \"value\": \"Class\"\n            }\n        ],\n        result_fields=[\n            {\n                \"name\": \"Custom field\",\n                \"value\": \"Result from class\"\n            }\n        ],\n        case_type=\"Railflow\",\n        case_priority=\"Critical\",\n        smart_failure_assignment=[\"user1@gmail.com, user2@gmail.com\"]\n    )\n    def test_google(browser):\n        \"\"\"Test using real browser.\"\"\"\n        url = \"https://www.google.com\"\n        browser.visit(url)\n        browser.fill('q', 'splinter - python acceptance testing for web applications')\n        # Find and click the 'search' button\n        button = browser.find_by_name('btnK')\n        # Interact with elements\n        button.click()\n>       assert browser.is_text_present('splinter.cobrateam.info'), \"splinter.cobrateam.info wasn't found... We need to\"\nE       AssertionError: splinter.cobrateam.info wasn't found... We need to\nE       assert False\nE        +  where False = <bound method BaseWebDriver.is_text_present of <splinter.driver.webdriver.chrome.WebDriver object at 0x7f55c6f50670>>('splinter.cobrateam.info')\nE        +    where <bound method BaseWebDriver.is_text_present of <splinter.driver.webdriver.chrome.WebDriver object at 0x7f55c6f50670>> = <splinter.driver.webdriver.chrome.WebDriver object at 0x7f55c6f50670>.is_text_present\n\ntest_browser.py:30: AssertionError",
        "file_name": "test_browser",
        "attachments": [
            " /home/projects/pytest/example_tests/railflow_pytest_examples/railflow_pytest_examples.test_browser/test_google-browser.png"
        ],
        "railflow_test_attributes": {
            "jira_ids": [
                "301219"
            ],
            "case_fields": [
                {
                    "name": "Required text field",
                    "value": "Class"
                }
            ],
            "result_fields": [
                {
                    "name": "Custom field",
                    "value": "Result from class"
                }
            ],
            "case_type": "Railflow",
            "case_priority": "Critical",
            "smart_failure_assignment": [
                "user1@gmail.com, user2@gmail.com"
            ]
        }
    }
]
```


### Running Examples

1. Install 'pytest-railflow-testrail-reporter' .

```shell
$ pip install pytest-railflow-testrail-reporter
```

2. Add pytest test with Railfllow marker on class level.

test_calculation.py
```shell
import pytest

@pytest.mark.railflow(
     jira_ids=["301219"],
    case_fields=[
        {
            "name": "Required text field",
            "value": "Class"
        }
    ],
    result_fields=[
        {
            "name": "Custom field",
            "value": "Result from class"
        }
    ],
    case_type="Automated",
    case_priority="Critical",
    smart_failure_assignment=["user1@gmail.com, user2@gmail.com"]
)
class TestClass:

    def test_add(self):
        a = 3
        b = 2
        c = a + b
        assert c == 5

    def test_subtract(self):
        a = 3
        b = 2
        c = a - b
        assert c == 0

    @pytest.mark.railflow(
        title = "method title",
        jira_ids=["11111"],
        case_fields=[
            {
                "name": "Required text field",
                "value": "method"
            }
        ],
        result_fields=[
            {
                "name": "Custom field",
                "value": "Result from method"
            }
        ],
        case_type="Compatibility",
        case_priority="High",
        smart_failure_assignment=["user3@gmail.com"]
    )
    @pytest.mark.parametrize("a,b,c", [(22, 11, 2), (64, 8, 8), (9, 3, 3)])
    def test_divide(self, a, b, c):
        assert a / b == c  
```
3. Run tests and generate report

```shell
pytest --jsonfile output.json test_calculation.py
```

4. View report file

Report file generated at the same directory where the test executed.

output.json
```shell
[
    {
        "class_name": "TestClass",
        "markers": "",
        "file_name": "test_sample2",
        "attachments": [],
        "tests": [
            {
                "test_name": "test_add",
                "details": null,
                "markers": "",
                "result": "PASSED",
                "duration": 0.00012004900054307655,
                "timestamp": "2022-03-09T15:53:53",
                "message": null
            },
            {
                "test_name": "test_subtract",
                "details": null,
                "markers": "",
                "result": "FAILED",
                "duration": 0.00017888799993670546,
                "timestamp": "2022-03-09T15:53:53",
                "message": "self = <test_sample2.TestClass object at 0x7f659f8af310>\n\n    def test_subtract(self):\n        a = 3\n        b = 2\n        c = a - b\n>       assert c == 0\nE       assert 1 == 0\n\ntest_sample2.py:33: AssertionError"
            },
            {
                "test_name": "test_divide",
                "details": null,
                "markers": "parametrize",
                "parameters": [
                    {
                        "name": "a",
                        "value": 22
                    },
                    {
                        "name": "b",
                        "value": 11
                    },
                    {
                        "name": "c",
                        "value": 2
                    }
                ],
                "result": "PASSED",
                "duration": 0.0001058529996953439,
                "timestamp": "2022-03-09T15:53:53",
                "message": null,
                "railflow_test_attributes": {
                    "title": "method title",
                    "jira_ids": [
                        "11111"
                    ],
                    "case_fields": [
                        {
                            "name": "Required text field",
                            "value": "method"
                        }
                    ],
                    "result_fields": [
                        {
                            "name": "Custom field",
                            "value": "Result from method"
                        }
                    ],
                    "case_type": "Compatibility",
                    "case_priority": "High",
                    "smart_failure_assignment": [
                        "user3@gmail.com"
                    ]
                }
            },
            {
                "test_name": "test_divide",
                "details": null,
                "markers": "parametrize",
                "parameters": [
                    {
                        "name": "a",
                        "value": 64
                    },
                    {
                        "name": "b",
                        "value": 8
                    },
                    {
                        "name": "c",
                        "value": 8
                    }
                ],
                "result": "PASSED",
                "duration": 0.00013493100050254725,
                "timestamp": "2022-03-09T15:53:53",
                "message": null,
                "railflow_test_attributes": {
                    "title": "method title",
                    "jira_ids": [
                        "11111"
                    ],
                    "case_fields": [
                        {
                            "name": "Required text field",
                            "value": "method"
                        }
                    ],
                    "result_fields": [
                        {
                            "name": "Custom field",
                            "value": "Result from method"
                        }
                    ],
                    "case_type": "Compatibility",
                    "case_priority": "High",
                    "smart_failure_assignment": [
                        "user3@gmail.com"
                    ]
                }
            },
            {
                "test_name": "test_divide",
                "details": null,
                "markers": "parametrize",
                "parameters": [
                    {
                        "name": "a",
                        "value": 9
                    },
                    {
                        "name": "b",
                        "value": 3
                    },
                    {
                        "name": "c",
                        "value": 3
                    }
                ],
                "result": "PASSED",
                "duration": 0.00020506200235104188,
                "timestamp": "2022-03-09T15:53:53",
                "message": null,
                "railflow_test_attributes": {
                    "title": "method title",
                    "jira_ids": [
                        "11111"
                    ],
                    "case_fields": [
                        {
                            "name": "Required text field",
                            "value": "method"
                        }
                    ],
                    "result_fields": [
                        {
                            "name": "Custom field",
                            "value": "Result from method"
                        }
                    ],
                    "case_type": "Compatibility",
                    "case_priority": "High",
                    "smart_failure_assignment": [
                        "user3@gmail.com"
                    ]
                }
            }
        ],
        "railflow_test_attributes": {
            "jira_ids": [
                "301219"
            ],
            "case_fields": [
                {
                    "name": "Required text field",
                    "value": "Class"
                }
            ],
            "result_fields": [
                {
                    "name": "Custom field",
                    "value": "Result from class"
                }
            ],
            "case_type": "Automated",
            "case_priority": "Critical",
            "smart_failure_assignment": [
                "user1@gmail.com, user2@gmail.com"
            ]
        }
    }
]
```
5. Install Railflow CLI

```shell
npm install railflow
```

6. Run Railflow CLI and upload test results into TestRail

```shell
npx railflow -k ABCDE-12345-FGHIJ-67890 -url https://testrail.your-server.com/ -u testrail-username -p testrail-password -pr "Railflow Demo" -path section1/section2 -f pytest-railflow -r pytest_example/*.json -sm path
```

Where:

| Key                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                         | Example                                                          |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| -k, --key               | (online activation) License key. Can be set with RAILFLOW_LICENSE environment variable                                                                                                                                                                                                                                                                                                                                                              | -k XXXXX-XXXXX-XXXXX-XXXXX                                       |
| -url, --url             | TestRail instance URL                                                                                                                                                                                                                                                                                                                                                                                                                               | -url https://example.testrail.io                                 |
| -u, --username          | TestRail username. Can be set with RAILFLOW_TR_USER environment variable                                                                                                                                                                                                                                                                                                                                                                            | -u test-username                                                 |
| -p, --password          | TestRail password or API Key. Can be set with RAILFLOW_TR_PASSWORD environment variable                                                                                                                                                                                                                                                                                                                                                             | -p XtpHXiPLEODyhF                                                |
| -pr, --project          | TestRail project name                                                                                                                                                                                                                                                                                                                                                                                                                               | -pr "example project"                                            |
| -path, --test-path      | TestRail test cases path                                                                                                                                                                                                                                                                                                                                                                                                                            | -path "Section1/subsection2/ShoppingCart                         |
| -f, --format            | Report format: 'pytest-railflow' (case insensitive)                                                                                                                                                                                                                                                                                                                    | -f junit                                                         |
| -r, --report-files      | The file path(s) to the test report file(s) generated during the build. User can pass multiple values separated with spaces. Ant-style patterns such as **\*\*/reports/\*.xml** can be used.<br/>`E.g. use **target/reports/\*.xml** `to capture all XML files in **target/reports** directory.                                                                                                                            | -r target/surefire-reports/\*.xml target/failsafe-reports/\*.xml |
| -sm, --search-mode      |  Specifies the test case lookup algorithm. <br/> `name:` search for test case matching the name within the entire test suite. If test case found, update the test case. If test case not found, create a new test case within specified `-path` <br/> `path:` search for test case matching the name within the specified `-path`. If test case found, update the test case. If test case not found, create a new test case within specified `-path`| -sm path                                                         |

Please see [Railflow NPM documentation](https://docs.railflow.io/cli/railflow-npm/) for the all the details about Railflow CLI options.

7. View results in TestRail

#### Test run

![Alt Test run in TestRail](/img/framework/pytest/TestRail_testrun.png "Test run in TestRail")

#### Test result details

![Alt Test result details in TestRail](/img/framework/pytest/TestRail_testcase_data.png "Test result details in Testrail")

#### Parameterized tests details

![Alt Parameterized tests details in TestRail](/img/framework/pytest/TestRail_parameterized_tests.png "Test result parameterized tests in Testrail")

## Sample Pytest Project
This sample pytest project has a handful of tests using basic tests and selenium webdriver (using pysplinter) tests. 

https://github.com/railflow/railflow_pytest_examples
