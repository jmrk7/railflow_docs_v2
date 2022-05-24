---
sidebar_position: 3
---

# MSTest

## Overview
:::info
[Railflow](https://railflow.io) MSTest reporter plugin is a part of the Railflow platform which allows users to easily integrate their MSTest test results with TestRail using Railflow MSTest attributes.
:::

## How does Railflow MSTest Reporter Plugin work?
:::info
MSTest like all other test frameworks produces XML test reports and Railflow CI Plugins and [NPM CLI](https://www.npmjs.com/package/railflow) can process this reports file and upload results into TestRail. For most users, this would be sufficient. For users that have a need to map MSTest tests to tests in TestRail or want to customize custom fields values, they would need to use the Railflow MSTest Reporter. 
The MSTest Reporter plugin provides the following features:
- Mapping MSTest tests into one or several test cases in TestRail by providing test case IDs.
- Provide values for TestRail custom case and result fields for individual test cases.
:::


## Requirements
- MSTest 2.2.8 or greater

## Installation
Railflow MSTest plugin is available to install as a NuGet package.

```shell
Install-Package Railflow.MSTest.TestRail.Reporter
```

## Railflow Plugin Usage
Apply custom attributes to test methods/classes to mark them with TestRail metadata.

### Railflow configuration attributes description

Attribute Name | Description |
------------| -------------|
Title| Name of the test suite or test case|
CaseType| Case type in TestRail, <br/>`e.g.: Automated, Compatibility, etc...`|
CasePriority| Case type in TestRail, <br/> `e.g.: Critical, High, etc...`|
CaseFields| Values for custom case fields in TestRail,  <br/>` e.g.: ['field1=value1','field2=value2']`|
ResultFields| Values for result fields in TestRail,  <br/>`e.g.: ['field1=value1','field2=value2']`|
JiraIds| Jira IDs.These values will be populated as a case field 'refs'. Should input as an array of strings,  <br/>`e.g.: ['jid1','jid2']`
TestRailIds| IDs of test cases in TestRail. Should input as an array of integers,  <br/>`e.g.: [1,2,3]`
SmartAssignment| Array of TestRail users to automatically assign failed test cases. Should input as a string array,  <br/>`e.g.: ['user1@domain.com','user2@domain.com']`

These attributes can be either used in class level or method level.

### Method Level Attributes
MSTest `method level attributes` are used to map MSTest tests to existing tests in TestRail. Method level attributes override class level attributes.
Method level attributes defined within `RailflowTestMethod`.

  | Method level attributes |
  |-------------------------- |
  |  JiraIds  |
  |  CaseFields  |
  |  ResultFields  |
  |  TestRailIds  |
  |  CaseType   |
  |  CasePriority  |
  |  Title  |
```jsx title="MSTest method level attributes" 

public class RailflowAttributesExample
{
      [RailflowTestMethod(Title = "railflow-method-title", CaseFields = new[] {"Estimate=1s", "Automation Type=1" })]
      public void TestMethod1()
      {
      }
    
      [RailflowTestMethod(TestRailIds = new[] { 1, 2, 3 })]
      public void TestMethod2()
      {
      }
    
      [TestMethod]
      public void TestMethod3()
      {
      }
}

```

### Class Level Attributes
MSTest `class level attributes` are applied to `all` the methods within the class. If a test class contains both class level and method level attributes, the `method level attributes take precedence and will override the class level attributes`.
Method level attributes defined within `RailflowTestClass`.

| Class level attributes |
  |-------------------------- |
|  CaseFields  |
|  ResultFields  |
|  CaseType  |
|  CasePriority  |
|  SmartAssignment   |
|  Title  |
  ```jsx title="MSTest class level attributes"

[RailflowTestClass(Title = "class-title", CaseFields = new[] { "Milestone=1.0", "Estimate=2s" }, ResultFields = new[] { "Version=2.8"}, SmartAssignment=new[]{"user1@abc.com, user2@abc.com"})]
public class RailflowAttributesExample
{
    public void TestMethod1()
    {
    }
    
    public void TestMethod2()
    {
    }
    
    [TestMethod]
    public void TestMethod3()
    {
    }
}
```

### Running Tests
Run your MSTests tests normally with [dotnet CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test).

```shell
dotnet test --logger "trx;LogFileName=TestResults.xml"
```

### View Report

```jsx title="TestResults.xml"
<Results>
  <UnitTestResult executionId="50bbf10e-a17a-4f1b-8b7c-17b0b5cd19cf" testId="c8d8d5cf-88cd-436d-ab4b-014f3e992cdc" testName="TestMethod3" computerName="tharaka-VirtualBox" duration="00:00:00.0000490" startTime="2022-05-19T16:05:16.5905056+05:30" endTime="2022-05-19T16:05:16.5907140+05:30" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="50bbf10e-a17a-4f1b-8b7c-17b0b5cd19cf">
    <Output>
      <StdOut>railflow-markers:{"ClassMarkers":{"Title":"class-title","ResultFields":["Version=2.8"],"CaseFields":["Milestone=1.0","Estimate=2s"],"SmartAssignment":["user1@abc.com, user2@abc.com"]},"MethodMarkers":{}}</StdOut>
    </Output>
  </UnitTestResult>
  <UnitTestResult executionId="f6cf6b17-a725-4479-8b33-b93ed1359a73" testId="18d377a3-8e25-4532-bac6-e2f0792400d5" testName="TestMethod2" computerName="tharaka-VirtualBox" duration="00:00:00.0000411" startTime="2022-05-19T16:05:16.5902485+05:30" endTime="2022-05-19T16:05:16.5904736+05:30" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="f6cf6b17-a725-4479-8b33-b93ed1359a73">
    <Output>
      <StdOut>railflow-markers:{"ClassMarkers":{"Title":"class-title","ResultFields":["Version=2.8"],"CaseFields":["Milestone=1.0","Estimate=2s"],"SmartAssignment":["user1@abc.com, user2@abc.com"]},"MethodMarkers":{"TestRailIds":[1,2,3]}}</StdOut>
    </Output>
  </UnitTestResult>
  <UnitTestResult executionId="703c70ab-b971-4d90-b8a0-9623363c72be" testId="db4248cc-85fb-4bde-bc91-b2a0803cad25" testName="TestMethod1" computerName="tharaka-VirtualBox" duration="00:00:00.0020291" startTime="2022-05-19T16:05:16.5676436+05:30" endTime="2022-05-19T16:05:16.5851423+05:30" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="703c70ab-b971-4d90-b8a0-9623363c72be">
    <Output>
      <StdOut>railflow-markers:{"ClassMarkers":{"Title":"class-title","ResultFields":["Version=2.8"],"CaseFields":["Milestone=1.0","Estimate=2s"],"SmartAssignment":["user1@abc.com, user2@abc.com"]},"MethodMarkers":{"Title":"railflow-method-title","CaseFields":["Estimate=1s","Automation Type=1"]}}</StdOut>
    </Output>
  </UnitTestResult>
</Results>
```

### Running Examples

1. Install `railflow-mstest` reporter.

```shell
$ Install-Package Railflow.MSTest.TestRail.Reporter
```

2. Add MTest test with Railflow attributes in class level and method level.


```jsx title="RailflowAttributesExample.cs"
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Railflow.MSTest.TestRail.Reporter.Example
{
     [RailflowTestClass(Title = "class-title", CaseFields = new[] { "Milestone=1.0", "Estimate=2s" }, ResultFields = new[] { "Version=2.8"}, SmartAssignment=new[]{"user1@abc.com, user2@abc.com"})]
     public class RailflowAttributesExample
     {
          [RailflowTestMethod(Title = "railflow-method-title", CaseFields = new[] {"Estimate=1s", "Automation Type=1" })]
          public void TestMethod1()
          {
          }
        
          [RailflowTestMethod(TestRailIds = new[] { 1, 2, 3 })]
          public void TestMethod2()
          {
          }
        
          [TestMethod]
          public void TestMethod3()
          {
          }
     }
}
```
3. Run tests and generate report

```shell
dotnet test --logger "trx;LogFileName=TestResults.xml"
```

4. View report file

Report file generated at the same directory where the test executed.

TestResults.xml
```shell
<?xml version="1.0" encoding="utf-8"?>
<TestRun id="b3ff34dc-780c-4e2c-9720-86cbf4ce20fc" name="@tharaka-VirtualBox 2022-05-19 16:05:16" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010">
  <Times creation="2022-05-19T16:05:16.7087257+05:30" queuing="2022-05-19T16:05:16.7087258+05:30" start="2022-05-19T16:05:16.0719394+05:30" finish="2022-05-19T16:05:16.7160226+05:30" />
  <TestSettings name="default" id="7906a8b7-3e84-442b-b3fc-f228b284a8a2">
    <Deployment runDeploymentRoot="_tharaka-VirtualBox_2022-05-19_16_05_16" />
  </TestSettings>
  <Results>
    <UnitTestResult executionId="50bbf10e-a17a-4f1b-8b7c-17b0b5cd19cf" testId="c8d8d5cf-88cd-436d-ab4b-014f3e992cdc" testName="TestMethod3" computerName="tharaka-VirtualBox" duration="00:00:00.0000490" startTime="2022-05-19T16:05:16.5905056+05:30" endTime="2022-05-19T16:05:16.5907140+05:30" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="50bbf10e-a17a-4f1b-8b7c-17b0b5cd19cf">
      <Output>
        <StdOut>railflow-markers:{"ClassMarkers":{"Title":"class-title","ResultFields":["Version=2.8"],"CaseFields":["Milestone=1.0","Estimate=2s"],"SmartAssignment":["user1@abc.com, user2@abc.com"]},"MethodMarkers":{}}</StdOut>
      </Output>
    </UnitTestResult>
    <UnitTestResult executionId="f6cf6b17-a725-4479-8b33-b93ed1359a73" testId="18d377a3-8e25-4532-bac6-e2f0792400d5" testName="TestMethod2" computerName="tharaka-VirtualBox" duration="00:00:00.0000411" startTime="2022-05-19T16:05:16.5902485+05:30" endTime="2022-05-19T16:05:16.5904736+05:30" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="f6cf6b17-a725-4479-8b33-b93ed1359a73">
      <Output>
        <StdOut>railflow-markers:{"ClassMarkers":{"Title":"class-title","ResultFields":["Version=2.8"],"CaseFields":["Milestone=1.0","Estimate=2s"],"SmartAssignment":["user1@abc.com, user2@abc.com"]},"MethodMarkers":{"TestRailIds":[1,2,3]}}</StdOut>
      </Output>
    </UnitTestResult>
    <UnitTestResult executionId="703c70ab-b971-4d90-b8a0-9623363c72be" testId="db4248cc-85fb-4bde-bc91-b2a0803cad25" testName="TestMethod1" computerName="tharaka-VirtualBox" duration="00:00:00.0020291" startTime="2022-05-19T16:05:16.5676436+05:30" endTime="2022-05-19T16:05:16.5851423+05:30" testType="13cdc9d9-ddb5-4fa4-a97d-d965ccfc6d4b" outcome="Passed" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" relativeResultsDirectory="703c70ab-b971-4d90-b8a0-9623363c72be">
      <Output>
        <StdOut>railflow-markers:{"ClassMarkers":{"Title":"class-title","ResultFields":["Version=2.8"],"CaseFields":["Milestone=1.0","Estimate=2s"],"SmartAssignment":["user1@abc.com, user2@abc.com"]},"MethodMarkers":{"Title":"railflow-method-title","CaseFields":["Estimate=1s","Automation Type=1"]}}</StdOut>
      </Output>
    </UnitTestResult>
  </Results>
  <TestDefinitions>
    <UnitTest name="TestMethod2" storage="/home/tharaka/projects/agiletestware/mstest/railflow-mstest-examples/src/railflow.mstest.testrail.reporter.example/railflow.mstest.testrail.reporter.example/bin/debug/net5.0/railflow.mstest.testrail.reporter.example.dll" id="18d377a3-8e25-4532-bac6-e2f0792400d5">
      <Execution id="f6cf6b17-a725-4479-8b33-b93ed1359a73" />
      <TestMethod codeBase="/home/tharaka/projects/agiletestware/MsTest/railflow-mstest-examples/src/Railflow.MSTest.TestRail.Reporter.Example/Railflow.MSTest.TestRail.Reporter.Example/bin/Debug/net5.0/Railflow.MSTest.TestRail.Reporter.Example.dll" adapterTypeName="executor://mstestadapter/v2" className="Railflow.MSTest.TestRail.Reporter.Example.RailflowAttributesExample" name="TestMethod2" />
    </UnitTest>
    <UnitTest name="TestMethod1" storage="/home/tharaka/projects/agiletestware/mstest/railflow-mstest-examples/src/railflow.mstest.testrail.reporter.example/railflow.mstest.testrail.reporter.example/bin/debug/net5.0/railflow.mstest.testrail.reporter.example.dll" id="db4248cc-85fb-4bde-bc91-b2a0803cad25">
      <Execution id="703c70ab-b971-4d90-b8a0-9623363c72be" />
      <TestMethod codeBase="/home/tharaka/projects/agiletestware/MsTest/railflow-mstest-examples/src/Railflow.MSTest.TestRail.Reporter.Example/Railflow.MSTest.TestRail.Reporter.Example/bin/Debug/net5.0/Railflow.MSTest.TestRail.Reporter.Example.dll" adapterTypeName="executor://mstestadapter/v2" className="Railflow.MSTest.TestRail.Reporter.Example.RailflowAttributesExample" name="TestMethod1" />
    </UnitTest>
    <UnitTest name="TestMethod3" storage="/home/tharaka/projects/agiletestware/mstest/railflow-mstest-examples/src/railflow.mstest.testrail.reporter.example/railflow.mstest.testrail.reporter.example/bin/debug/net5.0/railflow.mstest.testrail.reporter.example.dll" id="c8d8d5cf-88cd-436d-ab4b-014f3e992cdc">
      <Execution id="50bbf10e-a17a-4f1b-8b7c-17b0b5cd19cf" />
      <TestMethod codeBase="/home/tharaka/projects/agiletestware/MsTest/railflow-mstest-examples/src/Railflow.MSTest.TestRail.Reporter.Example/Railflow.MSTest.TestRail.Reporter.Example/bin/Debug/net5.0/Railflow.MSTest.TestRail.Reporter.Example.dll" adapterTypeName="executor://mstestadapter/v2" className="Railflow.MSTest.TestRail.Reporter.Example.RailflowAttributesExample" name="TestMethod3" />
    </UnitTest>
  </TestDefinitions>
  <TestEntries>
    <TestEntry testId="c8d8d5cf-88cd-436d-ab4b-014f3e992cdc" executionId="50bbf10e-a17a-4f1b-8b7c-17b0b5cd19cf" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" />
    <TestEntry testId="18d377a3-8e25-4532-bac6-e2f0792400d5" executionId="f6cf6b17-a725-4479-8b33-b93ed1359a73" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" />
    <TestEntry testId="db4248cc-85fb-4bde-bc91-b2a0803cad25" executionId="703c70ab-b971-4d90-b8a0-9623363c72be" testListId="8c84fa94-04c1-424b-9868-57a2d4851a1d" />
  </TestEntries>
  <TestLists>
    <TestList name="Results Not in a List" id="8c84fa94-04c1-424b-9868-57a2d4851a1d" />
    <TestList name="All Loaded Results" id="19431567-8539-422a-85d7-44ee4e166bda" />
  </TestLists>
  <ResultSummary outcome="Completed">
    <Counters total="3" executed="3" passed="3" failed="0" error="0" timeout="0" aborted="0" inconclusive="0" passedButRunAborted="0" notRunnable="0" notExecuted="0" disconnected="0" warning="0" completed="0" inProgress="0" pending="0" />
  </ResultSummary>
</TestRun>
```
5. Install Railflow CLI

```shell
npm install railflow
```

6. Run Railflow CLI and upload test results into TestRail

```shell
npx railflow -k ABCDE-12345-FGHIJ-67890 -url https://testrail.your-server.com/ -u testrail-username -p testrail-password -pr "Railflow Demo" -path Railflow/Demo -f trx -r mstest_example/*.xml -sm path
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
| -f, --format            | Report format: 'trx' (case insensitive)                                                                                                                                                                                                                                                                                                                    | -f junit                                                         |
| -r, --report-files      | The file path(s) to the test report file(s) generated during the build. User can pass multiple values separated with spaces. Ant-style patterns such as **\*\*/reports/\*.xml** can be used.<br/>`E.g. use **target/reports/\*.xml** `to capture all XML files in **target/reports** directory.                                                                                                                            | -r target/surefire-reports/\*.xml target/failsafe-reports/\*.xml |
| -sm, --search-mode      |  Specifies the test case lookup algorithm. <br/> `name:` search for test case matching the name within the entire test suite. If test case found, update the test case. If test case not found, create a new test case within specified `-path` <br/> `path:` search for test case matching the name within the specified `-path`. If test case found, update the test case. If test case not found, create a new test case within specified `-path`| -sm path                                                         |

Please see [Railflow NPM documentation](https://docs.railflow.io/cli/railflow-npm/) for the all the details about Railflow CLI options.

7. View results in TestRail

#### Test run

![Alt Test run in TestRail](/img/framework/mstest/TestRail_testrun.png "Test run in TestRail")

#### Test result details

![Alt Test result details in TestRail](/img/framework/mstest/TestRail_testcase_data.png "Test result details in Testrail")

## Sample Test Project
This sample MSTest project has a sample test. 

https://github.com/railflow/railflow-mstest-examples
