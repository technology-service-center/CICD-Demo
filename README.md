# CICD-Demo

This repository is an example of how to set up a CI/CD pipeline with Playwright using JavaScript  
(and how to set up Playwright with a Discord webhook).

## Getting Playwright Setup

1. Make sure [Node.js](https://nodejs.org/en) is installed on your computer.
2. In a repository, run `npm init playwright@latest` in the terminal.
3. You will be prompted with a few questions. For this repository, we selected:
   - JavaScript
   - Keep the default test folder name
   - Add a GitHub Actions folder
   - Install browsers

## Looking at the Files

1. `node_modules`, `package.json`, and `package-lock.json` do not need to be manually edited.
2. The `tests` folder contains all `.spec.js` test files.
   - See the [Playwright documentation](https://playwright.dev/docs/intro) for test creation.
3. `.gitignore` contains paths you don’t want pushed to GitHub.
4. `playwright.config.js` controls Playwright settings.
   - Only the `reporter` and `use` sections were modified in this repo.
5. `.github/workflows/playwright.yml` controls GitHub Actions.

## Running Tests Locally

Run all tests:

```bash
npx playwright test
```

Run a specific file:
```bash
npx playwright test [add filename here]
```
For more settings for running tests, go to [https://playwright.dev/docs/running-tests](https://playwright.dev/docs/running-tests)

## Reporters
Reporters are what show the output of the tests. You can add or remove them in the `reporter` section of the `playwright.config.js` file ([list of reporters](https://playwright.dev/docs/test-reporters)).

This repo uses the default html reporter, which you can view after running tests with the `npx playwright show-report` command, the github reporter which adds a summary of the tests to the github actions page, and the `playwright-ctrf-json-reporter`, which was used to get the results of the tests to send in discord messages. The ctrf reporter needs to be installed to use (explained in the discord section).

Additionally in the settings, you can make it so that when a test fails, a screenshot of what the test saw on the website is taken. This is done in the `playwright.config.js` file by adding the line `screenshot: 'only-on-failure'` to the `use` section. The screenshot can then be viewed in the html report.

## The YML File
The `playwright.yml` file is what connects the playwright tests to github actions. It contains a workflow that will run at certain times. In the file:
- The `name` is the name of the workflow
- The `on` section controls when the workflow gets run (by default on push or pull request to main branch)
- The `jobs` section is what is run when the workflow is triggered. By default it installs all dependencies and browsers for the playwright tests, runs said tests, and creates a report. Steps can be added or removed to change what happens.

## Using Github Actions
In the github repo, the actions tab is where you can view all of the instances of the workflow running. Each instance will have an X or a checkmark for if the playwright tests pass. Clicking on an instance will allow you to see any tests that failed, how the steps of the workflow ran, and you can download the html report generated to view it.

## Scheduling and Triggering Workflows
Aside from triggering the workflow on push or pull request, this repo has two additional triggers. 
- The `schedule` trigger will run the workflow at a certain time, specified by the [Cron](https://en.wikipedia.org/wiki/Cron) format. This repo runs the workflow at 8:30 AM UTC every day.
- The `workflow_dispatch` trigger adds an option to the github actions tab to manually trigger the workflow, allowing for easier testing of the workflow.

## Adding a Branch Protection Rule
To implement CICD into a repo, a branch protection rule is neccesary to stop people from pushing to the main branch without authorization. To add a branch protection rule:
1. Go to the settings tab of your github repo.
2. Go to the `Branches` tab.
3. Select `Add classic branch protection rule`.
4. Under `Branch name pattern`, type `main`.
5. Select `Require a pull request before merging`, `Require approvals`, and select how many approvals you want.
6. Select `Require status checks to pass before merging`, `Require branches to be up to date before merging`, and in the search bar below it type `test`.

Other options can be selected to add more rules, such as not allowing admins to bypass the branch protection rule, but these settings will require the playwright tests to pass and approvals from others in the repo before being able to merge a pull request to the main branch.

## Adding discord notification on test failure
To set this up, you need to:
1. Run the command
```bash
   npm install --save-dev playwright-ctrf-json-reporter.
```
2. Add the `playwright-ctrf-json-reporter` to the reporter settings in the `playwright.config.js` file.
3. [Create a discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).
4. Add the webhook URL as a github secret.
5. Update the `playwright.yml` file to add a step to the workflow that runs the test (it's been done in this repo).
6. Add a file with code to send the messages, using the github secret to get the webhook URL (look at the `notify_discord.js` file in this repo).

To add the webhook URL as a github secret:
1. Go to the `settings` tab in the github repo.
2. Go to `Secrets and variables`, and then `Actions`.
3. Select `New repository secret`.
4. Give it a name (DISCORD_WEBHOOK_URL is the name in this repo).
5. In the `Secret` text box, put the webhook URL.

This is important, as if your webhook URL is visible in the code then anyone can use it send messages. Github secrets allows you to use it without it being in the code.
