---
sidebar_position: 6
---

# xUnit

## Overview
:::info
[Railflow](https://railflow.io) xUnit reporter is a part of the Railflow platform which allows users to easily integrate their xUnit tests with TestRail using Railflow xUnit attributes.
:::

## How does Railflow xUnit Plugin work?
:::info
xUnit like all other test frameworks produces test reports and Railflow.xUnit.TestRail.Reporter produces XML test reports. Railflow CI Plugins and [NPM CLI](https://www.npmjs.com/package/railflow) can process this reports file and upload results into TestRail.  
The Railflow.xUnit.TestRail.Reporter provides the following features:
- Map xUnit tests into one or several test cases in TestRail by providing test case IDs.
- Provide values for TestRail custom case and result fields for individual test cases.
:::

## Requirements
- xUnit 2.4.1 or greater

## Installation
Railflow.xUnit.TestRail.Reporter is available to install as a NuGet package. 

```shell
Install-Package Railflow.xUnit.TestRail.Reporter
```

## Railflow.xUnit.TestRail.Reporter Usage
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
xUnit `method level attributes` are used to map xUnit tests to existing tests in TestRail. Method level attributes override class level attributes.

  | Function level attributes |
  |-------------------------- |
  |  JiraIds  |
  |  CaseFields  |
  |  ResultFields  |
  |  TestRailIds  |
  |  CaseType   |
  |  CasePriority  |
  |  Title  |
```jsx title="xUnit method level attributes" 

public class RailflowAttributeExamples
{
    [RailflowTestMethod(Title = "railflow-method-title", CaseFields = new[] {"Estimate=1s", "Automation Type=1" })]
    [Fact]
    public void Test1()
    {
    }

    [RailflowTestMethod(TestRailIds = new[] { 1, 2, 3 })]
    [Fact]
    public void Test2()
    {
    }
    
    [Fact]
    public void Test3()
    {
    }
}
```

### Class Level Attributes
xUnit `class level attributes` are applied to `all` the methods within the class. If a test class contains both class level and method level attributes, the `method level attributes take precedence and will override the class level attributes`.

  | Class level attributes |
  |-------------------------- |
  |  CaseFields  |
  |  ResultFields  |
  |  CaseType  |
  |  CasePriority |
  |  SmartAssignment   |
  |  Title  |
  ```jsx title="xUnit class level attributes"

[RailflowTestClass(Title = "class-title", CaseFields = new[] { "Milestone=1.0", "Estimate=2s" }, ResultFields = new[] { "Version=2.8"}, SmartAssignment=new[]{"user1@abc.com, user2@abc.com"})]
public class RailflowAttributeExamples
{
    [Fact]
    public void Test1()
    {
    }
    
    [Fact]
    public void Test2()
    {
    }
    
    [Fact]
    public void Test3()
    {
    }
}
```

### Running Tests

Use [xunit.runner.console](https://www.nuget.org/packages/xunit.runner.console) or [dotnet CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test) to run your tests and generate output XML.
```shell
xunit.console.exe MyTestAssembly.dll -xml TestResults.xml
```
OR

```shell
dotnet test MyTestProject.csproj --logger:"xunit;LogFilePath=TestResults.xml"
```

### View Report

```jsx title="TestResults.xml"
<assemblies timestamp="05/24/2022 09:56:16">
  <assembly name="C:\vm_shared\railflow-xunit\src\Railflow.xUnit\Railflow.xUnit.TestRail.Reporter.Tests\bin\Debug\net4.7.2\Railflow.xUnit.TestRail.Reporter.Tests.dll" run-date="2022-05-24" run-time="09:56:16" config-file="C:\vm_shared\railflow-xunit\src\Railflow.xUnit\Railflow.xUnit.TestRail.Reporter.Tests\bin\Debug\net4.7.2\Railflow.xUnit.TestRail.Reporter.Tests.dll.config" total="3" passed="3" failed="0" skipped="0" time="2.745" errors="0">
    <errors />
    <collection total="3" passed="3" failed="0" skipped="0" name="Test collection for UnknownNamespace.RailflowAttributeExamples" time="0.005">
      <test name="RailflowAttributeExamples.Test3" type="UnknownNamespace.RailflowAttributeExamples" method="Test3" time="0.0030000" result="Pass">
        <traits>
          <trait name="railflow-markers-class" value="{&quot;Title&quot;:&quot;class-title&quot;,&quot;ResultFields&quot;:[&quot;Version=2.8&quot;],&quot;CaseFields&quot;:[&quot;Milestone=1.0&quot;,&quot;Estimate=2s&quot;],&quot;SmartAssignment&quot;:[&quot;user1@abc.com, user2@abc.com&quot;]}" />
        </traits>
      </test>
      <test name="RailflowAttributeExamples.Test1" type="UnknownNamespace.RailflowAttributeExamples" method="Test1" time="0.0010000" result="Pass">
        <traits>
          <trait name="railflow-markers-method" value="{&quot;Title&quot;:&quot;railflow-method-title&quot;,&quot;CaseFields&quot;:[&quot;Estimate=1s&quot;,&quot;Automation Type=1&quot;]}" />
          <trait name="railflow-markers-class" value="{&quot;Title&quot;:&quot;class-title&quot;,&quot;ResultFields&quot;:[&quot;Version=2.8&quot;],&quot;CaseFields&quot;:[&quot;Milestone=1.0&quot;,&quot;Estimate=2s&quot;],&quot;SmartAssignment&quot;:[&quot;user1@abc.com, user2@abc.com&quot;]}" />
        </traits>
      </test>
      <test name="RailflowAttributeExamples.Test2" type="UnknownNamespace.RailflowAttributeExamples" method="Test2" time="0.0010000" result="Pass">
        <traits>
          <trait name="railflow-markers-method" value="{&quot;TestRailIds&quot;:[1,2,3]}" />
          <trait name="railflow-markers-class" value="{&quot;Title&quot;:&quot;class-title&quot;,&quot;ResultFields&quot;:[&quot;Version=2.8&quot;],&quot;CaseFields&quot;:[&quot;Milestone=1.0&quot;,&quot;Estimate=2s&quot;],&quot;SmartAssignment&quot;:[&quot;user1@abc.com, user2@abc.com&quot;]}" />
        </traits>
      </test>
    </collection>
  </assembly>
</assemblies>
```

### Running Examples

1. Install `Railflow.xUnit.TestRail.Reporter`.

```shell
$ Install-Package Railflow.xUnit.TestRail.Reporter
```

2. Add xUit test with Railflow attributes in class level and method level.


```jsx title="RailflowAttributeTests.cs"
[RailflowTestClass(Title = "class-title", CaseFields = new[] { "Milestone=1.0", "Estimate=2s" }, ResultFields = new[] { "Version=2.8"}, SmartAssignment=new[]{"user1@abc.com, user2@abc.com"})]
public class RailflowAttributeExamples
{
  [RailflowTestMethod(Title = "railflow-method-title", CaseFields = new[] {"Estimate=1s", "Automation Type=1" })]
[Fact]
public void Test1()
{
}

[RailflowTestMethod(TestRailIds = new[] { 1, 2, 3 })]
[Fact]
public void Test2()
{
}

[Fact]
public void Test3()
{
}
}
```
3. Run tests and generate report

```shell
dotnet test --logger:"xunit;LogFilePath=TestResults.xml"
```

4. View report file

Report file generated at the same directory where the test executed.

TestResults.xml
```shell
<assemblies timestamp="05/24/2022 09:56:16">
  <assembly name="C:\vm_shared\railflow-xunit\src\Railflow.xUnit\Railflow.xUnit.TestRail.Reporter.Tests\bin\Debug\net4.7.2\Railflow.xUnit.TestRail.Reporter.Tests.dll" run-date="2022-05-24" run-time="09:56:16" config-file="C:\vm_shared\railflow-xunit\src\Railflow.xUnit\Railflow.xUnit.TestRail.Reporter.Tests\bin\Debug\net4.7.2\Railflow.xUnit.TestRail.Reporter.Tests.dll.config" total="3" passed="3" failed="0" skipped="0" time="2.745" errors="0">
    <errors />
    <collection total="3" passed="3" failed="0" skipped="0" name="Test collection for UnknownNamespace.RailflowAttributeExamples" time="0.005">
      <test name="RailflowAttributeExamples.Test3" type="UnknownNamespace.RailflowAttributeExamples" method="Test3" time="0.0030000" result="Pass">
        <traits>
          <trait name="railflow-markers-class" value="{&quot;Title&quot;:&quot;class-title&quot;,&quot;ResultFields&quot;:[&quot;Version=2.8&quot;],&quot;CaseFields&quot;:[&quot;Milestone=1.0&quot;,&quot;Estimate=2s&quot;],&quot;SmartAssignment&quot;:[&quot;user1@abc.com, user2@abc.com&quot;]}" />
        </traits>
      </test>
      <test name="RailflowAttributeExamples.Test1" type="UnknownNamespace.RailflowAttributeExamples" method="Test1" time="0.0010000" result="Pass">
        <traits>
          <trait name="railflow-markers-method" value="{&quot;Title&quot;:&quot;railflow-method-title&quot;,&quot;CaseFields&quot;:[&quot;Estimate=1s&quot;,&quot;Automation Type=1&quot;]}" />
          <trait name="railflow-markers-class" value="{&quot;Title&quot;:&quot;class-title&quot;,&quot;ResultFields&quot;:[&quot;Version=2.8&quot;],&quot;CaseFields&quot;:[&quot;Milestone=1.0&quot;,&quot;Estimate=2s&quot;],&quot;SmartAssignment&quot;:[&quot;user1@abc.com, user2@abc.com&quot;]}" />
        </traits>
      </test>
      <test name="RailflowAttributeExamples.Test2" type="UnknownNamespace.RailflowAttributeExamples" method="Test2" time="0.0010000" result="Pass">
        <traits>
          <trait name="railflow-markers-method" value="{&quot;TestRailIds&quot;:[1,2,3]}" />
          <trait name="railflow-markers-class" value="{&quot;Title&quot;:&quot;class-title&quot;,&quot;ResultFields&quot;:[&quot;Version=2.8&quot;],&quot;CaseFields&quot;:[&quot;Milestone=1.0&quot;,&quot;Estimate=2s&quot;],&quot;SmartAssignment&quot;:[&quot;user1@abc.com, user2@abc.com&quot;]}" />
        </traits>
      </test>
    </collection>
  </assembly>
</assemblies>
```
5. Install Railflow CLI

```shell
npm install railflow
```

6. Run Railflow CLI and upload test results into TestRail

```shell
npx railflow -k ABCDE-12345-FGHIJ-67890 -url https://testrail.your-server.com/ -u testrail-username -p testrail-password -pr "Railflow Demo" -path Railflow/Demo -f xunit -r xunit_example/*.xml -sm path
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
| -f, --format            | Report format: 'xunit' (case insensitive)                                                                                                                                                                                                                                                                                                                    | -f xunit                                                         |
| -r, --report-files      | The file path(s) to the test report file(s) generated during the build. User can pass multiple values separated with spaces. Ant-style patterns such as **\*\*/reports/\*.xml** can be used.<br/>`E.g. use **target/reports/\*.xml** `to capture all XML files in **target/reports** directory.                                                                                                                            | -r target/surefire-reports/\*.xml target/failsafe-reports/\*.xml |
| -sm, --search-mode      |  Specifies the test case lookup algorithm. <br/> `name:` search for test case matching the name within the entire test suite. If test case found, update the test case. If test case not found, create a new test case within specified `-path` <br/> `path:` search for test case matching the name within the specified `-path`. If test case found, update the test case. If test case not found, create a new test case within specified `-path`| -sm path                                                         |

Please see [Railflow NPM documentation](https://docs.railflow.io/cli/railflow-npm/) for the all the details about Railflow CLI options.

7. View results in TestRail

#### Test run

![Alt Test run in TestRail](/img/framework/xunit/TestRail_testrun.png "Test run in TestRail")

#### Test result details

![Alt Test result details in TestRail](/img/framework/xunit/TestRail_testcase_data.png "Test result details in Testrail")

## Sample xUnit Project
This sample xUnit project has a sample test.

https://github.com/railflow/railflow-xunit-examples
