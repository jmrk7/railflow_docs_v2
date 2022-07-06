---
sidebar_position: 6
---

# Cypress

## Overview

:::info
[Railflow](https://railflow.io) provides an easy and convenient integration between [Cypress](https://www.cypress.io/) testing framework and [TestRail](https://www.gurock.com/testrail/).  
There are two ways of how Cypress results can be integrated with TestRail:
1. Using built-in `JUnit` reporter
2. Using custom [Railflow Cypress reporter](https://www.npmjs.com/package/railflow-cypress-junit-reporter)
:::

## Using built-in JUnit reporter
In case if you use the standard JUnit reporter, Cypress will produce JUnit XML files which can be uploaded into Railflow using either [Railflow CLI](docs/railflow-cli/cli-reference.md) or native [Jenkins](docs/cicd-apps/jenkins.md)/[TeamCity](docs/cicd-apps/teamcity.md) plugins.

## Using custom Railflow Cypress reporter
:::info
[Railflow Cypress reporter](https://www.npmjs.com/package/railflow-cypress-junit-reporter) is a custom reporter based on top of [Mocha JUnit Reporter](https://mochajs.org/). 

Reporter allows to do the following: 

* Map Cypress test cases into one or several test cases in TestRail by providing test case IDs.
* Attach screenshots to the test case results in TestRail.
* Provide values for TestRail custom case and result fields for individual test cases.

:::

### Installation

```shell
$ npm install railflow-cypress-junit-reporter --save-dev
```

or as a global module
```shell
$ npm install -g railflow-cypress-junit-reporter
```

### Usage    
Run cypress with `railflow-cypress-junit-reporter`:

Railflow reporter can be specified either in your configuration file (cypress.json by default) or via the command line.

#### Configuration file
```shell
{
"reporter": "railflow-cypress-junit-reporter",
 "reporterOptions": {
    "mochaFile": "cypress/results/test-results-[hash].xml"
  },
}
```

:::note
'mochaFile' is the path to the report file. When there are several test files run it will generate a report file for each test file, so in order to generate unique file names and not overwrite the existing ones, the `[hash]` is added to the name of the report file.
:::

#### Command line
```shell
cypress run --reporter railflow-cypress-junit-reporter
```

#### Adding TestRail-related data into report
TestRail-related data can be injected by adding `env.railflow` JSON object into test suite or test case object:

##### Test suite level

```shell
describe('My Tests',
    {
        env: {
            railflow: {
                title: 'Sample Test Suite',
                case_type: 'Automated',
                case_priority: 'High',
                case_fields: ['case field1=value1', 'case field2=value2'],
                result_fields: ['result field1=value1', 'result field2=value2'],                
                smart_failure_assignment: ['aaa@test.com', 'bbb@test.com']
            }
        },
    }, () => {
        it('Dummy test', () => {
            expect(true).to.equal(true);
        })
    })
```

##### Test level

```shell
describe('My Tests', () => {
    it('Dummy test',
        {
            env: {
                railflow: {
                    title: 'Sample Test Case',
                    case_type: 'Automated',
                    case_priority: 'High',
                    case_fields: ['case field1=value1', 'case field2=value2'],
                    result_fields: ['result field1=value1', 'result field2=value2'],                
                    smart_failure_assignment: ['aaa@test.com', 'bbb@test.com'],
                    testrail_ids: [1, 2, 3]
                }
            }
        }, () => {
            expect(true).to.equal(true)
        })
})

```

#### Railflow configuration parameters

Railflow provides the following configuration parameters

Parameter Name | Description |
------------| -------------|
title| Name of the test suite or test case|
case_type| One of the test case types defined in TestRail, e.g.: `Automated`, `Compatibility`|
case_priority| One of the case priority defined in TestRail, e.g.: `Critical`, `High`|
case_fields| An array of custom case field label/value pairs in `<field label>=<value>` form, e.g.: ['case field1=value1','case field2=value2']|
result_fields| An array of custom result field label/value pairs in `<field label>=<value>` form, e.g.: ['result field1=value1','result field2=value2']|
testrail_ids| An array of test case IDs in TestRail to add results to, e.g.: [1,2,3]
smart_failure_assignment| An array of TestRail user email IDS to automatically assign failed test cases to, e.g.: ['aaa@test.com','bbb@test.com']

#### Enabling automatic screenshot capturing for failed tests

To add screenshots into report XML file for failed tests automatically:  
1. Add Cypress hook into `<project_root>/cypress/support/index.js` file
2. Enable attachments in report configuration (`cypress.json` file)

```shell title="Adding Cypress hook"
Cypress.on('test:after:run', function (test, runnable) {
    if (test.state === "failed") {
        const screenshot = `${Cypress.config('screenshotsFolder')}/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;        
        if (!test.attachments) {
            test.attachments = [];
        }
        test.attachments.push(screenshot);
    }
});
```

```shell title="Enabling attachment in report configuration"
{
"reporter": "railflow-cypress-junit-reporter",
 "reporterOptions": {
    "attachments": true
  }
}
```


Paths to the screenshot files are added into `system-out` element of JUnit XML file, e.g.:
 
```shell
<system-out>[[ATTACHMENT|path/to/file]]</system-out>
```

To disable adding attachments to the report, the `attachments` property should be either set to `false` in the configuration file or completely removed from it:

```shell
{
"reporter": "railflow-cypress-junit-reporter",
 "reporterOptions": {
    "attachments": false
  }
}
```
 
or via command line:

```shell
cypress run --reporter railflow-cypress-junit-reporter \
  --reporter-options "attachments=false"
