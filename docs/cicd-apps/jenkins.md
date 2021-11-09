---
sidebar_position: 2
---

# Jenkins

## Jenkins and Testing Results
>Jenkins is one of the most popular CI applications and is used by thousands of companies all over the world. Jenkins is used to define the application build and test processes. QA teams also use Jenkins to run/schedule functional tests across a variety of tools and frameworks. However, the results of these tests can only be viewed in Jenkins, and it is not really possible to aggregate results across multiple jobs, retain long history, and delegate test failures to your team.  


## TestRail + Jenkins + Railflow 
>By using Railflow, you can easily integrate Jenkins testing jobs with TestRail and automatically export all testing reports to TestRail. Aggregating result from all your Jenkins jobs into TestRail allows teams to look at test trends, auto-assign failures via Railflow automation, create link between Jenkins and TestRail, and much more. 


## Simple and Flexible Setup
>Railflow can be used within Jenkins in a variety of ways. 
* Railflow Jenkins Plugin
* Railflow NPM Package
* Docker Image using the Railflow NPM package


## Jenkins Plugin (option 1)
>Railflow Jenkins plugin is a typical Jenkins plugin. However, because Railflow is a commercial product, the plugin is not available in the Jenkins plugin directory but can be downloaded from our Downloads page.

### Installation

