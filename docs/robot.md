---
sidebar_position: 9
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

## Robot with TestRail integration example

## Prerequisites
* Robot framework 4 or newer
* TestRail 7 or newer
* Railflow NPM CLI v.2.1.12 or newer

## Writing Robot test
For this example the following simple Selenium test will be used:

```shell title="1-login.robot"
*** Settings ***
Documentation  A test suite with a single test for valid login.
Library  ../resources/ChromeDriverProvider.py
Library  Selenium2Library
Test Teardown  Close All Browsers

*** Variables ***
${App URL}  https://rwa.railflow.io
${Login URL}  ${App URL}/signin
${Login button}  xpath=//*[@id="root"]/div/main/div[1]/form/button
${Login name}  xpath=//*[@id="root"]/div/div/div/div[1]/div[2]/h6[2]
${Error}  xpath=//*[@id="root"]/div/main/div[1]/div[1]/div[2]

*** Test Cases ***
Valid Login
  Open Browser To Login Page
  Input Text  username  Katharina_Bernier
  Input Text  password  s3cret
  Click Log in
  Welcome Page Should Be Open
  
Invalid Login
  Open Browser To Login Page  
  Input Text  username  Katharina_Bernier
  Input Text  password  whatever
  Click Log in
  Error Message Should Be Displayed

*** Keywords ***
Open Browser To Login Page
  ${DRIVER_PATH}  Get Chromedriver Path
  Open Browser  ${LOGIN URL}  Chrome  executable_path=${DRIVER_PATH}
  Maximize Browser Window
  Wait Until Page Contains Element  ${Login button}  5s

Click Log in
  Click Element  ${Login button}

Welcome Page Should Be Open    
  Wait Until Location Is  ${App URL}  5s  
  Wait Until Page Contains Element   ${Login name}  5s
  ${name}  Get Text  ${Login name}
  Should Be Equal As Strings  ${name}  @Katharina_Bernier  
  
Error Message Should Be Displayed
    Wait Until Location Is  ${Login URL}  5s
    Wait Until Page Contains Element  ${Error}  5s        
    ${error message}  Get Text  ${Error}
    Should Be Equal As Strings  ${error message}  Username or password is invalid  
```

