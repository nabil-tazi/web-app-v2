import { Pagination } from '../../../core/types';
import { JobCardProps } from '../../../components/molecules/job-card/job-card.types';

export type PendingResp = Pagination<JobCardProps[]>;
export type AwaitingResp = Pagination<JobCardProps[]>;
export type DeclinedResp = Pagination<JobCardProps[]>;
export type OnGoingResp = Pagination<JobCardProps[]>;
export type EndedResp = Pagination<JobCardProps[]>;

export type Loader = {
  pendingApplicants: PendingResp;
  awaitingApplicants: AwaitingResp;
  declinedApplicants: DeclinedResp;
  onGoingApplicants: OnGoingResp;
  endedApplicants: EndedResp
};

export type MyJobs = 'Applied' | 'Hired';