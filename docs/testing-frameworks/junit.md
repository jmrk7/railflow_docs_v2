---
sidebar_position: 4
---

# JUnit

## Overview

:::info
[Railflow](https://railflow.io) Java Annotations Package for JUnit framework is a part of the [Railflow](https://railflow.io)
platform which can help users to enrich JUnit XML test reports with screenshots and various useful metadata.

The package contains a set of Java Annotations and convenient helper classes which allows users to:

* Map Java test cases into one or several test cases in TestRail by providing test case IDs.
* Attach screenshots and arbitrary attachments to the test case results in TestRail.
* Provide values for TestRail custom case and result fields for individual test cases.
:::


## How does Railflow Annotations work?
:::info
When using the annotation package, JUnit produces an enriched xml test report `railflow_report.xml`. This report is then processed by Railflow CI Plugins and CLI in the same way and you end up with advanced mapping and configuration results in TestRail.
:::

## Requirements

* Java 1.8 or newer
* JUnit version
    * Junit 4.11 or higher when using [JUnit 4](https://junit.org/junit4/)
    * Junit 5.7.0 or higher when using [JUnit 5](https://junit.org/junit5/)
* [Railflow NPM](https://www.npmjs.com/package/railflow) or Railflow CI Plugin for [Jenkins](http://jenkins.io)/[TeamCity](https://www.jetbrains.com/teamcity/)

:::tip
Railflow Java annotations can be used together with Maven, Ivy, Gradle or even with a plain Java project.
:::

## Maven Setup

If you are using Maven as your Java build tool, simply follow these instructions to integrate Railflow Java SDK with your maven project.

### Add dependency

* Add the following dependency into `pom.xml`:

```jsx title="Railflow dependency"
<dependency>
 <groupId>io.railflow.annotations</groupId>
 <artifactId>railflow-junit-annotations</artifactId>
 <version>0.5</version>
 <scope>test</scope>
</dependency>
```

### Configure Surefire Plugin (for JUnit 4)
Configure Maven Surefire plugin. This together with the Railflow dependency will generate an enriched report `railflow_report.xml` in the current working directory during `mvn test`. This file contains additional information and can be consumed by Railflow NPM package or Railflow CI plugins.

```jsx title="Railflow Surefire Plugin"
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-surefire-plugin</artifactId>
	<version>2.22.2</version>
	<dependencies>
		<dependency>
			<groupId>org.apache.maven.surefire</groupId>
			<artifactId>surefire-junit47</artifactId>
			<version>2.22.2</version>
		</dependency>
	</dependencies>
	<configuration>
		<properties>
			<property>
				<name>listener</name>
				<value>io.railflow.annotations.junit.RailflowJunit4Listener</value>
			</property>
		</properties>
	</configuration>
</plugin>
```

:::info JUnit 5
There is no additional configuration needed as `railflow-junit-annotations` automatically adds required JUnit 5 listener as soon as it's added into the project classpath.
:::

Whenever a Maven test phase runs, the `railflow_report.xml` file is generated in the current working directory. This file contains additional information and can be consumed by Railflow NPM package and Railflow CI plugins.

### Register Railflow listener (for JUnit 4)

Add `io.railflow.annotations.junit.RailflowJunit4Listener` Junit 4 listener in `JUnitCore` object in your test runner:

```jsx title="Railflow Listener"
import org.junit.runner.JUnitCore;
import io.railflow.annotations.junit.RailflowJunit4Listener;

public class MyTestRunner {
  public static void main(String args[]) {
    JUnitCore runner = new JUnitCore();
    runner.addListener(new RailflowJunit4Listener());
    runner.run(YourTestClass.class);
  }
}
```
:::info JUnit 5
There is no additional configuration needed as `railflow-junit-annotations` automatically adds required JUnit 5 listener as soon as it's added into project classpath.
:::

Whenever a test runs from CLI, IDE or with Maven/Gradle the `railflow_report.xml` file is created in current working directory. This file contains additional
information and can be consumed by Railflow NPM package and Railflow CI plugins.

## Regular Java Project

For the Java project which does not use Maven or Gradle, the Railflow Annotation Package can be still used, because it's integrating with JUnit directly.

To use it, follow the steps below:

* Download and add `railflow-annotations-common` and `railflow-junit-annotations` jar files from Maven repository and add them to the classpath of your Java project
* Register the listener in code referring to [Register Railflow listener (for JUnit 4)](#register-railflow-listener-for-junit-4)

## Changing `railflow_report.xml` file location
To change the default location of `railflow_report.xml` file, use the following Java Property: `-Dio.railflow.report_dir`.

E.g. to create `railflow_report.xml` in Maven, in the default surefire report directory:
```shell
mvn clean test -Dio.railflow.report_dir=target\surefire-reports
``` 

## Using Railflow Annotations

The Java Annotation package provides `io.railflow.annotations.Railflow` annotation which can be applied to test class or test method.

The `io.railflow.annotations.Railflow` annotation has a number of attributes which have slightly different meaning depending on if it is applied on class or
method level and which report format is used during the upload reports into TestRail with Railflow.

### Class annotations

| Name                   | Description                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| title                  | name for the subsection which contains the test in TestRail, if not defined                                             |
| testrailIds            | ignored                                                                                                                 |
| caseFields             | array of test case field label/value pairs, e.g.`@CustomField(name="My custom case field", value="Railflow rocks")`     |
| resultFields           | array of test result field label/value pairs, e.g.`@CustomField(name="My custom result field", value="Railflow rocks")` |
| caseType               | name of the case type for a test in TestRail, e.g.`Automated`                                                           |
| casePriority           | name of the case priority for a test in TestRail, e.g.`High`                                                            |
| jiraIds                | array of Jira issue IDs, which will be set as `refs` in TestRail                                                          |
| smartFailureAssignment | array of user email IDs, each failed test in the class will be assigned to one of these users in a round-robin fashion  |

### Method annotations

| Name                   | Description                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| title                  | test title, if not specified, test method name is used                                                                  |
| testrailIds            | array of TestRail test IDs into which the result of this method will be added                                           |
| caseFields             | array of test case field label/value pairs, e.g.`@CustomField(name="My custom case field", value="Railflow rocks")`     |
| resultFields           | array of test result field label/value pairs, e.g.`@CustomField(name="My custom result field", value="Railflow rocks")` |
| caseType               | name of the case type for a test in TestRail, e.g.`Automated`                                                           |
| casePriority           | name of the case priority for a test in TestRail, e.g.`High`                                                            |
| jiraIds                | array of Jira issue IDs, which will be set as `refs` in TestRail                                                          |
| smartFailureAssignment | user email ID to assign failed test result to                                                                           |

Attributes of the Railflow annotation on method level override similar attributes of the Railflow annotation on class level.

### Adding arbitrary attachments to the report

Railflow Annotation Package provides the `io.railflow.annotations.junit.CurrentTest` utility class with several static methods for adding attachments to the XML
report:

* `addAttachment(File attachmentFile)` - adds arbitrary attachment file to the XML report.
* `addAttachment(final String name, final InputStream inputStream)` - adds an attachment file with given name and contents of inputStream
* `addAttachment(final String name, final byte[] data)` - adds an attachment file with given name and content specified by the given byte array

## Uploading enriched XML report into TestRail with Railflow

Once the report file has been generated, it can be easily uploaded into TestRail by using either Railflow NPM package or native plugins for Jenkins or TeamCity:

### Railflow NPM

To upload generated `railflow_report.xml` report file using Railflow NPM module, just use the following commands:

```shell
npm install railflow
npx railflow -k ABCDE-12345-FGHIJ-67890 -url https://testrail.your-server.com/ -u testrail-username -p testrail-password -pr "Railflow Demo" -path Master/section1/section2 -f junit -r target/surefire-reports/railflow_report.xml
```

Where:

* k - Railflow license key
* url - the URL of the TestRail server
* u - TestRail user name
* p - TestRail user password
* pr - name of the project in TestRail
* path - path to the subsection in TestRail where test cases will be exported to
* f - test report format - for JUnit reports, please use `JUnit`
* r - path to the `railflow_report.xml` file

Please see [Railflow NPM documentation](https://docs.railflow.io/cli/railflow-npm/) for further details.

### Jenkins plugin

To upload generated `railflow_report.xml` file using Railflow Jenkins plugin, add `Railflow Plugin: TestRail Test Results Processor` post-build action to your job configuration:

![](/img/framework/junit/jenkins-1.png)

Please see [Railflow Jenkins plugin documentation](https://docs.railflow.io/cicd/jenkins/) for further details.

### TeamCity plugin

To upload generated `railflow_report.xml` using Railflow TeamCity plugin, add `"`Railflow Plugin: TestRail Test Results Processor` build step into your TeamCity job configuration:

![](/img/framework/junit/teamcity-1.png)

Please see [Railflow TeamCity plugin documentation](https://docs.railflow.io/cicd/teamcity/) for further details.

## Annotations Examples

### Adding Railflow annotation on test class

```jsx title="Railflow Class Level Annotations"
package io.railflow.annotations.demo;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.junit.Assert;
import org.junit.Test;

import io.railflow.annotations.CustomField;
import io.railflow.annotations.Railflow;
import io.railflow.annotations.junit.CurrentTest;

@Railflow(title = "Railflow on the class level", jiraIds = {"ISSUE-42", "ISSUE-43"}, caseType = "Automated", casePriority = "Critical",
        caseFields = {@CustomField(name = "required text field", value = "class value"), @CustomField(name = "estimate", value = "42s")},
		resultFields = {@CustomField(name = "Custom field", value = "result from class annotations")},
		smartFailureAssignment = { "user1@yourcompany.com", "user2@yourcompany.com" })
public class RailflowDemoTest {

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

Results in TestRail after uploading generated `railflow_report.xml` file:

* Report format - JUnit:

![](/img/framework/junit/example-class-1.png)

![](/img/framework/junit/example-class-2.png)

### Adding Railflow annotation on test method

```jsx title="Railflow Method Level Annotations"
package io.railflow.annotations;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.junit.Assert;
import org.junit.Test;

import io.railflow.annotations.CustomField;
import io.railflow.annotations.junit.CurrentTest;

public class RailflowDemoTest {

    @Railflow(title = "Railflow on the method level", jiraIds = {"ISSUE-44", "ISSUE-45"}, caseType = "Performance", casePriority = "High",
            caseFields = {@CustomField(name = "required text field", value = "method value"), @CustomField(name = "estimate", value = "24s")},
            resultFields = {@CustomField(name = "Custom field", value = "result from annotation on method")}, smartFailureAssignment = {"user2@yourcompany.com"})
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

Results in TestRail after uploading generated `railflow_report.xml` file:

* Report format - JUnit:

![](/img/framework/junit/example-method-1.png)

![](/img/framework/junit/example-method-2.png)
