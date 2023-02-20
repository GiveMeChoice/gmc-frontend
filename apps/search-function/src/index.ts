import Client from '@elastic/elasticsearch/lib/client';
import * as functions from 'firebase-functions';
import { defineString } from 'firebase-functions/params';

const elasticNode = defineString('ELASTIC_NODE');
const elasticUsername = defineString('ELASTIC_USERNAME');
const elasticPassword = defineString('ELASTIC_PASSWORD');

export const searchFunction = functions.https.onCall(async (data, context) => {
  const elasticClient = new Client({
    node: elasticNode.value(),
    auth: {
      username: elasticUsername.value(),
      password: elasticPassword.value(),
    },
  });
  return await elasticClient.search({ q: data.query });

  // const { query } = data;
  // functions.logger.info(`Searching for: ${query}`);
  // functions.logger.info(
  //   `Query by user ${context.auth ? context.auth.uid : 'anonymous'}`
  // );
  // try {
  //   const response = await axios.get(
  //     `${elasticHost.value()}/gmc_search/_search${query ? `?q=${query}` : ''}`,
  //     {
  //       headers: { Authorization: `ApiKey ${elasticKey.value()}` },
  //     }
  //   );
  //   return response.data;
  // } catch (error) {
  //   functions.logger.error(error);
  //   return { status: 'Error' };
  // }
});
