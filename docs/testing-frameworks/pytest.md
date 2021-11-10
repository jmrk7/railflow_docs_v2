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

### Function Level Markers
Railflow `function level markers` are used to map pytest tests to existing tests in TestRail. Function level markers override class level markers.


  Function level Markers | Description
  --------------------------|-----------------------
  jira\_ids | xxx
  case\_fields | xxx
  result\_fields | xxx
  testrail\_ids | xxx
  case\_type | xxx
  case\_priority | xxx

```jsx title="Pytest function level markers"
import pytest

@pytest.mark.railflow(
testrail_ids="c453, c34, c56",
case_type="automated",
case_priority="1")  

def test_add():
a = 2 + 7
assert a == 9

```

### Class Level Markers
Railflow `class level markers` are applied to `all` the functions within the class. If a marked class also contains a marked function, the `function level marker takes precedence and will override the class level marker`.


  Class level Attributes  | Description
  --------------------------|-----------------------
  case\_fields | xxx
  result\_fields  | xxx
  case\_type  | xxx
  case\_priority  | xxx
  smart\_assignment  | xxx




```jsx title="Pytest class level markers"
@pytest.mark.railflow(
case_fields="field",
result_fields="output",
case_type="Normal tests",
case_priority="Important",
smart_assignment=["user1@gmail.com, user2@gmail.com"])

class TestClass:
    def test_add(self):
        a = 3
        b = 2
        c = a + b
        assert c == 5

    @pytest.mark.railflow(jira_ids=100231)
    def test_sub(self):
        a = 3
        b = 2
        c = a - b
        assert c == 1

```

### Selenium Automatic Screenshots

Railflow plugin supports [Pytest Splinter](https://github.com/pytest-dev/pytest-splinter) and if your selenium/appium tests uses pytest-splinter plugin, then Railflow plugin automatically takes screenshots of failed tests and upload them to TestRail (yes, really)

```jsx title="Pytest splinter example"
@pytest.mark.railflow(
jira_ids=100414,
result_fields="field_B3",
testrail_ids="c45, c56",
case_type="automated")

def test_reload(browser):
    "dummy test that is expected to fail"
    url = "https://www.duckduckgo.com"
    browser.visit(url)
    browser.reload()
    assert browser.url == 'https://www.google.com'

```
In the example above, the failing test will generate a screenshot and add the local path to the screenshot will be dumped in the json results file. Once the json results file is processed by Railflow CI Plugins or CLI, the pytest test results along with screenshots will be viewable in TestRail.

### Running Tests
Run your pytest tests normally with the jsonfile argument `--jsonfile test_results.json`. This argument will generate an enriched test results report containing details about the test run.

## Sample Pytest Project
This sample pytest project has a handful of tests using basic tests and selenium webdriver (using pysplinter) tests. 

https://github.com/railflow/railflow_pytest_examples