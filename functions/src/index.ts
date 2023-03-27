import * as functions from "firebase-functions";
import { google } from "googleapis";
import { sheets_v4 } from "googleapis/build/src/apis/sheets/v4";
import config from "./config";

const sheetId = 0;

const queryData = async ({ sheets, spreadsheetId }: { sheets: sheets_v4.Sheets; spreadsheetId: string }) => {
  const gridRange = {
    sheetId,
    startRowIndex: 0,
    startColumnIndex: 0,
    endColumnIndex: 1,
  };
  const request: sheets_v4.Params$Resource$Spreadsheets$Getbydatafilter = {
    spreadsheetId,
    requestBody: {
      dataFilters: [{
        gridRange,
      }],
    },
  };

  const response = await sheets.spreadsheets.values.batchGetByDataFilter(request);
  const { data } = response;
  const values = data.valueRanges?.[0]?.valueRange?.values || [];

  return values;
};

export const addUserToGSheet = functions.auth
  .user()
  .onCreate(async (user): Promise<void> => {
    const { email } = user;
    if (!email) {
      return;
    }

    try {
      let { serviceAccountEmail, serviceAccountKey, spreadsheetId } = config;
      serviceAccountKey = serviceAccountKey.replace(/\\n/gm, "\n");
      const scope = ["https://www.googleapis.com/auth/spreadsheets"];
      const auth = new google.auth.JWT(serviceAccountEmail, "", serviceAccountKey, scope);
      await auth.authorize();
      google.options({ auth });

      const sheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth });
      const values = await queryData({ sheets, spreadsheetId });
      const arr = values.map((el: Array<string>) => el[0]);
      if (arr.includes(email)) {
        return;
      }

      const startRowIndex = arr.length;
      const request: sheets_v4.Params$Resource$Spreadsheets$Batchupdate = {
        spreadsheetId,
        requestBody: {
          requests: [{
            updateCells: {
              range: {
                sheetId,
                startRowIndex,
                endRowIndex: startRowIndex + 1,
                startColumnIndex: 0,
                endColumnIndex: 1,
              },
              rows: [{
                values: [{
                  userEnteredValue: { "stringValue": email },
                }],
              }],
              fields: "userEnteredValue",
            },
          }],
        },
      };

      sheets.spreadsheets.batchUpdate(request).catch((e) => {
        functions.logger.error(`Exception batchUpdating the ${email}`, e.message);
      });
    } catch (e) {
      if (e instanceof Error) {
        functions.logger.error(`Exception for the ${email}`, e.message);
      } else {
        functions.logger.error(`Unexpected error for the ${email}`, e);
      }
    }
  });
