import { IData, DataAction } from '@root/context-providers/data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IScreenControl } from './screen-controls.service';
import { PageRequest } from './shared/page-request.interface';

export interface IJobStatus {
  name: string;
  schedule: string;
  running: boolean;
  last: IJobResult[];
  next: Date[];
}

export interface IJobResult {
  runAt: Date;
  runTime: number;
  status: 'SUCCESS' | 'ERROR';
  message: string;
}

const getAll = async (): Promise<IJobStatus[]> => {
  const res = await axios.get<IJobStatus[]>('/jobs');
  return res.data;
};

const getOne = async (name: string): Promise<IJobStatus> => {
  const res = await axios.get<IJobStatus>(`/jobs/${name}`);
  return res.data[0];
};

const execute = async (name: string): Promise<IJobResult> => {
  const res = await axios.post<IJobResult>(`/jobs/${name}/execute`);
  return res.data;
};

const start = async (name: string): Promise<IJobStatus> => {
  const res = await axios.post<IJobStatus>(`/jobs/${name}/start`);
  return res.data;
};

const stop = async (name: string): Promise<IJobStatus> => {
  const res = await axios.post<IJobStatus>(`/jobs/${name}/stop`);
  return res.data;
};

const reschedule = async (
  name: string,
  schedule: string
): Promise<IJobStatus> => {
  const res = await axios.post<IJobStatus>(`/jobs/${name}/reschedule`, {
    cron: schedule,
  });
  return res.data;
};

const jobsScreenControl: IScreenControl = {
  pathname: '/jobs',
  title: 'Jobs',
  readScreenMeta() {
    return null;
  },
  refreshData() {
    return null;
  },
  refreshPage() {
    return null;
  },
  refreshSort() {
    return null;
  },
};

const jobsService = {
  getOne,
  getAll,
  execute,
  start,
  stop,
  reschedule,
  jobsScreenControl,
};
export default jobsService;