```

#### Disable adding skipped/pending tests in the report
By default, skipped tests are included in the test report. To disable adding skipped tests into the report `includePending` property should set to `false` in the configuration file:

```shell
{
"reporter": "railflow-cypress-junit-reporter",
 "reporterOptions": {
    "includePending": false
  }
}
```

or via command line:

```shell
cypress run --reporter railflow-cypress-junit-reporter \
  --reporter-options "includePending=false"
```

## Example
### Install the reporter

```shell
$ npm install railflow-cypress-junit-reporter --save-dev
```

2. Configure `railflow-cypress-junit-reporter` as the reporter and do other configurations as necessary. Configurations can be done in the cypress.json or in the command line.
Add this to cypress.json
```shell
{
"reporter": "railflow-cypress-junit-reporter",
 "reporterOptions": {
    "mochaFile": "cypress/results/test-results-[hash].xml"
  }
}
```

### Customize `index.js` to add screenshots into the report.

Add the code below into `<Cypress_project_root>/cypress/support/index.js` file

```shell
Cypress.on('test:after:run', function (test, runnable) {
    if (test.state === "failed") {
        const screenshot = `${Cypress.config('screenshotsFolder')}/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
        console.log(screenshot)
        if (!test.attachments) {
            test.attachments = [];
        }
        test.attachments.push(screenshot);
    }
});
```
### Add cypress test with TestRail-related elements

```javascript
context('Actions', {
    env: {
        railflow: {
            case_type: 'Railflow',
            case_priority: "Critical",
            case_fields: ["Required text field= Some value from cypress", "Estimate=10s"],
            result_fields: ['Custom field = Result from cypress'],
        }
    }
}, () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/actions')
    })

    it('.type() - type into a DOM element',
        {
            env: {
                railflow: {
                    title: 'Type something into a DOM element',
                    case_priority: "High",
                }
            }
        }, () => {
            cy.get('.action-email')
                .type('fake@email.com').should('have.value', 'fake@email.com')

                // .type() with special character sequences
                .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
                .type('{del}{selectall}{backspace}')

                // .type() with key modifiers
                .type('{alt}{option}') //these are equivalent
                .type('{ctrl}{control}') //these are equivalent
                .type('{meta}{command}{cmd}') //these are equivalent
                .type('{shift}')

                // Delay each keypress by 0.1 sec
                .type('slow.typing@email.com', {delay: 100})
                .should('have.value', 'slow.typing@emailq.com')

            cy.get('.action-disabled')
                // Ignore error checking prior to type
                // like whether the input is visible or disabled
                .type('disabled error checking', {force: true})
                .should('have.value', 'disabled error checking')
        })

    it('.type() - type something different into a DOM element', {
        env: {
            railflow: {
                testrail_ids: [1544]
            }
        }
    }, () => {
        cy.get('.action-email')
            .type('fake@email.com').should('have.value', 'fake@email.com')
    })
})
```
### Run tests and generate report

```shell
./node_modules/.bin/cypress run
```
   
### View report file

Report file generated in `<Cypress_project_root>/cypress/results` folder.

```shell title="test-results-d3cfa8ef6d5e550233a0e1d9f9bdfc07.xml"
<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Mocha Tests" time="13.0700" tests="2" failures="1">
  <testsuite name="Root Suite" timestamp="2022-07-05T15:19:46" tests="0" file="cypress/integration/actions.spec.js" time="0.0000" failures="0">
  </testsuite>
  <testsuite name="Actions" timestamp="2022-07-05T15:19:46" tests="2" time="13.0450" failures="0">
    <testcase name="Actions .type() - type into a DOM element" time="10.2920" classname=".type() - type into a DOM element">
      <system-out>[[ATTACHMENT|C:\work\Projects\cypress-demo\cypress\screenshots/actions.spec.js/Actions -- .type() - type into a DOM element (failed).png]]</system-out>
      <failure message="Timed out retrying after 6150ms: expected &apos;&lt;input#email1.form-control.action-email&gt;&apos; to have value &apos;slow.typing@emailq.com&apos;, but the value was &apos;slow.typing@email.com&apos;" type="AssertionError"><![CDATA[AssertionError: Timed out retrying after 6150ms: expected '<input#email1.form-control.action-email>' to have value 'slow.typing@emailq.com', but the value was 'slow.typing@email.com'
    at Context.eval (https://example.cypress.io/__cypress/tests?p=cypress\integration\actions.spec.js:129:8)]]></failure>
      <railflow>
        <title>Type something into a DOM element</title>
        <case_priority>High</case_priority>
      </railflow>
    </testcase>
    <testcase name="Actions .type() - type something different into a DOM element" time="0.6180" classname=".type() - type something different into a DOM element">
      <railflow>
        <testrail_id>1544</testrail_id>
      </railflow>
    </testcase>
    <railflow>
      <case_type>Railflow</case_type>
      <case_priority>Critical</case_priority>
      <smart_failure_assignment>
        <user>user1@company.net</user>
        <user>user2@company.net</user>
      </smart_failure_assignment>
      <case_fields>
        <field name="Required text field">Some value from cypress</field>
        <field name="Estimate">10s</field>
      </case_fields>
      <result_fields>
        <field name="Custom field">Result from cypress</field>
      </result_fields>
    </railflow>
  </testsuite>
</testsuites>
```
### Install Railflow CLI to the project

```shell
npm install railflow
```
   
### Run Railflow CLI and upload test results into TestRail

```shell
npx railflow --key ABCDE-12345-FGHIJ-67890 --url https://testrail.your-server.com/ --username testrail-username --password testrail-password --project "Railflow Demo" --test-path section1/section2 --format junit --report-files cypress/results/*.xml --search-mode path
```

Where:  

`key` - Railflow license key  
`url` - the URL of the TestRail server  
`username` - TestRail username  
`password` - TestRail user password  
`project` - name of the project in TestRail  
`test-path` - path to the subsection in TestRail where test cases will be exported to  
`format` - test report format - `junit`  
`report-files` - path to the report XML files  
`search-mode` - test case lookup algorithm

Please see [Railflow NPM documentation](https://docs.railflow.io/docs/railflow-cli/cli-reference) for the all the details about Railflow CLI options.

### View results in TestRail

#### Test run

![Test run in TestRail](/img/cypress/results-1.png "Test run in TestRail")

:::note
Note that one of the Cypress test cases is mapped to the existing test case in TestRail.
:::

#### Test result details

![Test result details in TestRail](/img/cypress/results-2.png "Test result details in Testrail")

:::note
Note that test case fields are populated with the values from the Cypress test cases, test case is assigned to some user and screenshot is attached.
:::