1. Download [Railflow Jenkins Plugin](https://railflow.io/resources/downloads)
2. Upload the plugin via `Manage Jenkins` &#x2192 `Manage Plugins` &#x2192 `Advanced` &#x2192 `Upload Plugin`
    ![Jenkins plugin installation](/img/cicd/jenkins/jenkins-plugin-upload.png)
3. Upload and restart Jenkins for the plugin to take effect. 

### Configuration
To configure plugin, navigate to `Manage Jenkins` &#x2192 `Configure System` page of the Jenkins UI and scroll down to the `Railflow Global Settings` section:
    ![Jenkins plugin config](/img/cicd/jenkins/jenkins-plugin-config.png)


### Licensing 
>Railflow provides two license activation models. If your network allows outbound call to our api endpoint: `https://api.railflow.io`, then option 1: `License Key (online activation) ` will work. If you are unable to reach our api endpoint, pick option 2: `License File (offline activation)`.

1. **License Key** (online activation): Select `License Key` option and copy/paste the license key from your email and click `Activate License`
![Jenkins plugin online activation](/img/cicd/jenkins/online-activation.png)

2. **License File** (offline activation): If your Jenkins instance does not have outbound internet access, you may use this option to upload the license activation from your email. The license file has a .skm extension.
![Jenkins plugin offline activation](/img/cicd/jenkins/offline-license-activation.png)

### TestRail Configuration
Railflow plugin configuration section allows you to centrally defined one or multiple TestRail servers. Once configured, they can be easily referenced in the Jenkins jobs. 
[Jenkins plugin config](/img/cicd/jenkins/plugin04.png)


### Freestyle Job Configuration
>Once the plugin has been configured, you can easily configure any Jenkins job that is running any testing tool/framework. If you are using the UI based plugin approach for your jobs, simple follow these steps

1. Add and configure the Railflow post-build action: `Railflow Plugin: TestRail Test Results Processor`. This post-build action allows you to specify your test framework, test results location, and other TestRail configurations.
![Jenkins plugin](/img/cicd/jenkins/plugin-job-1.png)

A few additional configuration fields can be accessed under `Advanced`
![Jenkins plugin](/img/cicd/jenkins/plugin-job-3.png)


### Jenkinsfile Job Configuration
>If you are using a Jenkinsfile instead of the plugin UI (example above), you can easily reference any of the Railflow functions in the Jenkinsfile and make it part of your CICD process.

Here is an end-to-end example of a Jenkinsfile for building a JUnit test project and then using Railflow for processing the junit test results.


```jsx title="Jenkins Pipeline Example"
pipeline {
    agent {
        label "linux"
    }
    stages {
       stage('Build') {
          steps {
             echo '********BUILD STEP**********'
             git branch: 'master', credentialsId: '*****', url: 'https://...junit-demo.git'
             sh 'mvn test'
          }
       }
    }
    post {
     always {
     echo '********UPLOAD RESULT INTO TESTRAIL**********'

    railflow(
        testRailServerName: 'TestRail',
        testRailProjectName: 'Railflow Demo',
        failIfUploadFailed: true,
        jobConfigurations: [[configurationNames: '''OS/Linux
            Browser/Chrome''', 
        milestonePath: 'M1/M2', 
        resultFilePattern: '**/surefire-reports/*.xml',
        testCaseCustomFields: '''Required text field=Hello from Jenkins
            estimate=30s''', 
        testCasePath: 'Railflow/Website', 
        testCasePriority: 'High', 
        testCaseType: 'Automated', 
        testPlanName: 'Test plan', 
        testReportFormat: 'JUNIT', 
        testResultCustomFields: '''Custom field=Results from Jenkins
            version=2.0''', 
        testRunName: '${JOB_NAME}-${BUILD_NUMBER}']])
      }
    }
}
```


### Post-Build Action Reference
>The post-build action provides a host of options to allow users to set up the Jenkins integration per their needs. The reference describes all the options and their usage.
>You can also add multiple configurations by using the `Add More` button. 


| Field Name                       | Required | Description                                                                                                                                                                                                                                                                                                                                                                                       |
|----------------------------------|----------|-------------|
| TestRail Server 	               | Yes	| Select one of the server names configured in "Global settings configuration"	|
| TestRail Project                 | Yes   | The name of a project in TestRail to which results should be exported			|
| Fail build if upload unsuccessful| N/A      | If checked, the build will be marked as failed if for any reason the plugin could not upload the results. This could be due to Railflow issues, TestRail server issues, network issues, etc.	|
| Override TestRail Credentials	   | No	| If specified, it overrides TestRail user credentials defined in Global Configuration	|
| Results File Pattern   | Yes      | The file path to the test report file(s) generated during the build. Ant-style patterns such as **\*\*/surefire-reports/\*.xml** can be used.<br/>E.g. use **target/surefire-reports/*.xml** to capture all XML files in **target/surefire-reports** directory.	|
| Report Format            | Yes      | Results file format	|
| Test Case Path				   | Yes | Path to where Railflow should upload test case definitions, must contain suite name in the beginning (for single-suite project, suite name is always 'Master'), e.g. Master/Section1/Section2 |
| Test Plan Name     | No       | Name of a test plan in TestRail to which test results will be added |
| Test Run Name     | No       | Name of a test run in TestRail to which test results will be added |
| Milestone Path      | No       | Path to a milestone in TestRail to which test run/plan will be added.<br/>E.g. Milestone1/Milestone2 |
| Smart Test Failure Assignment  |	No	| A comma separated list of user emails for smart failure assignment. Each failed result will be assigned to a person from this list in a round robin fashion<br/>|
| Log Level | No | Logging level for the plugin log file (.railflow.log) |

| Advanced Field Name | Description                                                                                                                                                                                                                                                                                                                                                                                       |
|---------------------|--------------------------------------------------------------------------------------------|
| Test Case Type            | Name of a case type in TestRail, e.g. `Automated` |
| Test Case Priority        | Name of a case priority in TestRail, e.g. `High` |
| Test Case Template        | Name of a TestRail template. If it is blank, `Test Case (Steps)` will be used. |
| Test Case Custom Fields   |  Values for case fields in TestRail can be specified in this field. The format is [TestRail field label]=[value] and each field name\\value pair should start with the new line.<br/>E.g.:<br/>Custom Field One=foo<br/>Custom Field Two=bar |
| Test Result Custom Fields | Values for result fields in TestRail can be specified in this field. The format is [TestRail field label]=[value] and each field name\\value pair should start with the new line.<br/>E.g.:<br/>Custom Result Field One=foo<br/>Custom Result Field Two=bar |
| Configuration Names       | A list of configuration names in TestRail. The format is [Config Group Name]/[Config Name]. Each entry must start with the new line.<br/>E.g.:<br/>Operating Systems/Linux<br/>Browsers/Chrome|
| Test case  to ID map      | A list of test name to TestRail ID mappings. Each line contains a mapping between fully-qualified test case name and TestRail ID.<br/>E.g.: io.railflow.Test.method1=42<br/>io.railflow.Test.method2=43|
| Disable Grouping	        | If checked, Railflow will ignore structure in report files and upload all test cases into one Section, defined by the Test Path parameter. |
| Close Run			        | If checked, Railflow will close the test run in TestRail and archive its tests and results |
| Close Plan		        | If checked, Railflow will close the test plan in TestRail and archive its tests and results |


### TestRail Export Details
>Railflow creates a very rich and flexible integration between Jenkins and TestRail. Based on Railflow configuration, TestRail entities can be created or updated automatically as part of your CICD process. The screenshots below shows the output of processing a typical JUnit test framework report. 

**Jenkins console output:**  
![Jenkins plugin](/img/cicd/jenkins/plugin-exec-1.png)

**Automatic Test Creation:** 
![Jenkins plugin](/img/cicd/jenkins/plugin-exec-3.png) 

**Automatic Test Plan and Runs:**
![Jenkins plugin](/img/cicd/jenkins/plugin-exec-4.png)
![Jenkins plugin](/img/cicd/jenkins/plugin-exec-5.png)


**Test Results Details:**
![Jenkins plugin](/img/cicd/jenkins/plugin-exec-6.png)

**Automatic Milestones:**
![Jenkins plugin](/img/cicd/jenkins/plugin-exec-7.png)

### Smart Failure Assignment
>Smart Failure assignment is a very powerful feature of Railflow and allows teams to efficiently and strategically assign test failures to specified team members. Doing this automatically as part of the CI process means that teams don't waste valuable time during the test triage process. 


>To use Smart Failure Assignment feature, the users need to have `Global Role` under `Project Access`. 
![Jenkins plugin](/img/cicd/jenkins/smart-failure-5.png)

**Example**<br/>
Consider a Jenkins Selenium Webdriver job build is failing with 5 test failures, and 2 user configured in the `Smart Test Failure Assignment` field.

![Jenkins plugin](/img/cicd/jenkins/smart-failure-1.png)

**Smart Assignment - Jenkins Build Logs **<br/>
![Jenkins plugin](/img/cicd/jenkins/smart-failure-2.png)

**Smart Assignment - TestRail Results View**<br/>
In this example above, Railflow's Smart Assignment feature filtered all the test failures and distributed them equally across the specified users. This nifty feature greatly eliminates the manual test triage process and saves teams valuable time.

![Jenkins plugin](/img/cicd/jenkins/smart-failure-3.png)
![Jenkins plugin](/img/cicd/jenkins/smart-failure-4.png)


## NPM Package (option 2)
>If you cannot use Jenkins plugin for some reason, Railflow is also available as a NPM command line tool. You would install Railflow NPM package just like your would install any other NPM module. Railflow NPM package can be pre-installed on the Jenkins agent, or you can install it at run-time. 


### Jenkins pipelines
You can run railflow in [Jenkins](https://jenkins.io/) pipeline by the following steps:<br/>

1. From the Jenkins home page (i.e. the Dashboard of the Jenkins classic UI), click `New Item` in the top left corner to create a new Project in Jenkins.
![Jenkins CLI](/img/cicd/jenkins/cli01.png)

2. In the `Enter an item name` field, specify the name for your new project, select the `Pipeline` type and click the `OK` button.
![Jenkins CLI](/img/cicd/jenkins/cli02.png)


3. Add the pipeline script in the `Script` textarea of the `Pipeline` section and click the `Save` button. See an example below:
![Jenkins CLI](/img/cicd/jenkins/cli03.png)


```jsx title="Jenkinsfile Example"
pipeline {
    agent any
    environment {
        RAILFLOW_KEY = credentials('railflow-key')
        TESTRAIL_CREDS = credentials('testrail-creds')
    }
    tools {
        jdk 'default'
        maven 'default'
        nodejs 'default'
    }
    stages {
        stage('Checkout'){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/development']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'git-creds', url: 'https://gitrepo.com/workspace/project.git']]])
            }
        }
        stage('Run unit tests') {
            steps {
                sh 'mvn clean test'
            }
        }
    }
    post{
        always{
            echo "Begin exporting to TestRail"
            sh "npm install railflow"
            sh "npx railflow -k ${RAILFLOW_KEY} -url https://testrail_server/ -u ${TESTRAIL_CREDS_USR} -p ${TESTRAIL_CREDS_PSW} -pr \\\"Railflow Demo\\\" -path Master/section1/section2 -f junit -r target/surefire-reports/*.xml -tp TestPlan12345 -tr TestRunDemo -tp TestPlanDemo -mp Milestone1/Milestone2 -cf \\\"Required text field=123\\\""
        }
    }
}
```

### Console Output
![Jenkins CLI](/img/cicd/jenkins/cli15.png)

4. Alternatively, you can use `Pipeline script from SCM` option if your Jenkinsfile is stored in SCM.
![Jenkins CLI](/img/cicd/jenkins/cli04.png)


5. Depending on the SCM type, set all required connection parameters, select branch name and set a path to the pipeline script file (Jenkinsfile). When everything is set, click on `Save` button.

![Jenkins CLI](/img/cicd/jenkins/cli05.png)

In such a case, your Jenkinsfile should not contain a `Checkout` stage, as Jenkins will do the checkout automatically according to the settings above <br/>

### Post-build shell script
It is also possible to export test results with Railflow in a post-build shell script by following steps below:
1. Install [NodeJS](https://nodejs.org) on the Jenkins server.
2. Install [PostBuildScript](https://plugins.jenkins.io/postbuildscript/) plugin for Jenkins and restart Jenkins to make the plugin work.
![Jenkins CLI](/img/cicd/jenkins/cli06.png)


3. From the Jenkins home page (i.e. the Dashboard of the Jenkins classic UI), click `New Item` in the top left corner to create a new Project in Jenkins.
![Jenkins CLI](/img/cicd/jenkins/cli01.png)

4. Specify the name for a new project in the `Enter an item name` field, select the `Freestyle project` type and click the `OK` button.
![Jenkins CLI](/img/cicd/jenkins/cli07.png)

5. Select appropriate SCM system (e.g. Git) and fill out the required fields.
![Jenkins CLI](/img/cicd/jenkins/cli08.png)


6. Select `User secret text(s) or file(s)` checkbox in the `Build Environment` section and add variables for storing your credentials or user/password pair. For example, `RAILFLOW_KEY`, `TESTRAIL_CREDS_USR` and `TESTRAIL_CREDS_PSW` are in the image below. These environment variables can be used in the script.
![Jenkins CLI](/img/cicd/jenkins/cli09.png)


7. Click the `Add build step` button to add the build operations you want. For example, select `Invoke top-level Maven targets` to run maven goals.
![Jenkins CLI](/img/cicd/jenkins/cli10.png)

8. In the `Post-build Actions` tab, click the `Add post-build action` button, then click `Execute script` in the pop-up menu.
![Jenkins CLI](/img/cicd/jenkins/cli11.png)


9. Click the `Add post build step` button.
![Jenkins CLI](/img/cicd/jenkins/cli12.png)


10. Select `FAILURE` for `If build was`. Click the `Add build Step` button, and then select appropriate shell script from the pop-up menu. For example, select `Execute windows batch command` if you are running Jenkins on Windows OS.
![Jenkins CLI](/img/cicd/jenkins/cli13.png)


11. Add your shell script into the `Command` textarea and click the `Save` button.
![Jenkins CLI](/img/cicd/jenkins/cli14.png)


```jsx title="Jenkins Railflow CLI Example"
call npm install railflow
call npx railflow -k %RAILFLOW_KEY% -url https://testrail.railflow.io/ -u %TESTRAIL_CREDS_USR% -p %TESTRAIL_CREDS_PSW% -pr \"JUnit Demo\" -path Master/section1/section2 -f junit -r target/surefire-reports/*.xml -tr TestRunDemo -tp TestPlanDemo -mp Milestone1/Milestone2
```
