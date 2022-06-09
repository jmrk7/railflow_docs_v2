---
sidebar_position: 5
---

# Robot

## Overview

:::info
[Railflow](https://railflow.io) allows to export robot test reports into testrail

* Map Robot tests into one or several test cases in TestRail by providing test case IDs.
* Attach screenshots to the test case results in TestRail.
* Provide values for TestRail custom case and result fields for each run.
:::

### Running Examples

1. Add Robot test.

test_browser.robot
```shell
*** Settings ***
| Documentation | A test suite with a single test for valid login.
| Library | Selenium2Library

*** Variables ***
| ${LOGIN URL} | https://www.browserstack.com/users/sign_in
| ${BROWSER} | ff

| ${Login button} | xpath=/html/body/main/div[4]/section/form/div[1]/div/div[1]/div[10]/div/input

*** Test Cases ***
| Valid Login
| | Open Browser To Login Page
| | Input Text | user_email_login | abc@gmail.com
| | Input Text | user_password | password
| | Click Log in
| | Welcome Page Should Be Open

*** Keywords ***
| Set Environment Variable  chromedriver  /usr/local/bin/chromedriver

| Open Browser To Login Page
| | Open Browser | ${LOGIN URL} | ${BROWSER}
| | Maximize Browser Window
| | Wait Until Page Contains Element | ${Login button} | 5s

| Click Log in
| | Click Element | ${Login button}

| Welcome Page Should Be Open
| | Location Should Be | ${LOGIN URL}
| | Wait Until Page Contains | Accounts | 5s
| | Page Should Contain | Accounts
```

2. Run the test

```shell
$ robot test_browser.robot
```

3. View report file

output.xml
```shell
<?xml version="1.0" encoding="UTF-8"?>
<robot generator="Robot 5.0 (Python 3.8.10 on linux)" generated="20220405 17:17:50.091" rpa="false" schemaversion="3">
	<suite id="s1" name="My Testcase" source="/home/tharaka/projects/agiletestware/robot/my_testcase.robot">
		<test id="s1-t1" name="Valid Login" line="12">
			<kw name="Open Browser To Login Page">
				<kw name="Open Browser" library="Selenium2Library">
					<arg>${LOGIN URL}</arg>
					<arg>${BROWSER}</arg>
					<doc>Opens a new browser instance to the optional ``url``.</doc>
					<msg timestamp="20220405 17:17:50.210" level="INFO">Opening browser 'ff' to base url 'https://www.browserstack.com/users/sign_in'.</msg>
					<msg timestamp="20220405 17:17:50.211" level="INFO">Firefox driver log is always forced to to: /home/tharaka/projects/agiletestware/robot/geckodriver-22.log</msg>
					<status status="PASS" starttime="20220405 17:17:50.210" endtime="20220405 17:18:05.271"/>
				</kw>
				<kw name="Maximize Browser Window" library="Selenium2Library">
					<doc>Maximizes current browser window.</doc>
					<status status="PASS" starttime="20220405 17:18:05.271" endtime="20220405 17:18:05.633"/>
				</kw>
				<kw name="Wait Until Page Contains Element" library="Selenium2Library">
					<arg>${Login button}</arg>
					<arg>5s</arg>
					<doc>Waits until the element ``locator`` appears on the current page.</doc>
					<status status="PASS" starttime="20220405 17:18:05.633" endtime="20220405 17:18:05.652"/>
				</kw>
				<status status="PASS" starttime="20220405 17:17:50.210" endtime="20220405 17:18:05.652"/>
			</kw>
			<kw name="Input Text" library="Selenium2Library">
				<arg>user_email_login</arg>
				<arg>abc@gmail.com</arg>
				<doc>Types the given ``text`` into the text field identified by ``locator``.</doc>
				<msg timestamp="20220405 17:18:05.653" level="INFO">Typing text 'abc@gmail.com' into text field 'user_email_login'.</msg>
				<status status="PASS" starttime="20220405 17:18:05.652" endtime="20220405 17:18:05.744"/>
			</kw>
			<kw name="Input Text" library="Selenium2Library">
				<arg>user_password</arg>
				<arg>password</arg>
				<doc>Types the given ``text`` into the text field identified by ``locator``.</doc>
				<msg timestamp="20220405 17:18:05.744" level="INFO">Typing text 'password' into text field 'user_password'.</msg>
				<status status="PASS" starttime="20220405 17:18:05.744" endtime="20220405 17:18:05.840"/>
			</kw>
			<kw name="Click Log in">
				<kw name="Click Element" library="Selenium2Library">
					<arg>${Login button}</arg>
					<doc>Click the element identified by ``locator``.</doc>
					<msg timestamp="20220405 17:18:05.843" level="INFO">Clicking element 'xpath=/html/body/main/div[4]/section/form/div[1]/div/div[1]/div[10]/div/input'.</msg>
					<status status="PASS" starttime="20220405 17:18:05.842" endtime="20220405 17:18:06.190"/>
				</kw>
				<status status="PASS" starttime="20220405 17:18:05.841" endtime="20220405 17:18:06.190"/>
			</kw>
			<kw name="Welcome Page Should Be Open">
				<kw name="Location Should Be" library="Selenium2Library">
					<arg>${LOGIN URL}</arg>
					<doc>Verifies that the current URL is exactly ``url``.</doc>
					<msg timestamp="20220405 17:18:06.194" level="INFO">Current location is 'https://www.browserstack.com/users/sign_in'.</msg>
					<status status="PASS" starttime="20220405 17:18:06.191" endtime="20220405 17:18:06.194"/>
				</kw>
				<kw name="Wait Until Page Contains" library="Selenium2Library">
					<arg>Accounts</arg>
					<arg>5s</arg>
					<doc>Waits until ``text`` appears on the current page.</doc>
					<msg timestamp="20220405 17:18:11.264" level="INFO" html="true">&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan="3"&gt;&lt;a href="selenium-screenshot-16.png"&gt;&lt;img src="selenium-screenshot-16.png" width="800px"&gt;&lt;/a&gt;</msg>
					<msg timestamp="20220405 17:18:11.264" level="FAIL">Text 'Accounts' did not appear in 5 seconds.</msg>
					<status status="FAIL" starttime="20220405 17:18:06.194" endtime="20220405 17:18:11.264"/>
				</kw>
				<kw name="Page Should Contain" library="Selenium2Library">
					<arg>Accounts</arg>
					<doc>Verifies that current page contains ``text``.</doc>
					<status status="NOT RUN" starttime="20220405 17:18:11.265" endtime="20220405 17:18:11.265"/>
				</kw>
				<status status="FAIL" starttime="20220405 17:18:06.190" endtime="20220405 17:18:11.265"/>
			</kw>
			<status status="FAIL" starttime="20220405 17:17:50.209" endtime="20220405 17:18:11.265">Text 'Accounts' did not appear in 5 seconds.</status>
		</test>
		<doc>A test suite with a single test for valid login.</doc>
		<status status="FAIL" starttime="20220405 17:17:50.091" endtime="20220405 17:18:11.266"/>
	</suite>
	<statistics>
		<total>
			<stat pass="0" fail="1" skip="0">All Tests</stat>
		</total>
		<tag>
		</tag>
		<suite>
			<stat pass="0" fail="1" skip="0" id="s1" name="My Testcase">My Testcase</stat>
		</suite>
	</statistics>
	<errors>
	</errors>
</robot>
```
4. Install Railflow CLI

```shell
npm install railflow
```

5. Run Railflow CLI and upload test results into TestRail

```shell
npx railflow -k ABCDE-12345-FGHIJ-67890 -url https://testrail.your-server.com/ -u testrail-username -p testrail-password -pr "Railflow Demo" -path section1/section2 -f robot -r robot_example/*.xml -sm path
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

6. View results in TestRail

#### Test run details

![Alt Test run in TestRail](/img/framework/robot/TestRail_testrun.png "Test run in TestRail")

#### Test  result details

![Alt Test results in TestRail](/img/framework/robot/TestRail_testcase_results.png "Test results in Testrail")