:::info
The source code of the example is available on [GitHub](https://github.com/railflow/example_robot)
:::

## Running Robot test

To run robot test use the following command:
 
```shell
$ robot robot -d results tests/
```

This will run the test above and produces the `output.xml` report file in the `results` folder:

```shell title="output.xml"
<?xml version="1.0" encoding="UTF-8"?>
<robot generator="Robot 4.1.3 (Python 3.8.0 on win32)" generated="20220712 18:36:34.607" rpa="false" schemaversion="2">
	<suite id="s1" name="Tests" source="C:\work\Projects\example_robot\tests">
		<suite id="s1-s1" name="1-Login" source="C:\work\Projects\example_robot\tests\1-login.robot">
			<test id="s1-s1-t1" name="Valid Login">
				<kw name="Open Browser To Login Page">
					<kw name="Get Chromedriver Path" library="ChromeDriverProvider">
						<var>${DRIVER_PATH}</var>
						<msg timestamp="20220712 18:36:35.017" level="INFO">====== WebDriver manager ======</msg>
						<msg timestamp="20220712 18:36:35.029" level="INFO">Current google-chrome version is 103.0.5060</msg>
						<msg timestamp="20220712 18:36:35.030" level="INFO">Get LATEST chromedriver version for 103.0.5060 google-chrome</msg>
						<msg timestamp="20220712 18:36:35.109" level="INFO">Driver [C:\Users\sergi\.wdm\drivers\chromedriver\win32\103.0.5060.53\chromedriver.exe] found in cache</msg>
						<msg timestamp="20220712 18:36:35.110" level="INFO">${DRIVER_PATH} = C:\Users\sergi\.wdm\drivers\chromedriver\win32\103.0.5060.53\chromedriver.exe</msg>
						<status status="PASS" starttime="20220712 18:36:35.017" endtime="20220712 18:36:35.110"/>
					</kw>
					<kw name="Open Browser" library="Selenium2Library">
						<arg>${LOGIN URL}</arg>
						<arg>Chrome</arg>
						<arg>executable_path=${DRIVER_PATH}</arg>
						<doc>Opens a new browser instance to the optional ``url``.</doc>
						<msg timestamp="20220712 18:36:35.111" level="INFO">Opening browser 'Chrome' to base url 'http://localhost:3000/signin'.</msg>
						<status status="PASS" starttime="20220712 18:36:35.110" endtime="20220712 18:36:47.486"/>
					</kw>
					<kw name="Maximize Browser Window" library="Selenium2Library">
						<doc>Maximizes current browser window.</doc>
						<status status="PASS" starttime="20220712 18:36:47.487" endtime="20220712 18:36:47.632"/>
					</kw>
					<kw name="Wait Until Page Contains Element" library="Selenium2Library">
						<arg>${Login button}</arg>
						<arg>5s</arg>
						<doc>Waits until the element ``locator`` appears on the current page.</doc>
						<status status="PASS" starttime="20220712 18:36:47.632" endtime="20220712 18:36:47.648"/>
					</kw>
					<status status="PASS" starttime="20220712 18:36:35.017" endtime="20220712 18:36:47.648"/>
				</kw>
				<kw name="Input Text" library="Selenium2Library">
					<arg>username</arg>
					<arg>Katharina_Bernier</arg>
					<doc>Types the given ``text`` into the text field identified by ``locator``.</doc>
					<msg timestamp="20220712 18:36:47.649" level="INFO">Typing text 'Katharina_Bernier' into text field 'username'.</msg>
					<status status="PASS" starttime="20220712 18:36:47.648" endtime="20220712 18:36:48.030"/>
				</kw>
				<kw name="Input Text" library="Selenium2Library">
					<arg>password</arg>
					<arg>s3cret</arg>
					<doc>Types the given ``text`` into the text field identified by ``locator``.</doc>
					<msg timestamp="20220712 18:36:48.031" level="INFO">Typing text 's3cret' into text field 'password'.</msg>
					<status status="PASS" starttime="20220712 18:36:48.031" endtime="20220712 18:36:48.374"/>
				</kw>
				<kw name="Click Log in">
					<kw name="Click Element" library="Selenium2Library">
						<arg>${Login button}</arg>
						<doc>Click the element identified by ``locator``.</doc>
						<msg timestamp="20220712 18:36:48.377" level="INFO">Clicking element 'xpath=//*[@id="root"]/div/main/div[1]/form/button'.</msg>
						<status status="PASS" starttime="20220712 18:36:48.376" endtime="20220712 18:36:48.577"/>
					</kw>
					<status status="PASS" starttime="20220712 18:36:48.376" endtime="20220712 18:36:48.577"/>
				</kw>
				<kw name="Welcome Page Should Be Open">
					<kw name="Wait Until Location Is" library="Selenium2Library">
						<arg>${App URL}</arg>
						<arg>5s</arg>
						<doc>Waits until the current URL is ``expected``.</doc>
						<msg timestamp="20220712 18:36:53.890" level="INFO" html="true">&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan="3"&gt;&lt;a href="selenium-screenshot-1.png"&gt;&lt;img src="selenium-screenshot-1.png" width="800px"&gt;&lt;/a&gt;</msg>
						<msg timestamp="20220712 18:36:53.892" level="FAIL">Location did not become 'http://localhost:3000' in 5 seconds.</msg>
						<status status="FAIL" starttime="20220712 18:36:48.578" endtime="20220712 18:36:53.892"/>
					</kw>
					<kw name="Wait Until Page Contains Element" library="Selenium2Library">
						<arg>${Login name}</arg>
						<arg>5s</arg>
						<doc>Waits until the element ``locator`` appears on the current page.</doc>
						<status status="NOT RUN" starttime="20220712 18:36:53.892" endtime="20220712 18:36:53.892"/>
					</kw>
					<kw name="Get Text" library="Selenium2Library">
						<var>${name}</var>
						<arg>${Login name}</arg>
						<doc>Returns the text value of the element identified by ``locator``.</doc>
						<status status="NOT RUN" starttime="20220712 18:36:53.893" endtime="20220712 18:36:53.893"/>
					</kw>
					<kw name="Should Be Equal As Strings" library="BuiltIn">
						<arg>${name}</arg>
						<arg>@Katharina_Bernier</arg>
						<doc>Fails if objects are unequal after converting them to strings.</doc>
						<status status="NOT RUN" starttime="20220712 18:36:53.893" endtime="20220712 18:36:53.893"/>
					</kw>
					<status status="FAIL" starttime="20220712 18:36:48.578" endtime="20220712 18:36:53.893"/>
				</kw>
				<kw name="Close All Browsers" library="Selenium2Library" type="TEARDOWN">
					<doc>Closes all open browsers and resets the browser cache.</doc>
					<status status="PASS" starttime="20220712 18:36:53.894" endtime="20220712 18:36:56.349"/>
				</kw>
				<status status="FAIL" starttime="20220712 18:36:35.016" endtime="20220712 18:36:56.355">Location did not become 'http://localhost:3000' in 5 seconds.</status>
			</test>
			<test id="s1-s1-t2" name="Invalid Login">
				<kw name="Open Browser To Login Page">
					<kw name="Get Chromedriver Path" library="ChromeDriverProvider">
						<var>${DRIVER_PATH}</var>
						<msg timestamp="20220712 18:36:56.359" level="INFO">====== WebDriver manager ======</msg>
						<msg timestamp="20220712 18:36:56.363" level="INFO">Current google-chrome version is 103.0.5060</msg>
						<msg timestamp="20220712 18:36:56.363" level="INFO">Get LATEST chromedriver version for 103.0.5060 google-chrome</msg>
						<msg timestamp="20220712 18:36:56.435" level="INFO">Driver [C:\Users\sergi\.wdm\drivers\chromedriver\win32\103.0.5060.53\chromedriver.exe] found in cache</msg>
						<msg timestamp="20220712 18:36:56.436" level="INFO">${DRIVER_PATH} = C:\Users\sergi\.wdm\drivers\chromedriver\win32\103.0.5060.53\chromedriver.exe</msg>
						<status status="PASS" starttime="20220712 18:36:56.358" endtime="20220712 18:36:56.436"/>
					</kw>
					<kw name="Open Browser" library="Selenium2Library">
						<arg>${LOGIN URL}</arg>
						<arg>Chrome</arg>
						<arg>executable_path=${DRIVER_PATH}</arg>
						<doc>Opens a new browser instance to the optional ``url``.</doc>
						<msg timestamp="20220712 18:36:56.437" level="INFO">Opening browser 'Chrome' to base url 'http://localhost:3000/signin'.</msg>
						<status status="PASS" starttime="20220712 18:36:56.436" endtime="20220712 18:37:05.889"/>
					</kw>
					<kw name="Maximize Browser Window" library="Selenium2Library">
						<doc>Maximizes current browser window.</doc>
						<status status="PASS" starttime="20220712 18:37:05.890" endtime="20220712 18:37:06.124"/>
					</kw>
					<kw name="Wait Until Page Contains Element" library="Selenium2Library">
						<arg>${Login button}</arg>
						<arg>5s</arg>
						<doc>Waits until the element ``locator`` appears on the current page.</doc>
						<status status="PASS" starttime="20220712 18:37:06.124" endtime="20220712 18:37:06.154"/>
					</kw>
					<status status="PASS" starttime="20220712 18:36:56.358" endtime="20220712 18:37:06.154"/>
				</kw>
				<kw name="Input Text" library="Selenium2Library">
					<arg>username</arg>
					<arg>Katharina_Bernier</arg>
					<doc>Types the given ``text`` into the text field identified by ``locator``.</doc>
					<msg timestamp="20220712 18:37:06.155" level="INFO">Typing text 'Katharina_Bernier' into text field 'username'.</msg>
					<status status="PASS" starttime="20220712 18:37:06.155" endtime="20220712 18:37:06.515"/>
				</kw>
				<kw name="Input Text" library="Selenium2Library">
					<arg>password</arg>
					<arg>whatever</arg>
					<doc>Types the given ``text`` into the text field identified by ``locator``.</doc>
					<msg timestamp="20220712 18:37:06.517" level="INFO">Typing text 'whatever' into text field 'password'.</msg>
					<status status="PASS" starttime="20220712 18:37:06.517" endtime="20220712 18:37:06.746"/>
				</kw>
				<kw name="Click Log in">
					<kw name="Click Element" library="Selenium2Library">
						<arg>${Login button}</arg>
						<doc>Click the element identified by ``locator``.</doc>
						<msg timestamp="20220712 18:37:06.748" level="INFO">Clicking element 'xpath=//*[@id="root"]/div/main/div[1]/form/button'.</msg>
						<status status="PASS" starttime="20220712 18:37:06.748" endtime="20220712 18:37:06.871"/>
					</kw>
					<status status="PASS" starttime="20220712 18:37:06.747" endtime="20220712 18:37:06.871"/>
				</kw>
				<kw name="Error Message Should Be Displayed">
					<kw name="Wait Until Location Is" library="Selenium2Library">
						<arg>${Login URL}</arg>
						<arg>5s</arg>
						<doc>Waits until the current URL is ``expected``.</doc>
						<status status="PASS" starttime="20220712 18:37:06.872" endtime="20220712 18:37:06.878"/>
					</kw>
					<kw name="Wait Until Page Contains Element" library="Selenium2Library">
						<arg>${Error}</arg>
						<arg>5s</arg>
						<doc>Waits until the element ``locator`` appears on the current page.</doc>
						<status status="PASS" starttime="20220712 18:37:06.879" endtime="20220712 18:37:07.122"/>
					</kw>
					<kw name="Get Text" library="Selenium2Library">
						<var>${error message}</var>
						<arg>${Error}</arg>
						<doc>Returns the text value of the element identified by ``locator``.</doc>
						<msg timestamp="20220712 18:37:07.147" level="INFO">${error message} = Username or password is invalid</msg>
						<status status="PASS" starttime="20220712 18:37:07.123" endtime="20220712 18:37:07.147"/>
					</kw>
					<kw name="Should Be Equal As Strings" library="BuiltIn">
						<arg>${error message}</arg>
						<arg>Username or password is invalid</arg>
						<doc>Fails if objects are unequal after converting them to strings.</doc>
						<status status="PASS" starttime="20220712 18:37:07.148" endtime="20220712 18:37:07.148"/>
					</kw>
					<status status="PASS" starttime="20220712 18:37:06.872" endtime="20220712 18:37:07.149"/>
				</kw>
				<kw name="Close All Browsers" library="Selenium2Library" type="TEARDOWN">
					<doc>Closes all open browsers and resets the browser cache.</doc>
					<status status="PASS" starttime="20220712 18:37:07.150" endtime="20220712 18:37:09.384"/>
				</kw>
				<status status="PASS" starttime="20220712 18:36:56.357" endtime="20220712 18:37:09.384"/>
			</test>
			<doc>A test suite with a single test for valid login.</doc>
			<status status="FAIL" starttime="20220712 18:36:34.645" endtime="20220712 18:37:09.387"/>
		</suite>
		<status status="FAIL" starttime="20220712 18:36:34.611" endtime="20220712 18:37:09.391"/>
	</suite>
	<statistics>
		<total>
			<stat pass="1" fail="1" skip="0">All Tests</stat>
		</total>
		<tag>
		</tag>
		<suite>
			<stat pass="1" fail="1" skip="0" id="s1" name="Tests">Tests</stat>
			<stat pass="1" fail="1" skip="0" id="s1-s1" name="1-Login">Tests.1-Login</stat>
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
npx railflow -k ABCDE-12345-FGHIJ-67890 -url https://testrail.your-server.com/ -u testrail-username -p testrail-password -pr "Railflow Demo" -path "UI Tests/Railflow" -f robot -r results/output.xml -sm path
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

![Alt Test run in TestRail](/img/robot/TestRail_testrun.png "Test run in TestRail")

### Test result details

![Alt Test results in TestRail](/img/robot/TestRail_testcase_results.png "Test results in Testrail")


:::info
If your Robot reports contain screenshots, Railflow will upload those into TestRail automatically:  

![Alt Test results in TestRail](/img/robot/TestRail_testcase_results_attachment1.png "Test results in Testrail")
:::

## Mapping Robot test cases into existing test cases in TestRail
Sometimes test cases are already defined in TestRail and are being executed as a part of automation testing suite in some CI system. Railflow allows users to map results of automated test execution back to the existing test cases in TestRail by providing test IDs.  
In order to do that a new `testrail.id=C123` tag should be added to a Robot test, where `C123` is the ID of the existing test case.  
Please see the example below for details:

### Getting test case ID from TestRail
The test case ID can be obtained from the TestRail UI:  

![Existing test cases in TestRail](/img/robot/mapping_existing_1.png "Existing test cases in TestRail")

### Adding `testrail.id` tag into `Valid Login` test case:  
You can add one or more `testrail.id` tags into your Robot test:

```shell title="1-login.robot"
*** Settings ***
Documentation  A test suite with a single test for valid login.
Library  ../resources/ChromeDriverProvider.py
Library  Selenium2Library
Test Teardown  Close All Browsers

*** Variables ***
${App URL}  https://rwa.railflow.io
${Login URL}  ${App URL}/signin
${Login button}  xpath=//*[@id="root"]/div/main/div[1]/form/button
${Login name}  xpath=//*[@id="root"]/div/div/div/div[1]/div[2]/h6[2]
${Error}  xpath=//*[@id="root"]/div/main/div[1]/div[1]/div[2]

*** Test Cases ***
Valid Login
  [Tags]  testrail.id=C1825  testrail.id=C1826
  Open Browser To Login Page
  Input Text  username  Katharina_Bernier
  Input Text  password  s3cret
  Click Log in
  Welcome Page Should Be Open
  
Invalid Login
  Open Browser To Login Page  
  Input Text  username  Katharina_Bernier
  Input Text  password  whatever
  Click Log in
  Error Message Should Be Displayed

*** Keywords ***
Open Browser To Login Page
  ${DRIVER_PATH}  Get Chromedriver Path
  Open Browser  ${LOGIN URL}  Chrome  executable_path=${DRIVER_PATH}
  Maximize Browser Window
  Wait Until Page Contains Element  ${Login button}  5s

Click Log in
  Click Element  ${Login button}

Welcome Page Should Be Open    
  Wait Until Location Is  ${App URL}  5s  
  Wait Until Page Contains Element   ${Login name}  5s
  ${name}  Get Text  ${Login name}
  Should Be Equal As Strings  ${name}  @Katharina_Bernier  
  
Error Message Should Be Displayed
    Wait Until Location Is  ${Login URL}  5s
    Wait Until Page Contains Element  ${Error}  5s        
    ${error message}  Get Text  ${Error}
    Should Be Equal As Strings  ${error message}  Username or password is invalid  
```

### Results in TestRail
You can see that the `Valid Login` test case is now mapped into `Existing test case one` and `Existing test case two`

![Existing test cases in TestRail](/img/robot/mapping_existing_2.png "Existing test cases in TestRail")