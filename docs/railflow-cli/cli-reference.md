---
sidebar_position: 2
---

# CLI Reference
:::info
Railflow's Command Line Interface (CLI) is wrapper around the TestRail REST API and allows users to process a variety of testing framework reports from any CICD system and automatically export them to TestRail. The CLI provides a host of options so that you can display test reports per your needs.

:::

### Railflow CLI Requirements
1. [NodeJS](https://nodejs.org) - v14 or higher.
2. Enable TestRail API 

![TestRail site settings](/img/arch/site-settings-api.png)


### Installation
Railflow CLI is a npm based utility. Installing Railflow is as simple as installing any other npm package. 

```jsx title="Installing Railflow CLI"
$ npm install railflow
```


### CLI Command Reference
:::caution
Use double quotes for argument values with spaces. Example: --project "demo project"
:::

:::tip
Railflow CLI will automatically create tests, runs, plans, milestones, etc. if they do not exist. 
:::tip


| Key                        | Required                 | Description                                                                                                                                                 | Example                                                          |
|----------------------------| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |------------------------------------------------------------------|
| -v, --version              | No                       | Outputs Railflow version number                                                                                                                             | -v                                                               |
| -k, --key                  | -k or -l                 | (online activation) License key. Can be set with RAILFLOW_LICENSE environment variable                                                                      | -k XXXXX-XXXXX-XXXXX-XXXXX                                       |
| -l, --license-file         | -k or -l                 | (offline activation) File path or remote url license file                                                                                                   | -l /files/ActivationFile.skm                                     |
| -url, --url                | Yes                      | TestRail instance URL                                                                                                                                       | -url https://example.testrail.io                                 |
| -u, --username             | Yes                      | TestRail username. Can be set with RAILFLOW_TR_USER environment variable                                                                                    | -u test-username                                                 |
| -p, --password             | Yes                      | TestRail password or API Key. Can be set with RAILFLOW_TR_PASSWORD environment variable                                                                     | -p XtpHXiPLEODyhF                                                |
| -pr, --project             | Yes                      | TestRail project name                                                                                                                                       | -pr "example project"                                            |
| -path, --test-path         | Yes                      | TestRail test cases path                                                                                                                                    | -path "Section1/subsection2/ShoppingCart                         |
| -f, --format               | Yes                      | Report format: JUnit, TestNg, TestNg-Steps, Cucumber, NUnit, Allure, Robot, TRX (case insensitive)                                                          | -f junit                                                         |
| -r, --report-files         | Yes                      | The file path(s) to the test report file(s) generated during the build. User can pass multiple values separated with spaces. Ant-style patterns such as **\*\*/surefire-reports/\*.xml** can be used.<br/>E.g. use **target/surefire-reports/\*.xml** to capture all XML files in **target/surefire-reports** directory. | -r target/surefire-reports/\*.xml target/failsafe-reports/\*.xml |
| -sm, --search-mode         | Yes                      | Specifies the test case lookup algorithm. <br/> **`name:`** search for test case matching the name within the entire test suite. If test case found, update the test case. If test case not found, create a new test case within specified `-path` <br/> **`path:`** search for test case matching the name within the specified `-path`. If test case found, update the test case. If test case not found, create a new test case within specified `-path` | -sm path                                                         |
| -px, --proxy               | No                       | HTTP or SOCKS proxy configuration <br/> E.g. socks://username:password@127.0.0.1:1080                                                                       | -px socks://username:password@127.0.0.1:1080                     |
| -t, --timeout              | No                       | Upload timeout (seconds)                                                                                                                                    | -t 10                                                            |
| -tr, --test-run            | No                       | TestRail test run name                                                                                                                                      | -tr "Chrome Regression Run"                                      |
| -tp, --test-plan           | No                       | TestRail test plan Name                                                                                                                                     | -tp "Shopping Cart Test Plan"                                    |
| -mp, --milestone-path      | No                       | TestRail milestone path                                                                                                                                     | -mp Milestone1/Milestone2                                        |
| -cf, --case-fields         | No                       | TestRail test case custom fields. <br/> The format is ``[Field label]=[value]`` pairs, separated with space. <br/> E.g. "Case Field 1=value 1" "Case Field 2=value 2" ...            | -cf "Case Field 1=value 1" "Case Field 2=value 2"                |
| -rf, --result-fields       | No                       | TestRail test result custom fields. <br/> The format is ``[Field label]=[value]`` pairs, separated with space. <br/> E.g. "Result Field 1=value 1" "Result Field 2=value 2" ...     | -rf "Result Field 1=value 1" "Result Field 2=value 2"            |
| -a, --assign               | No                       | Smart Test Failure Assignment. Comma-separated list of TestRail users (email addresses). Railflow will assign failures based on a round robin algorithm.    | -a user1@email.com,user2@email.com                               |
| -af, --assign-file         | No                       | Smart Test Failure Assignment. File path containing list of TestRail users (email addresses). <br/>``Note: One user per line``                              | -af /assignees.txt                                               |
| -cn, --config-names        | No                       | TestRail test plan configuration options. <br/>Configuration format is: [config_group_name]/[config_name]. <br/> E.g. "Operating Systems/Linux" "Browsers/Chrome" ...                       | -cn "Operating Systems/Linux" "Browsers/Chrome"                  |
| -cr, --close-run           | No                       | If Railflow should close the corresponding run after uploading test results                                                                                 | -cr                                                              |
| -cp, --close-plan          | No                       | If Railflow should close the corresponding plan after uploading test results                                                                                | -cp                                                              |
| -dg, --disable-grouping    | No                       | If Railflow should ignore report structure and just upload all tests into a folder which is set by test-path parameter                                      | -dg                                                              |
| -tn, --template-name       | No                       | The name of a template to use in TestRail. If it is not set, 'Test Case (Steps)' or the default one will be used                                            | -tn "Test Case (Steps)"                                          |
| -cst, --case-type          | No                       | The name of a type for cases                                                                                                                                | -cst other                                                       |
| -csp, --case-priority      | No                       | The name of a priority for cases                                                                                                                            | -csp medium                                                      |
| -th, --thread-number       | No                       | The number of concurrent threads for exporting data. Default is 4                                                                                           | -th 8                                                            |
| -oc, --overwrite-cases     | No                       | If Railflow should overwrite matched existing test cases                                                                                                    | -oc                                                              |
| -ds, --disable-stats       | No                       | If Railflow should disable collecting usage and error logs                                                                                                  | -ds                                                              |
| -h, --help                 | No                       | Show the help information                                                                                                                                   | -h                                                               |



```jsx title="Railflow CLI Example"
npx railflow -k <license key> -url <testrail address> -u <username> -p <password> -pr <project name> -path <suite name>/<section name>/<subsection name> -f junit -r <report files pattern> -sm <search mode> -tp [test plan name] -mp [milestone path]
```


### Masking Sensitive Information   
:::tip
It is generally a good practice to use environment variables like `RAILFLOW_LICENSE`, `RAILFLOW_TR_USER` and `RAILFLOW_TR_PASSWORD` in your CICD application to make sensitive information.

::: 



## CLI Examples
### Export using license key
```jsx title="Railflow CLI Example"
npx railflow -k ABCDE-12345-FGHIJ-67890 -url https://testrail.your-server.com/ -u testrail-username -p testrail-password -pr "Railflow Demo" -path Master/section1/section2 -f junit -r target/surefire-reports/*.xml -sm path -tr TestRunDemo -tp TestPlanDemo -mp Milestone1/Milestone2 -cn Browsers/Firefox -af assignees.txt
```

### Export using license file
```jsx title="Railflow CLI Example"
npx railflow -l /home/user/ActivationFile20201020.skm -url https://testrail.your-server.com/ -u testrail-username -p testrail-password -pr "Railflow Demo" -path Master/section1/section2 -f junit -r target/surefire-reports/*.xml -sm path -tr TestRunDemo -tp TestPlanDemo -mp Milestone1/Milestone2 -cn Browsers/Firefox -af assignees.txt
```


### Viewing Results n TestRail

![TestRail Results](/img/cicd/testrail/02/testrail-results.png)

