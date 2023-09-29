import { post, get } from '../http';
import { SuccessRes, PaginateReq, PaginateRes } from '../types';
import { MembersRes, Organization, OrganizationReq, OrganizationsRes } from './organizations.types';

export async function organizations(params: PaginateReq): Promise<OrganizationsRes> {
  return (await get<OrganizationsRes>('orgs', { params })).data;
}

export async function createOrganization(payload: OrganizationReq): Promise<Organization> {
  return (await post<Organization>('orgs', payload)).data;
}

export async function getOrganization(id: string): Promise<Organization> {
  return (await get<Organization>(`orgs/${id}`)).data;
}

export async function updateOrganization(id: string, payload: OrganizationReq): Promise<Organization> {
  return (await post<Organization>(`orgs/update/${id}`, payload)).data;
}

export async function getOrganizationMembers(id: string, params: PaginateReq): Promise<MembersRes> {
  return (await get<MembersRes>(`orgs/${id}/members`, { params })).data;
}

export async function addOrganizationMember(orgId: string, memberId: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`orgs/${orgId}/members/${memberId}`, {})).data;
}

export async function removeOrganizationMember(orgId: string, memberId: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`orgs/remove/${orgId}/members/${memberId}`, {})).data;
}

export async function hiring(): Promise<boolean> {
  return (await post<{ hiring: boolean }>('orgs/hiring', {})).data.hiring;
}
