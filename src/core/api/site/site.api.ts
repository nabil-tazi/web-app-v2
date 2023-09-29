import { post, get } from '../http';
import { CurrentIdentity, Device, DeviceReq, SearchReq } from './site.type';
import { SuccessRes, PaginateReq, PaginateRes } from '../types';
import { OrganizationsRes } from '../organizations/organizations.types';
import { JobsRes } from '../jobs/jobs.types';
import { PostsRes } from '../posts/posts.types';
import { UsersRes } from '../users/users.types';

export async function search(payload: SearchReq, params: PaginateReq) {
  const { data } = await post<PaginateRes>('search', payload, { params });
  switch (payload.type) {
    case 'organizations':
      return data as OrganizationsRes;
    case 'projects':
      return data as JobsRes;
    case 'posts':
      return data as PostsRes;
    case 'users':
      return data as UsersRes;
    default:
      return data;
  }
}

export async function identities(): Promise<CurrentIdentity[]> {
  return (await get<CurrentIdentity[]>('identities')).data;
}

export async function devices(): Promise<Device[]> {
  return (await get<Device[]>('devices')).data;
}

export async function newDevice(payload: DeviceReq): Promise<Device> {
  return (await post<Device>('devices', payload)).data;
}
