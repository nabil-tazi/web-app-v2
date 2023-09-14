import { ConnectionItem, Pagination } from 'src/core/types';

export type ProfileReq = {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar?: { url: string; id: string };
  bio: string;
  description: string;
  email: string;
  phone: string;
  city: string;
  type: string;
  address: string;
  website: string;
  created_at: string;
  proofspace_connect_id: null | string;
  updated_at: string;
  social_causes: string[];
  followers: number;
  followings: number;
  country: string;
  wallet_address: string;
  impact_points: number;
  mission: string;
  culture: string;
  image: {
    id: string;
    identity_id: string;
    filename: string;
    url: string;
    created_at: string;
  };
  cover_image?: {
    id: string;
    identity_id: string;
    filename: string;
    url?: string;
    created_at: string;
  };
  mobile_country_code: string;
  created_by: string;
  shortname: string;
  old_id: number;
  status: string;
  skills?: string[];
  search_tsv: string;
  other_party_id: string;
  other_party_title: string;
  other_party_url: string;
  geoname_id: string;
  hiring: boolean;
};

export type Resolver = {
  user: ProfileReq;
};
