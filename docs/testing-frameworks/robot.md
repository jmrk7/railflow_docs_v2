---
sidebar_position: 5
---

# Robot

## Overview

:::info
[Robot](https://robotframework.org/) framework is open source test automation framework which is widely used by many teams.  
[Railflow](https://railflow.io) provides an easy and convenient integration between [Robot](https://robotframework.org/) framework and [TestRail](https://www.gurock.com/testrail/) and automatically creates all required entities (sections, cases, test plans, runs, etc...) in TestRail.  
It also allows users to:  
* Map Robot tests into one or several test cases in TestRail by providing test case IDs.
* Attach screenshots to the test case results in TestRail.
:::


## How do Robot and Railflow work together
Each time Robot runs the tests it also generates XML report files which then can be fed to [Railflow NPM CLI](https://www.npmjs.com/package/railflow) or to native [Jenkins or TeamCity](https://railflow.io/resources/testrail/downloads) plugins.   
Railflow, in turn, parses Robot XML report files and creates or updates the following entities in TestRail:

* Sections and subsections
* Test cases
* Test plan and/or test run and test results
* Milestones and run configurations (optional)

Railflow also uploads screenshots into test results and can assign failed test cases to some predefined list of TestRail users.

You can find the complete step-by-step example on how to integrate Robot framework with TestRail below.

# Robot with TestRail integration example

## Prerequisites
* Robot framework 4 or newer
* TestRail 7 or newer
* Railflow NPM CLI v.2.1.12 or newer

## Writing Robot test
For this example the following simple Selenium test will be used:

```shell title="test_browser.robot"
*** Settings ***
Documentation  A test suite with a single test for valid login.
Library  Selenium2Library
Test Teardown  Close All Browsers

*** Variables ***
${LOGIN URL}  https://www.browserstack.com/users/sign_in
${BROWSER}  Chrome

${Login button}  xpath=/html/body/main/div[4]/section/form/div[1]/div/div[1]/div[10]/div/input

*** Test Cases ***
Open Login Page
  Open Browser To Login Page
  Main Page Should Be Open

Valid Login
  Open Browser To Login Page
  Input Text  user_email_login  abc@gmail.com
  Input Text  user_password  password
  Click Log in
  Welcome Page Should Be Open

*** Keywords ***
Open Browser To Login Page
  Open Browser  ${LOGIN URL}  ${BROWSER}
  Maximize Browser Window
  Wait Until Page Contains Element  ${Login button}  5s

Click Log in
  Click Element  ${Login button}

Welcome Page Should Be Open
  Location Should Be  ${LOGIN URL}
  Wait Until Page Contains  Accounts  5s
  Page Should Contain  Accounts
  
Main Page Should Be Open
    Location Should Be  ${LOGIN URL}
    Page Should Contain  Sign in
```

:::note
Please make sure to download a compatible version of [Chromedriver](https://chromedriver.chromium.org/downloads) and make it available for Robot.
:::

## Running Robot test

To run robot test use the following command:
 
```shell
$ robot test_browser.robot
```

This will run the test above and produces the `output.xml` report file:

```shell title="output.xml"
<?xml version="1.0" encoding="UTF-8"?>
<robot generator="Robot 4.1.3 (Python 3.8.0 on win32)" generated="20220711 14:10:10.414" rpa="false" schemaversion="2">
	<suite id="s1" name="4-Login" source="C:\work\Projects\example-robot-framework\tests\4-login.robot">
		<test id="s1-t1" name="Open Login Page">
			<kw name="Open Browser To Login Page">
				<kw name="Open Browser" library="Selenium2Library">
					<arg>${LOGIN URL}</arg>
					<arg>${BROWSER}</arg>
					<doc>Opens a new browser instance to the optional ``url``.</doc>
					<msg timestamp="20220711 14:10:13.166" level="INFO">Opening browser 'Chrome' to base url 'https://www.browserstack.com/users/sign_in'.</msg>
					<status status="PASS" starttime="20220711 14:10:13.165" endtime="20220711 14:10:20.292"/>
				</kw>
				<kw name="Maximize Browser Window" library="Selenium2Library">
					<doc>Maximizes current browser window.</doc>
					<status status="PASS" starttime="20220711 14:10:20.292" endtime="20220711 14:10:20.423"/>
				</kw>
				<kw name="Wait Until Page Contains Element" library="Selenium2Library">
					<arg>${Login button}</arg>
					<arg>5s</arg>
					<doc>Waits until the element ``locator`` appears on the current page.</doc>
					<status status="PASS" starttime="20220711 14:10:20.423" endtime="20220711 14:10:20.442"/>
				</kw>
				<status status="PASS" starttime="20220711 14:10:13.165" endtime="20220711 14:10:20.443"/>
			</kw>
			<kw name="Main Page Should Be Open">
				<kw name="Location Should Be" library="Selenium2Library">
					<arg>${LOGIN URL}</arg>
					<doc>Verifies that the current URL is exactly ``url``.</doc>
					<msg timestamp="20220711 14:10:20.462" level="INFO">Current location is 'https://www.browserstack.com/users/sign_in'.</msg>
					<status status="PASS" starttime="20220711 14:10:20.444" endtime="20220711 14:10:20.462"/>
				</kw>
				<kw name="Page Should Contain" library="Selenium2Library">
					<arg>Sign in</arg>
					<doc>Verifies that current page contains ``text``.</doc>
					<msg timestamp="20220711 14:10:20.488" level="INFO">Current page contains text 'Sign in'.</msg>
					<status status="PASS" starttime="20220711 14:10:20.462" endtime="20220711 14:10:20.488"/>
				</kw>
				<status status="PASS" starttime="20220711 14:10:20.443" endtime="20220711 14:10:20.488"/>
			</kw>
			<kw name="Close All Browsers" library="Selenium2Library" type="TEARDOWN">
				<doc>Closes all open browsers and resets the browser cache.</doc>
				<status status="PASS" starttime="20220711 14:10:20.489" endtime="20220711 14:10:22.843"/>
			</kw>
			<status status="PASS" starttime="20220711 14:10:13.164" endtime="20220711 14:10:22.844"/>
		</test>
		<test id="s1-t2" name="Valid Login">
			<kw name="Open Browser To Login Page">
				<kw name="Open Browser" library="Selenium2Library">
					<arg>${LOGIN URL}</arg>
					<arg>${BROWSER}</arg>
					<doc>Opens a new browser instance to the optional ``url``.</doc>
					<msg timestamp="20220711 14:10:22.850" level="INFO">Opening browser 'Chrome' to base url 'https://www.browserstack.com/users/sign_in'.</msg>
					<status status="PASS" starttime="20220711 14:10:22.849" endtime="20220711 14:10:29.854"/>
				</kw>
				<kw name="Maximize Browser Window" library="Selenium2Library">
					<doc>Maximizes current browser window.</doc>
					<status status="PASS" starttime="20220711 14:10:29.854" endtime="20220711 14:10:30.005"/>
				</kw>
				<kw name="Wait Until Page Contains Element" library="Selenium2Library">
					<arg>${Login button}</arg>
					<arg>5s</arg>
					<doc>Waits until the element ``locator`` appears on the current page.</doc>
					<status status="PASS" starttime="20220711 14:10:30.005" endtime="20220711 14:10:30.020"/>
				</kw>
				<status status="PASS" starttime="20220711 14:10:22.848" endtime="20220711 14:10:30.021"/>
			</kw>
			<kw name="Input Text" library="Selenium2Library">
				<arg>user_email_login</arg>
				<arg>abc@gmail.com</arg>
				<doc>Types the given ``text`` into the text field identified by ``locator``.</doc>
				<msg timestamp="20220711 14:10:30.022" level="INFO">Typing text 'abc@gmail.com' into text field 'user_email_login'.</msg>
				<status status="PASS" starttime="20220711 14:10:30.021" endtime="20220711 14:10:30.150"/>
			</kw>
			<kw name="Input Text" library="Selenium2Library">
				<arg>user_password</arg>
				<arg>password</arg>
				<doc>Types the given ``text`` into the text field identified by ``locator``.</doc>
				<msg timestamp="20220711 14:10:30.151" level="INFO">Typing text 'password' into text field 'user_password'.</msg>
				<status status="PASS" starttime="20220711 14:10:30.151" endtime="20220711 14:10:30.270"/>
			</kw>
			<kw name="Click Log in">
				<kw name="Click Element" library="Selenium2Library">
					<arg>${Login button}</arg>
					<doc>Click the element identified by ``locator``.</doc>
					<msg timestamp="20220711 14:10:30.272" level="INFO">Clicking element 'xpath=/html/body/main/div[4]/section/form/div[1]/div/div[1]/div[10]/div/input'.</msg>
					<status status="PASS" starttime="20220711 14:10:30.271" endtime="20220711 14:10:30.398"/>
				</kw>
				<status status="PASS" starttime="20220711 14:10:30.271" endtime="20220711 14:10:30.399"/>
			</kw>
			<kw name="Welcome Page Should Be Open">
				<kw name="Location Should Be" library="Selenium2Library">
					<arg>${LOGIN URL}</arg>
					<doc>Verifies that the current URL is exactly ``url``.</doc>
					<msg timestamp="20220711 14:10:30.407" level="INFO">Current location is 'https://www.browserstack.com/users/sign_in'.</msg>
					<status status="PASS" starttime="20220711 14:10:30.400" endtime="20220711 14:10:30.407"/>
				</kw>
				<kw name="Wait Until Page Contains" library="Selenium2Library">
					<arg>Accounts</arg>
					<arg>5s</arg>
					<doc>Waits until ``text`` appears on the current page.</doc>
					<msg timestamp="20220711 14:10:35.721" level="INFO" html="true">&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan="3"&gt;&lt;a href="selenium-screenshot-11.png"&gt;&lt;img src="selenium-screenshot-11.png" width="800px"&gt;&lt;/a&gt;</msg>
					<msg timestamp="20220711 14:10:35.759" level="FAIL">Text 'Accounts' did not appear in 5 seconds.</msg>
					<status status="FAIL" starttime="20220711 14:10:30.407" endtime="20220711 14:10:35.759"/>
				</kw>
				<kw name="Page Should Contain" library="Selenium2Library">
					<arg>Accounts</arg>
					<doc>Verifies that current page contains ``text``.</doc>
					<status status="NOT RUN" starttime="20220711 14:10:35.759" endtime="20220711 14:10:35.760"/>
				</kw>
				<status status="FAIL" starttime="20220711 14:10:30.400" endtime="20220711 14:10:35.761"/>
			</kw>
			<kw name="Close All Browsers" library="Selenium2Library" type="TEARDOWN">
				<doc>Closes all open browsers and resets the browser cache.</doc>
				<status status="PASS" starttime="20220711 14:10:35.762" endtime="20220711 14:10:38.106"/>
			</kw>
			<status status="FAIL" starttime="20220711 14:10:22.847" endtime="20220711 14:10:38.107">Text 'Accounts' did not appear in 5 seconds.</status>
		</test>
		<doc>A test suite with a single test for valid login.</doc>
		<status status="FAIL" starttime="20220711 14:10:10.418" endtime="20220711 14:10:38.111"/>
	</suite>
	<statistics>
		<total>
			<stat pass="1" fail="1" skip="0">All Tests</stat>
		</total>
		<tag>
		</tag>
		<suite>
			<stat pass="1" fail="1" skip="0" id="s1" name="4-Login">4-Login</stat>
		</suite>
	</statistics>
	<errors>
	</errors>
</robot>
```

## Installing Railflow CLI

To install Railflow CLI, run the following command:

```shell
npm install railflow
```

## Uploading Robot test result file into TestRail with Railflow CLI.

```shell
npx railflow -k ABCDE-12345-FGHIJ-67890 -url https://testrail.your-server.com/ -u testrail-username -p testrail-password -pr "Railflow Demo" -path "UI Tests/Railflow" -f robot -r output.xml -sm path
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

## Viewing results in TestRail

### Test run details

![Alt Test run in TestRail](/img/framework/robot/TestRail_testrun.png "Test run in TestRail")

### Test result details

![Alt Test results in TestRail](/img/framework/robot/TestRail_testcase_results.png "Test results in Testrail")

## Mapping Robot test cases into existing test cases in TestRail
Sometimes test cases are already defined in TestRail and are being executed as a part of automation testing suite in some CI system. Railflow allows users to map results of automated test execution back to the existing test cases in TestRail by providing test IDs.  
In order to do that a new `testrail.id=C123` tag should be added to a Robot test, where `C123` is the ID of the existing test case.  
Please see the example below for details:

### Getting test case ID from TestRail
The test case ID can be obtained from the TestRail UI:  

![Existing test cases in TestRail](/img/framework/robot/mapping_existing_1.png "Existing test cases in TestRail")

### Adding `testrail.id` tag into `Valid Login` test case:  
You can add one or more `testrail.id` tags into your Robot test:

```shell title="test_browser.robot"
*** Settings ***
Documentation  A test suite with a single test for valid login.
Library  Selenium2Library
Test Teardown  Close All Browsers

*** Variables ***
${LOGIN URL}  https://www.browserstack.com/users/sign_in
${BROWSER}  Chrome

${Login button}  xpath=/html/body/main/div[4]/section/form/div[1]/div/div[1]/div[10]/div/input

*** Test Cases ***
Open Login Page
  Open Browser To Login Page
  Main Page Should Be Open
 
Valid Login
  [Tags]  testrail.id=C1825  testrail.id=C1826
  Open Browser To Login Page
  Input Text  user_email_login  abc@gmail.com
  Input Text  user_password  password
  Click Log in
  Welcome Page Should Be Open

*** Keywords ***
Open Browser To Login Page
  Open Browser  ${LOGIN URL}  ${BROWSER}
  Maximize Browser Window
  Wait Until Page Contains Element  ${Login button}  5s

Click Log in
  Click Element  ${Login button}

Welcome Page Should Be Open
  Location Should Be  ${LOGIN URL}
  Wait Until Page Contains  Accounts  5s
  Page Should Contain  Accounts
  
Main Page Should Be Open
    Location Should Be  ${LOGIN URL}
    Page Should Contain  Sign in
```

### Results in TestRail
You can see that the `Valid Login` test case is now mapped into `Existing test case one` and `Existing test case two`

![Existing test cases in TestRail](/img/framework/robot/mapping_existing_2.png "Existing test cases in TestRail")