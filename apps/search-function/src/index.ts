import axios from 'axios';
import * as functions from 'firebase-functions';
import { defineString } from 'firebase-functions/params';

const elasticHost = defineString('ELASTIC_HOST');
const elasticKey = defineString('ELASTIC_KEY');

export const search = functions.https.onCall(async (data, context) => {
  const { query } = data;
  functions.logger.info(`Searching for: ${query}`);
  functions.logger.info(
    `Query by user ${context.auth ? context.auth.uid : 'anonymous'}`
  );
  try {
    const response = await axios.get(
      `${elasticHost.value()}/gmc_search/_search${query ? `?q=${query}` : ''}`,
      {
        headers: { Authorization: `ApiKey ${elasticKey.value()}` },
      }
    );
    return response.data;
  } catch (error) {
    functions.logger.error(error);
    return { status: 'Error' };
  }
});
