---
sidebar_position: 2
---

# TeamCity

## TeamCity and Testing Results
:::info
TeamCity is one of the most popular commercial CI applications and is used by thousands of companies all over the world. TeamCity is used to define the application build and test processes. QA teams also use TeamCity to run/schedule functional tests across a variety of tools and frameworks. However, the results of these tests can only be viewed in TeamCity and it is not really possible to aggregate results across multiple jobs, retain long history, and delegate test failures to your team.  
:::

## TestRail + TeamCity + Railflow 
:::info
By using Railflow, you can easily integrate TeamCity testing jobs with TestRail and automatically export all testing reports to TestRail. Aggregating result from all your TeamCity jobs into TestRail allows teams to look at test trends, auto-assign failures via Railflow automation, create link between TeamCity and TestRail, and much more. 
:::

## Simple and Flexible Setup
:::tip
Railflow can be used within TeamCity in a variety of ways. 
* Railflow TeamCity Plugin
* Railflow NPM Package
* [Railflow CLI Docker Image](https://hub.docker.com/r/railflow/railflow) using the Railflow NPM package
:::

## TeamCity Plugin (option 1)
:::note Plugin approach
Railflow TeamCity plugin is a typical TeamCity plugin. However, because Railflow is a commercial product, the plugin is not available in the TeamCity plugin marketplace but can be downloaded from our Downloads page.
:::

### Installation

1. Download [Railflow TeamCity Plugin](https://railflow.io/resources/downloads)
2. Install the plugin via TeamCity's Plugin Administration menu. Install the Railflow plugin and then restart TeamCity.

![TeamCity install](/img/cicd/teamcity/install-1.png)

![TeamCity install](/img/cicd/teamcity/install-2.png)

### Configuration
To configure plugin, navigate to `TeamCity Administration` &#x2192 `Railflow` section 

![TeamCity configure](/img/cicd/teamcity/teamcity-global-config.png)


### Licensing 
:::info
Railflow provides two license activation models. If your network allows outbound call to our api endpoint: `https://api.railflow.io`, then option 1: `License Key (online activation) ` will work. If you are unable to reach our api endpoint, pick option 2: `License File (offline activation)`.
:::

1. **License Key** (online activation): Select `License Key` option and copy/paste the license key from your email and click `Activate License`

![TeamCity online activation](/img/cicd/jenkins/online-activation.png)

2. **License File** (offline activation): If your TeamCity instance does not have outbound internet access, you may use this option to upload the license activation from your email. The license file has a .skm extension.

![TeamCity offline activation](/img/cicd/jenkins/offline-license-activation.png)

### TestRail Configuration
Railflow plugin configuration section allows you to centrally defined one or multiple TestRail servers. Once configured, they can be easily referenced in the TeamCity jobs. 

![TeamCity multiple config](/img/cicd/teamcity/teamcity-multiple-config.png)

### Project Configuration
Once the plugin has been configured, you can easily configure any TeamCity project that is running any testing tool/framework. Simply follow the steps below

Add and configure the Railflow Build Step: `Railflow Plugin: TestRail Test Results Processor`. This build step allows you to specify your test framework, test results location, and other TestRail configurations.

![TeamCity project config](/img/cicd/teamcity/teamcity-project-config.png)

### Build Step Reference
The Railflow build step provides users a host of options to integrate Teamcity with TestRail in a variety of ways and across any testing tool and framework. The reference below describes all the options and their usage.


| Field Name                        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                       |
|-----------------------------------|----------|-------------|
| TestRail Server 	                 | Yes	    | Select one of the server names configured in "Global settings configuration"	|
| TestRail Project                  | Yes      | The name of a project in TestRail to which results should be exported			|
| Fail build if upload unsuccessful | N/A      | If checked, the build will be marked as failed if for any reason the plugin could not upload the results. This could be due to Railflow issues, TestRail server issues, network issues, etc.	|
| Override TestRail Credentials	    | No	    | If specified, it overrides TestRail user credentials defined in Global Configuration	|
| Results File Pattern              | Yes      | The file path to the test report file(s) generated during the build. Ant-style patterns such as **\*\*/surefire-reports/\*.xml** can be used.<br/>E.g. use **target/surefire-reports/*.xml** to capture all XML files in **target/surefire-reports** directory.	|
| Report Format                     | Yes      | Results file format	|
| Search Mode                       | Yes      | Specifies the test case lookup algorithm. <br/> **`Name`**: search for test case matching the name within the entire test suite. If test case found, update the test case. If test case not found, create a new test case within specified Test Case Path <br/> **`Path`**: search for test case matching the name within the specified Test Case Path. If test case found, update the test case. If test case not found, create a new test case within specified Test Case Path	|
| Test Case Path				                | Yes      | Path to where Railflow should upload test case definitions, must contain suite name in the beginning (for single-suite project, suite name is always 'Master'), e.g. Master/Section1/Section2 |
| Test Plan Name                    | No       | Name of a test plan in TestRail to which test results will be added |
| Test Run Name                     | No       | Name of a test run in TestRail to which test results will be added |
| Milestone Path                    | No       | Path to a milestone in TestRail to which test run/plan will be added.<br/>E.g. Milestone1/Milestone2 |
| Smart Test Failure Assignment     | No	    | A comma separated list of user emails for smart failure assignment. Each failed result will be assigned to a person from this list in a round robin fashion<br/>|
| Log Level                         | No       | Logging level for the plugin log file (.railflow.log) |
| Test Case Type                    | No       | Name of a case type in TestRail, e.g. `Automated` |
| Test Case Priority                | No       | Name of a case priority in TestRail, e.g. `High` |
| Test Case Template                | No       | Name of a TestRail template. If it is blank, `Test Case (Steps)` will be used. |
| Test Case Custom Fields           | No       |  Values for case fields in TestRail can be specified in this field. The format is [TestRail field label]=[value] and each field name\\value pair should start with the new line.<br/>E.g.:<br/>Custom Field One=foo<br/>Custom Field Two=bar |
| Test Result Custom Fields         | No       | Values for result fields in TestRail can be specified in this field. The format is [TestRail field label]=[value] and each field name\\value pair should start with the new line.<br/>E.g.:<br/>Custom Result Field One=foo<br/>Custom Result Field Two=bar |
| Configuration Names               | No       | A list of configuration names in TestRail. The format is [Config Group Name]/[Config Name]. Each entry must start with the new line.<br/>E.g.:<br/>Operating Systems/Linux<br/>Browsers/Chrome|
| Case Search Field                 | No       | The name of the case field in TestRail which will be using for searching for existing test cases instead of test case title |
| Upload Mode                       | No       | Test case upload mode: <br/><b>Create new test cases and do not overwrite existing ones:</b><br/> If test case not found, create a new test case within specified Test Case Path.<br/> If test case found, do not update the test case.<br/> <b>Create new cases and overwrite existing ones:</b><br/> If test case not found, create a new test case within specified Test Case Path.<br/> If test case found, update the test case.<br/> <b>Do not create new cases and overwrite existing ones:</b><br/> If test case not found, do not create a new test case and the corresponding test result will not be uploaded into TestRail.<br/> If test case found, update the test case.<br/> <b>Do not create new cases and do not overwrite existing ones:</b><br/> If test case not found, do not create a new test case and the corresponding test result will not be uploaded into TestRail.<br/> If test case found, do not update the test case.|
| Disable Grouping                  | No       | If checked, Railflow will ignore structure in report files and upload all test cases into one Section, defined by the Test Path parameter. |
| Close Run			             | No       | If checked, Railflow will close the test run in TestRail and archive its tests and results |
| Close Plan		                 | No       | If checked, Railflow will close the test plan in TestRail and archive its tests and results |
| Fully Qualified Test Name         | No       | If checked, Railflow will use fully qualified test names from the report files for test names in TestRail |

:::warning  TeamCity Behavior Alert
To ensure that test results are posted to TestRail even if the TeamCity build fails (very common), set `Execute step` field to `Even if some of the previous steps failed`. 

:::
![TeamCity plugin](/img/cicd/teamcity/teamcity-execute-step.png)




## NPM Package (option 2)
:::note NPM approach
If you cannot use TeamCity plugin for some reason, Railflow is also available as a [NPM command line tool](https://www.npmjs.com/package/railflow). You would install Railflow NPM package just like your would install any other NPM module. Railflow NPM package can be pre-installed on the TeamCity agent, or you can install it at run-time. 
:::

:::tip Railflow NodeJS requirement
Teamcity agents needs NodeJS v14.17.0 or higher.
:::

To integrate a TeamCity project with Railflow, simply follow these steps

1. Navigate to `Build Configuration` and then `Build Steps` under project settings

![TeamCity CLI](/img/cicd/teamcity/cli01.png)

![TeamCity CLI](/img/cicd/teamcity/cli02.png)

2. In this exampe, we are using a Maven project to run unit tests

![TeamCity CLI](/img/cicd/teamcity/cli03.png)

3. To integrate Railflow NPM, click on the `Add Build Step`, select `Command Line` for `Runner type`, specify `Step name`, select `Even if some of the previous steps failed` for `Execute step`.

4. Specify `npm install Railflow` for  `Custom Script` 
5. Save Build Step.

![TeamCity CLI](/img/cicd/teamcity/cli04.png)


6. Click on the `Add Build Step` button again to Add the step for performing Railflow to upload the test results.
   1. Select `Command Line` for `Runner type`.
   2. Fill in an appropriate name for `Step name`, such as `Export test resuls`.
   3. Select `Even if some of the previous steps failed` for `Execute step`.
   4. Refer to [`Getting Started`](/) chapter to fill in the execution script for `Custom Script`.
   5. Click on the `Save` button to save the settings.

![TeamCity CLI](/img/cicd/teamcity/cli05.png)

```jsx title="TeamCity Railflow CLI Example"
npx railflow -k %RAILFLOW_KEY% -url https://testrail.server.address/ -u %TESTRAIL_CREDS_USER% -p %TESTRAIL_CREDS_PASS% -pr \"Railflow Demo\" -path Master/section1/section2 -f junit -r target/surefire-reports/*.xml -sm path -tr TestRunDemo -tp TestPlanDemo -mp Milestone1/Milestone2
```

7. Click on the `Parameters` item in the left list, and the parameter setting page will be displayed in the right area.

![TeamCity CLI](/img/cicd/teamcity/cli06.png)

8. The page automatically displays parameters used in any `Custom Script`.
Specify the appropriate values for all parameters:
   1. `RAILFLOW_KEY` - the Railflow activation key.
   2. `TESTRAIL_CREDS_USER` - the TestRail username.
   3. `TESTRAIL_CREDS_PASS` - the password for the TestRail user.

9. When setting `RAILFLOW_KEY` and `TESTRAIL_CEDS_PASS`, click on the `Spec` - > `Edit...` on the Settings page,
 and then set `Type` as`Password` in the pop-up page.

![TeamCity CLI](/img/cicd/teamcity/cli07.png)
![TeamCity CLI](/img/cicd/teamcity/cli08.png)


## Docker Image (option 3)
:::tip Coming Soon 
Detailed instructions with sample TeamCity configuration coming soon.

In the meantime, feel free to use [Railflow CLI Docker Image](https://hub.docker.com/r/railflow/railflow) on your own.
:::


## TestRail Export Details
Railflow creates a very rich and flexible integration between TeamCity and TestRail. Based on Railflow configuration, TestRail entities can be created or updated automatically as part of your CICD process. The screenshots below shows the output of processing a typical JUnit test framework report. 

### Console output
![TeamCity plugin](/img/cicd/teamcity/teamcity-output.png)

### Automatic Test Creation  
![TeamCity plugin](/img/cicd/jenkins/plugin-exec-3.png)

### Automatic Test Plan and Runs
![TeamCity plugin](/img/cicd/jenkins/plugin-exec-4.png)
![TeamCity plugin](/img/cicd/jenkins/plugin-exec-5.png)

### Test Results Details
![TeamCity plugin](/img/cicd/jenkins/plugin-exec-6.png)

### Automatic Milestones
![TeamCity plugin](/img/cicd/jenkins/plugin-exec-7.png)

## Smart Failure Assignment
:::info
Smart Failure assignment is a very powerful feature of Railflow and allows teams to efficiently and strategically assign test failures to specified team members. Doing this automatically as part of the CI process means that teams don't waste valuable time during the test triage process. 
:::

:::note
To use Smart Failure Assignment feature, the users need to have `Global Role` under `Project Access`.
::: 

![TeamCity plugin](/img/cicd/jenkins/smart-failure-5.png)

### Example
:::tip
Smart Failure assignment is available in both the CLI and plugin approach.
:::

Consider a TeamCity Selenium Webdriver job build is failing with 5 test failures, and 2 users configured in the `Smart Test Failure Assignment` field.

![TeamCity plugin](/img/cicd/teamcity/teamcity-smart-failure.png)


### TeamCity Build Logs 
![TeamCity plugin](/img/cicd/jenkins/smart-failure-2.png)

### TestRail Results View
In this example above, Railflow's Smart Assignment feature filtered all the test failures and distributed them equally across the specified users. This nifty feature greatly eliminates the manual test triage process and saves teams valuable time.

![TeamCity plugin](/img/cicd/jenkins/smart-failure-3.png)

![TeamCity plugin](/img/cicd/jenkins/smart-failure-4.png)
