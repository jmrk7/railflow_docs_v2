---
sidebar_position: 2
---

# TestNG

## Overview
:::info
Railflow Java Annotations Package for TestNG allow users to easily integrate their TestNG test framework with TestRail. This integration, allows users to `map` TestNG tests to tests, suites, plans, milestones, and runs in TestRail. You can also use these annotations to automatically take and attach screenshot for failing tests. This is particularly useful for Selenium WebDriver and Appium tests.
:::

## How does Railflow Annotations work?
:::info
TestNG like all other test framework, produces a test results xml `testing-results.xml`. Railflow CI Plugins and CLI can process this results file and automatically parse and upload them into TestRail. For most users, this would be sufficient. For user that have a need to `map` TestNG tests to tests in TestRail or want to use automatic screenshots, they would need to use the Railflow Annotations package. 

When using the annotation package, TestNG produces an enriched xml test report `railflow_report.xml`. This report is then processed by Railflow CI Plugins and CLI in the same way and you end up with advanced mapping and configuration results in TestRail.
:::

## Requirements
- Java 1.8 or newer
- TestNG version 7.1.0 or newer
- Railflow NPM or Railflow CI Plugin for Jenkins/TeamCity

:::tip
Railflow Java annotations can be used together with Maven, Ivy, Gradle or even with a plain Java project. 
:::

## Maven Setup
If you are using Maven as your JAVA build tool, simply follow these instructions to integrate Railflow JAVA SDK with your maven project.


### Add Dependency 
Add the following dependency into `pom.xml` file

```jsx title="Railflow dependency"
<dependency>
	<groupId>io.railflow.annotations</groupId>
	<artifactId>railflow-testng-annotations</artifactId>
	<version>0.2</version>
	<scope>test</scope>
</dependency>
```

### Configure Sure-Fire Plugin
Configure Maven Surefire plugin. This together with the Railflow dependency will generate an enriched report `railflow_report.xml` in the `target/surefire-reports` directory during `mvn test`. This file contains additional information and can be consumed by Railflow NPM package or Railflow CI plugins.

```jsx title="Railflow Surefire Plugin"
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-surefire-plugin</artifactId>
	<version>2.22.1</version>
		<configuration>
			<properties>
				<property>
					<name>listener</name>
					<value>io.railflow.annotations.testng.RailflowReporterio.railflow.annotations.testng.RailflowReporter</value>
				</property>
			</properties>
		</configuration>
</plugin>
```


### Add Railflow Reporter
While this is not required, it is highly recommended. The Railflow reporter allows you to generate the enriched report `railflow_report.xml` from your CLI or IDE. This is particular useful if you use IDE for development and debugging. Simply add the Railflow Listener to your test classes

```jsx title="Railflow Listener"
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

@Listeners(value = io.railflow.annotations.testng.RailflowReporter.class)
public class SimpleTest {
    // tests below
}
```

## Gradle Setup
If you are using Gradle as your JAVA build tool, simply follow these instructions to integrate Railflow JAVA SDK with your Gradle project.

### Add Dependency 
Add the following dependency into `build.gradle` file

```jsx title="Railflow Dependency"
testImplementation 'io.railflow.annotations:railflow-testng-annotations:0.2'
```

### Add Reporter
Add `io.railflow.annotations.testng.RailflowReporter` reporter to the `test`

```jsx title="Railflow Reporter"
test 
{
    useTestNG()
    {
        listeners << 'io.railflow.annotations.testng.RailflowReporter'
    }
}
```

After the configuration above has been added, whenever tests run, the `railflow_report.xml` file is generated in `build/reports/tests/test` directory. This file contains additional information and can be consumed by Railflow NPM package or Railflow CI plugins.


## Plain JAVA Setup
For plain Java project which does not use Maven or Gradle, the Railflow Annotation Package can be still used, because it is directly integrated with TestNG (how cool)


### Download Annotations Package
Download and add `railflow-testng-annotations` jar file from Maven repository and add it to the classpath of your Java project

### Add Listener to Test Class
Add `@Listeners(value = io.railflow.annotations.testng.RailflowReporter.class)` annotation to your test class.

