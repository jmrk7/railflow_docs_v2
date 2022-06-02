---
sidebar_position: 1
---
# ReadyAPI

[SmartBear ReadyAPI](https://smartbear.com/product/ready-api/overview/) platforms provides a very powerful and flexible set of tools for testing your software.
[Railflow](https://railflow.io) provides native plugin for ReadyAPI which allows user to integrate ReadyAPI tests and test runs with [TestRail](https://www.gurock.com/testrail/) in a matter of few mouse clicks.

The plugin is compatible with the latest versions of ReadyAPI and TestRail.

## Installation

### Prerequisites

* Operating system suitable for running ReadyAPI
* TestRail version 5.3 or higher
* ReadyAPI 3.0 or higher

### TestRail Server configuration

TestRail API has to be enabled on TestRail server:

* Open TestRail web application and navigate to `Administration`  &#x2192  `Site Settings`  &#x2192  `API`
* Set `Enable API` checkbox to true
* Click on `Save Settings` button.

![img.png](/img/tools/readyapi/testrail-setup.png)

### Railflow plugin installation

* [Download](https://railflow.io/resources/downloads#readyapi) the latest version of the ReadyAPI plugin from our website.

#### Windows

* Run `Railflow_windows-x64_<version>.exe` installation file
* Follow instructions in the installer

#### Linux

* Copy `railflow-readyapi-plugin-<version>-distribution.jar` into `~/.soapui/plugins` directory
* Create `~/railflow` directory
* Copy Railflow offline activation file (the one with `.skm` extension) into `~/railflow` directory

#### MacOS

* Run `Railflow_macos_<version>.dmg`
* Follow instructions in the installer


## Project configuration

Railflow stores all its configuration in the ReadyAPI project file itself using custom field of a project, so there is no additional configuration files required - all configuration is done directly from ReadyAPI.

### Project initialization

To start using Railflow plugin, users need to initialize the project and add some Railflow-related TestRail project properties.  
To initialize the project:

* Right-click on the project
* Select `Railflow: (Un)initialize project` menu item
* Click `Yes` on the confirmation screen

![img.png](/img/tools/readyapi/initialize-1.png)
![img.png](/img/tools/readyapi/initialize-2.png)

After that, Railflow will add a set of custom properties into ReadyAPI project and suites:

![img.png](/img/tools/readyapi/initialize-3.png)

Those properties define TestRail connection details and behavior of the Railflow plugin.

### Project properties


| Name               | Description                                                                                                                                                           | Example                    | Required |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------- |
| TR_url             | TestRail server URL                                                                                                                                                   | `https://test.testrail.io`   | yes      |
| TR_project         | Name of a TestRail project                                                                                                                                            | `My Cool Project`            | yes      |
| TR_user            | TestRail user name                                                                                                                                                    | `user@myorg.io`              | yes      |
| TR_password        | TestRail user password/API key                                                                                                                                        | `password`                   | yes      |
| TR_section_path    | Path to a section in TestRail where test cases will be exported into.<br/>If the project contains multiple suites, the value must contain suite name in the beginning | `Shopping Cart/Scenario One` | yes      |
| TR_railflow_plugin | Enables or disables Railflow plugin                                                                                                                                   | `enabled`/`disabled`       | yes      |
| TR_plan_name | Name of a test plan in TestRail to which test results will be added. If plan does not exist, it will be created | `My cool plan` | no |
| TR_run_name | Name of a test run in TestRail to which test results will be added. If run does not exist, it will be created | `My cool run` | no |
| TR_milestone | Path to a milestone in TestRail to which test run/plan will be added. If milestone does not exist, it will be created | `Milestone 1/Milestone 2` | no |
| TR_case_type | Name of a case type in TestRail | `Automated` | no |
| TR_case_priority | Name of a case priority in TestRail | `High` | no |
| TR_template_name | Name of a TestRail template. If it is blank, Test Case (Steps) will be used | `Cool template` | no |
| TR_upload_attachments | If `enabled`, Railflow captures HTTP/SOAP request and response and attaches it to a result in TestRail. Valid values: enabled and disabled | `enabled`/`disabled` | no |

The following custom properties can be overridden on Test Suite level:

* TR_section_path
* TR_plan_name
* TR_run_name
* TR_milestone
* TR_case_type
* TR_case_priority
* TR_template_name

### Configure values for custom fields
TestRail provides a highly customizable environment where users can create various custom test case and test result fields and Railflow has convenient wizard for setting values for those fields.  
To configure custom fields, just right-click on the project and select `Railflow: Configure Custom Fields`:  

![img.png](/img/tools/readyapi/custom-fields-1.png)

The wizard contains two tabs: `Test Case` and `Test Result` for defining values for the corresponding fields:

![img.png](/img/tools/readyapi/custom-fields-2.png)

![img.png](/img/tools/readyapi/custom-fields-3.png)

The wizard has the following columns:
* **TestRail Field Label** - the label of the field in TestRail
* **ReadyAPI Field** - the name of the test case field which contains value for the corresponding TestRail field
* **Default value** - default value

Railflow stores values for custom fields in the custom properties of a test case, e.g.:

![img.png](/img/tools/readyapi/custom-fields-4.png)

Initially, those fields contain values from the `Default value` column of the configuration wizard.  
If users want to change the value for a particular test case, they just need to change the corresponding test case custom property value.

## Exporting ReadyAPI test cases into TestRail
Before exporting test results into TestRail, test cases should be exported. 
To export test case, test suite or the whole project, just right-click on the corresponding object (test case/test suite/project) and select `Railflow: Export to TestRail`

![img.png](/img/tools/readyapi/export-1.png)

Railflow exports your test cases into TestRail and creates required sections there as well: 

![img.png](/img/tools/readyapi/export-2.png)

Exported test cases in TestRail:

![img.png](/img/tools/readyapi/export-3.png)

![img.png](/img/tools/readyapi/export-4.png)

:::info
If you need to adjust values of custom fields or information about test steps, please re-export the test case again. 
:::

## Updating the license file

To update the license file, just put the new file into `~/railflow` folder (e.g. `C:\Users\user\railflow` on Windows or `/home/user/railflow` on Unix) on the machine where Railflow plugin is installed.

## Exporting test results into TestRail
Railflow exports test results into TestRail automatically when user runs test case, suite or project:

Note that Railflow prints the URL for the created/updated test run in TestRail:

![img.png](/img/tools/readyapi/results-1.png)

Railflow also creates a new run in TestRail (if `TR_run_name` is empty) or adds a new result into existing run:

![img.png](/img/tools/readyapi/results-2.png)

And attaches HTTP/SOAP request and response to the result as well as assertion statuses:

![img.png](/img/tools/readyapi/results-3.png)

Attaching request and response can be disabled by setting `TR_upload_attachments` to `disabled`.


## Integrating Railflow ReadyAPI plugin with CI tools
Usually there are two ways of running ReadyAPI tests from a CI system:
* Using [ReadyAPI TestRunner](https://support.smartbear.com/readyapi/docs/functional/running/automating/index.html) 
* Using [SmartBear TestEngine](https://smartbear.com/product/ready-api/testengine/overview/)

In general, you need to make Railflow plugin JAR file and license file be available for ReadyAPI on the CI agent where the build is running:

### ReadyAPI TestRunner
TestRunner is a shell/batch script which starts ReadyAPI and feeds your project to it.
In order to make Railflow plugin work with that, please follow the steps below:
* Download `railflow-readyapi-plugin-<version>.jar` from [Railflow website](https://railflow.io/resources/downloads#readyapi)
* Put this JAR file into `~/.soapui/plugins` folder (e.g. `C:\Users\user\.soapui\plugins` on Windows or `/home/user/.soapui/plugins` on Unix) on the CI machine or in your Docker image
* Create a new `~/railflow` directory
* Copy your Railflow license file into `~/railflow` directory

After that, Railflow will export your test results automatically into TestRail.

:::info
You can change the behavior of Railflow plugin by providing values to `TR_` custom project fields via [TestRunner Command-Line Arguments](https://support.smartbear.com/readyapi/docs/functional/running/automating/cli.html).  
E.g. to disable Railflow functionality just pass `-PTR_railflow_plugin=disabled` value.
:::

### SmartBear TestEngine server
When TestEngine server is installed on the CI agent, follow the steps below to install Railflow:

* Download `railflow-readyapi-plugin-<version>.jar` from [Railflow website](https://railflow.io/resources/downloads#readyapi)
* Put this JAR file into `~/.soapui/plugins` folder (e.g. `C:\Users\user\.soapui\plugins` on Windows or `/home/user/.soapui/plugins` on Unix) on the CI machine or in your Docker image
* Create a new `~/railflow` directory
* Copy your Railflow license file into `~/railflow` directory
* Restart TestEngine server

### SmartBear TestEngine Docker Container
To install Railflow plugin to TestEngine docker container, you need to put Railflow plugin JAR file and Railflow license into TestEngine container, to do so please follow the steps below:

* Download `railflow-readyapi-plugin-<version>.jar` from [Railflow website](https://railflow.io/resources/downloads#readyapi)
* Copy/mount this JAR file into `/data/.soapui/plugins` folder of TestEngine container
* Copy/mount Railflow license file into `/data/railflow` directory of TestEngine container
* Restart TestEngine container if you copied files into running container

### Re-exporting test cases into TestRail from headless environments
Sometimes it may be necessary to re-export your test case definitions into TestRail in order to e.g. reflect changes in test steps or in test case names.  
When using ReadyAPI GUI this is just a matter of clicking on the required test case and exporting it, but it's not the case when using headless tools for running ReadyAPI tests like `testrunner` or `testengine`.  
Railflow provides a special `TR_update_cases` custom project property to allow users to re-export their test cases using headless runners.  
The `TR_update_cases` property has two possible values:  
* **enabled** - Railflow will re-export test cases before exporting test results into TestRail. This affects only test cases that are part of the current run.
* **all** - Railflow will *not* run test cases, but re-export the whole project and then stops the execution. It produces the same result as if user right-clicked the whole project and chose `Railflow: Export to TestRail` menu-item in ReadyAPI GUI.

Example of passing the `TR_update_cases` value into `testrunner`:

```shell
testrunner.sh -P "TR_update_cases=enabled" your-project.xml
```