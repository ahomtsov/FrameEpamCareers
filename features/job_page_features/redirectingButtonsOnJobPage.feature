Feature: Redirecting to other pages by buttons on Job page
  I want to check if other pages open after clicking a certain button

  Background:
    Given I open the "EPAM Careers" page
    And I type "javascript" in the "Keyword" field
    And I click the Find button
    And I click the first appeared job opening
    Then I should be on the "Job" page

  Scenario: Open Learn more about EPAM page
    When I open new page by clicking the "Learn more about EPAM" button
    Then the title should be "EPAM | Работа в IT для опытных и начинающих специалистов"

  Scenario: Open the first related job opening page
    When I remember "name of the first related job opening"
    And I open new page by clicking the "first related job opening" button
    Then the "name of the job opening" equals the remembered one

  @CURRENT
  Scenario: Open the first A day in the life page
    When I remember "name of the first person from A day in the life section"
    And I open new page by clicking the "first person from A day in the life section" button
    Then the "title of the new page" equals the remembered one

  Scenario: Open Contact us page
    When I open new page by clicking the "Contact us" button
    Then the title should be "Learn more about EPAM and Contact Us | EPAM"