```jsx title="Railflow Listener"
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

@Listeners(value = io.railflow.annotations.testng.RailflowReporter.class)
public class RailflowTest {
    // tests below
}
```

After the configuration above has been added, whenever tests run, the `railflow_report.xml` file is generated in `test-output` directory. This file contains additional information and can be consumed by Railflow NPM package and Railflow CI plugins.

## Using Railflow Annotations
After setting up your `Maven/Gradle/JAVA` project by following the steps above, now comes the fun part. Railflow annotations package allows users to work with powerful attributes that can be applied at the `class` or `test level`. In the section below, we will cover the many ways you can decorate your tests with Railflow annotations.

### TestNG Reporting Formats
Railflow can upload the TestNG XML report to TestRail in one of two ways.
- `TESTNG`: Each `test method` is treated like a `single testcase` 
- `TESTNG_STEPS`: Each `test class` is treated like a `single test case` and methods inside the class are uploaded as `test steps` within the test case.

:::tip
The `io.railflow.annotations.Railflow` annotation has a number of attributes which have slightly different meaning depending on if it is applied on `class` or `method` level `and` testNG report format. 
:::


### Class Annotations (TestNG)
When using the `TestNG`reporting format, Railflow `Class level attributes are applied to the results of test methods` inside the class marked with Railflow annotation.

| Name                   | Description               | 
| -----------------------| ------------------------- | 
| title                  | name for the subsection which contains the test in TestRail, if not defined |
| testrailIds            | ignored        |
| caseFields             | array of test case field label/value pairs, e.g. `@CustomField(name="My custom case field", value="Railflow rocks")` |
| resultFields           | array of test result field label/value pairs, e.g. `@CustomField(name="My custom result field", value="Railflow rocks")` |
| caseType               | name of the case type for a test in TestRail, e.g. `Automated` |
| casePriority           | name of the case priority for a test in TestRail, e.g. `High` |
| jiraIds                | array of Jira issue IDs, which will be set as refs in TestRail |
| smartFailureAssignment | array of user email IDs, each failed test in the class will be assigned to one of these users in a round-robin fashion |



### Class Annotations (TestNG-STEPS)
When using the `TestNG-STEPS` reporting format, Railflow `class level attributes are applied to the results of test methods` inside the class marked with Railflow annotation.

| Name                   | Description               | 
| -----------------------| ------------------------- | 
| title                  | test title, if not specified, test class name is used |
| testrailIds            | array of TestRail test IDs into which the result of this class will be added |
| caseFields             | array of test case field label/value pairs, e.g. `@CustomField(name="My custom case field", value="Railflow rocks")` |
| resultFields           | array of test result field label/value pairs, e.g. `@CustomField(name="My custom result field", value="Railflow rocks")` |
| caseType               | name of the case type for a test in TestRail, e.g. `Automated` |
| casePriority           | name of the case priority for a test in TestRail, e.g. `High` |
| jiraIds                | array of Jira issue IDs, which will be set as refs in TestRail |
| smartFailureAssignment | user email ID to assign failed test result to   |


### Method Annotations (TestNG)
When using the `TestNG` reporting format, Railflow `method level attributes Override the same attributes at the class level.`


| Name                   | Description               | 
| -----------------------| ------------------------- | 
| title                  | test title, if not specified, test method name is used                 |     
| testrailIds            | array of TestRail test IDs into which the result of this method will be added |
| caseFields             | array of test case field label/value pairs, e.g. `@CustomField(name="My custom case field", value="Railflow rocks")` |
| resultFields           | array of test result field label/value pairs, e.g. `@CustomField(name="My custom result field", value="Railflow rocks")` |
| caseType               | name of the case type for a test in TestRail, e.g. `Automated` |
| casePriority           | name of the case priority for a test in TestRail, e.g. `High` |
| jiraIds                | array of Jira issue IDs, which will be set as refs in TestRail |
| smartFailureAssignment | user email ID to assign failed test result to                  |


