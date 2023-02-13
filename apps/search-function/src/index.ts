import axios from 'axios';
import * as functions from 'firebase-functions';
import { defineString } from 'firebase-functions/params';

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

const elasticHost = defineString('ELASTIC_HOST');
const elasticKey = defineString('ELASTIC_KEY');

export const search = functions.https.onCall(async (data, context) => {
  //}.onRequest(async (req, res) => {
  try {
    const response = await axios.get(
      `${elasticHost.value()}/gmc_search/_search`,
      {
        headers: { Authorization: `ApiKey ${elasticKey.value()}` },
      }
    );
    functions.logger.info('successfully queried elastic');
    return response.data;
  } catch (error) {
    functions.logger.error(error);
    return { status: 'Error' };
  }
});

// functions.https.onRequest((request, response) => {

//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });
