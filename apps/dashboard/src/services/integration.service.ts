import axios from 'axios';
import { IRun } from './runs.service';

const integrateChannel = async (channelId: string): Promise<IRun> => {
  const res = await axios.post<IRun>(
    '/integration/integrate-channel',
    {},
    {
      params: {
        channelId,
      },
    }
  );
  return res.data;
};

const integrationService = {
  integrateChannel,
};
export default integrationService;