### Method Annotations (TestNG-STEPS)
When using the `TestNG-STEPS` reporting format, Railflow `method level attributes Override the same attributes at the class level.`

 Name                   | Description                     | 
| -----------------------| ------------------------------- | 
| title                  | name of a test step in TestRail |
| testrailIds            | ignored                         |
| caseFields             | ignored                         |
| resultFields           | ignored                         |
| caseType               | ignored                         |
| casePriority           | ignored                         |
| jiraIds                | ignored                         |
| smartFailureAssignment | ignored                         |

### Screenshots Attachments
Test failures in Selenium WebDriver or Appium have the most important information in screenshots. Railflow provides `utility classes and several static methods` for taking automatic screenshot so that they can also be uploaded to TestRail along with the failure exception message (how cool)

- `addAttachment(File attachmentFile)` : Adds arbitrary attachment file to the XML report.
- `addAttachment(final String name, final InputStream inputStream)` : Adds an attachment file with given name and contents of inputStream
- `addAttachment(final String name, final byte[] data)`: Adds an attachment file with given name and content specified by the given byte array


## Annotations Examples 
Here are some JAVA code examples on how you would use TestRail annotations at the method or class level and what the results would like in TestRail

### Class Level Annotations

```jsx title="Railflow Class Level Annotations"
package io.railflow.annotations.demo;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import io.railflow.annotations.testng.CurrentTest;
import io.railflow.annotations.testng.RailflowReporter;

@Listeners(value = { RailflowReporter.class })
@Railflow(title = "Railflow on the class level", jiraIds = { "ISSUE-42", "ISSUE-43" }, caseType = "Automated", casePriority = "Critical",
		caseFields = {@CustomField(name = "required text field", value = "class value"), @CustomField(name = "estimate", value = "42s") },
		resultFields = {@CustomField(name = "Custom field", value = "result from class annotations")},
		smartFailureAssignment = { "user1@yourcompany.com", "user2@yourcompany.com" })
public class RailflowDemo {

	@Test
	public void test() throws IOException {
		CurrentTest.addAttachment("my log.txt", "something".getBytes(StandardCharsets.UTF_8));
	}

	@Test
	public void test_failed() throws IOException {
		CurrentTest.addAttachment("my log.txt", "something".getBytes(StandardCharsets.UTF_8));
		Assert.fail("oops");
	}
}
```

### TestNG Reporting Format  
![testng class](/img/framework/testng/testng-class-testng-1.png)

![testng class](/img/framework/testng/testng-class-testng-2.png)

### TestNG-Steps Reporting Format  
![testng steps](/img/framework/testng/testng-class-testng-steps-1.png)

![testng steps](/img/framework/testng/testng-class-testng-steps-2.png)



### Method Level Annotations
```jsx title="Railflow Method Level Annotations"
package io.railflow.annotations;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import io.railflow.annotations.testng.CurrentTest;
import io.railflow.annotations.testng.RailflowReporter;

@Listeners(value = { RailflowReporter.class })
public class RailflowDemo {

	@Railflow(title = "Railflow on the method level", jiraIds = {"ISSUE-44", "ISSUE-45"}, caseType = "Performance", casePriority = "High",
			caseFields = { @CustomField(name = "required text field", value = "method value"), @CustomField(name = "estimate", value = "24s") },
			resultFields = { @CustomField(name = "Custom field", value = "result from annotation on method")}, smartFailureAssignment = { "user2@yourcompany.com"})
	@Test
	public void test() throws IOException {
		CurrentTest.addAttachment("my log.txt", "something".getBytes(StandardCharsets.UTF_8));
	}

	@Test
	public void test_failed() throws IOException {
		CurrentTest.addAttachment("my log.txt", "something".getBytes(StandardCharsets.UTF_8));
		Assert.fail("oops");
	}
}
```
### TestNG Reporting Format  
![testng method](/img/framework/testng/testng-method-testng-1.png)

![testng method](/img/framework/testng/testng-method-testng-2.png)

### TestNG-Steps Reporting Format  
![testng method](/img/framework/testng/testng-method-testng-steps-1.png)

![testng method](/img/framework/testng/testng-method-testng-steps-2.png)
