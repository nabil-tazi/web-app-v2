import { printWhen } from '../../../utils/utils';
import { ChatBox } from '../../atoms/chat-box/chat-box';
import { Typography } from '../../atoms/typography/typography';
import { ProfileView } from '../profile-view/profile-view';
import css from './applicant-list.module.scss';
import { Applicant, ApplicantListProps } from './applicant-list.types';

export const ApplicantList = (props: ApplicantListProps): JSX.Element => {
  const hireBtn = (
    <div className={css.footerItem}>
      <img src="/icons/user-accept-blue.svg" />
      <div className={css.footerLabel}>Hire</div>
    </div>
  );

  const rejectBtn = (
    <div className={css.footerItem}>
      <img src="/icons/user-reject-blue.svg" />
      <div className={css.footerLabel}>Reject</div>
    </div>
  );

  const applicantJSX = (applicant: Applicant) => {
    return (
      <div key={applicant.id} className={css.applicantContainer}>
        <ProfileView name={applicant.name} img={applicant.image} type="users" />
        <div className={css.applyDate}>{applicant.applyDate}</div>
        <ChatBox type="receiver">
          <Typography lineLimit={3}>{applicant.coverLetter}</Typography>
        </ChatBox>
        <div className={css.applicantFooter}>
          <>
            {printWhen(hireBtn, props.hireable)}
            {printWhen(rejectBtn, props.hireable)}
            <div className={css.footerItem}>
              <img src="/icons/message-blue.svg" />
              <div className={css.footerLabel}>Message</div>
            </div>
          </>
        </div>
      </div>
    );
  };

  return <div className={css.container}>{props.list.map((item) => applicantJSX(item))}</div>;
};
