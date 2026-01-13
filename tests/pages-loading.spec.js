import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://sites.udel.edu/technology-service-center/');
});

test('main page loads', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Technology Service Center', exact: true })).toBeVisible();
});

test('partner with us button works', async ({ page }) => {
  await page.getByRole('button', { name: 'Partner With Us' }).click();
  await expect(page.getByRole('heading', { name: 'Industry Partnership' })).toBeVisible();
});

test('about buttons work', async ({ page }) => {
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to the University of' })).toBeVisible();
  await page.locator('#menu-main-menu').getByText('About Home Welcome Values').hover()
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByRole('heading', { name: 'Technology Service Center', exact: true })).toBeVisible();
  await page.locator('#menu-main-menu').getByText('About Home Welcome Values').hover()
  await page.getByRole('link', { name: 'Values' }).click();
  await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
});

test('people button works', async ({ page }) => {
  await page.getByRole('link', { name: 'People' }).click();
  await expect(page.getByRole('heading', { name: 'Meet the team' })).toBeVisible();
});

test('student opportunities button works', async ({ page }) => {
  await page.getByRole('link', { name: 'Student Opportunities' }).click();
  await expect(page.getByRole('heading', { name: 'Technology Service Center' })).toBeVisible();
});

test('industry partner button works', async ({ page }) => {
  await page.getByRole('link', { name: 'Industry Partners' }).click();
  await expect(page.getByRole('heading', { name: 'Industry Partnership' })).toBeVisible();
});

test('contact us button works', async ({ page }) => {
  await page.getByRole('link', { name: 'Contact Us' }).click();
  await expect(page.getByRole('heading', { name: 'Drop us a Message' })).toBeVisible();
});

test('test failure example', async ({ page }) => {
  await page.getByRole('link', { name: 'THIS DOES NOT EXIST' }).click();
});