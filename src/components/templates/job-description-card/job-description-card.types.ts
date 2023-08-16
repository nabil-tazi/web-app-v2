import { ProfileViewProps } from "src/components/molecules/profile-view/profile-view.types";

export interface JobDescriptionCardProps extends ProfileViewProps {
  job_title: string;
  start_date: string;
  end_date: string;
  info_list: { icon: string; name: string | number }[];
  total_mission: number;
  unit?: string;
  containerClassName?: string;
  payment_scheme?: string;
}
