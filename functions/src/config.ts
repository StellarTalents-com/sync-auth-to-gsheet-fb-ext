/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Config } from "./types";

const config: Config = {
  location: process.env.LOCATION!,
  serviceAccountEmail: process.env.SERVICE_ACCOUNT_EMAIL!,
  serviceAccountKey: process.env.SERVICE_ACCOUNT_KEY!,
  spreadsheetId: process.env.SPREADSHEET_ID!,
};

export default config;
