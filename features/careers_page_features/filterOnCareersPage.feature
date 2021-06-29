Feature: Filter on Careers page
  I want to check if filter shows correct results

  Background:
    Given I open the "EPAM Careers" page
    Then I should be on the "EPAM Careers" page

  Scenario: Filtering by Keyword field that filled by correct value
    When I type "javascript" in the Keyword field
    And I click the Find button
    Then each "name" of the first "5" shown items should contain "javascript" in any register

  Scenario: Filtering by Location field
    When I set the "Belarus" country and "Minsk" city for the Location field
    And I click the Find button
    Then each "location" of the first "5" shown items should contain "Minsk, Belarus" in any register

  Scenario Outline: Filtering by "<checkbox>" checkbox
    When I mark the "<checkbox>" checkbox
    And I click the Find button
    Then the first "5" shown items should contain "<icon>" icon

    Examples:
      |checkbox            |icon
      |Open to Relocation  |Open to Relocation
      |Office              |Work from office
      |Remote              |You can work from home or anywhere in the world if you apply for remote positions.

  Scenario: Filtering without any parameters
    When I set the All Locations value for the Location field
    And I click the Find button
    Then error message is not displayed

  Scenario: Filtering by Keyword field that filled by value with a grammar mistake
    When I type "javascropt" in the Keyword field
    And I click the Find button
    Then error message is displayed

  Scenario: Filtering by Keyword field that filled by special characters
    When I type "+-=*/'" in the Keyword field
    And I click the Find button
    Then error message is displayed

  Scenario: Filtering by Keyword field that filled by numbers
    When I type "12345" in the Keyword field
    And I click the Find button
    Then error message is displayed

  Scenario: Refreshing a page after filtration
    When I type "javascript" in the Keyword field
    And I click the Find button
    And I remember the "filter result heading"
    And I refresh the page
    Then the "filter result heading" equals the remembered one

  Scenario: Returning from a job page
    When I type "javascript" in the Keyword field
    And I click the Find button
    And I remember the "filter result heading"
    And I click the first appeared job opening
    And I return back to the filtered page
    Then the "filter result heading" equals the remembered one

  Scenario: Using URL of filtered page
    When I type "javascript" in the Keyword field
    And I click the Find button
    And I remember the "filter result heading"
    And I open new page with current URL
    Then the "filter result heading" equals the remembered one

  Scenario: Visiting a job page
    When I type "javascript" in the Keyword field
    And I click the Find button
    And I remember the "name of the first appeared job opening"
    And I click the first appeared job opening
    Then I should be on the "Job" page
    And the "name of the job opening" equals the remembered one