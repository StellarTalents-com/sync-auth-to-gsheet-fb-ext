<!-- 
This file provides your users an overview of your extension. All content is optional, but this is the recommended format. Your users will see the contents of this file when they run the `firebase ext:info` command.

Include any important functional details as well as a brief description for any additional setup required by the user (both pre- and post-installation).

Learn more about writing a PREINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/alpha/create-user-docs#writing-preinstall
-->

# Purpose

Use this extension to add new users to an existing Google SpreadSheet.

**Note:** To use this extension, you need to manage your users with Firebase Authentication.

# Configuration parameters

You need three parameters to confiugre this extension:
1. Your service account email address
1. Your service account private key
1. Your Google SpreadSheet Id

## Preconfiguration

You must create the Google Cloud project, enable Sheets API, create the service account, create the spreadsheet and share it with the created service account 

1. Make sure that you've set up [Firebase Authentication](https://firebase.google.com/docs/auth) to manage your users.

1. Sign in to your Google account and go to the [Google Cloud Console](https://console.cloud.google.com/).

1. If you haven't created a project yet, click on the dropdown menu at the top of the page next to "Google Cloud Platform" and select "New Project." Otherwise, select the project you want to work with.

1. Give your project a name and click on "Create."

1. Once your project is created, click on the hamburger menu in the top-left corner of the page and select "APIs & Services" > "Dashboard."

1. Click on "Enable APIs and Services" and search for "Google Sheets API." Click on it to enable it for your project.

1. Next, click on "Credentials" in the left-hand sidebar and then click on "Create credentials" > "Service account key."

1. Give your service account a name, select "JSON" as the key type, and click on "Create." This will download a JSON file containing your service account's credentials. Keep this file safe, as you will need it to access the Sheets API. This file contains your service account email address (client_email) and your service account private key (private_key).

1. Now, go to Google Drive and create a new Spreadsheet by clicking on "New" > "Google Sheets.". Look at the URL in your web browser's address bar. The URL will be in the following format: https://docs.google.com/spreadsheets/d/[spreadsheet-id]/edit. The [spreadsheet-id] is a unique identifier for your spreadsheet, and it will be a long string of letters and numbers. 

1. Once your spreadsheet is created, click on "Share" in the top-right corner of the page.

1. In the "Share with people and groups" section, enter the email address associated with your service account (which you can find in the JSON file you downloaded earlier).

1. In the dropdown menu next to the email address, select "Editor" to give your service account permission to edit the spreadsheet.

1. Click on "Send" to share the spreadsheet with your service account.

That's it! You have now created a new Google Cloud project, enabled the Sheets API, created a service account to use this API, and made a new Google Spreadsheet available to this service account. You can now use the credentials in the JSON file to access and modify the spreadsheet via the Sheets API.

<!-- We recommend keeping the following section to explain how billing for Firebase Extensions works -->
# Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

<!-- List all products the extension interacts with -->
- Cloud Functions

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)
