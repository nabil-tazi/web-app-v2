import { MissionsResp, StripeLinkResp, StripeProfileResp } from 'src/core/types';

export type Resolver = {
  missionsList: MissionsResp;
  stripeProfile: StripeProfileResp;
  jpStripeProfile: StripeProfileResp;
};

export type RespPayout = { message: string; transaction_id: string };
