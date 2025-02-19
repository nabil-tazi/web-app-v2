import { useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { JobCardList } from 'src/components/organisms/job-card-list/job-card-list';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { ProfileCard } from 'src/components/templates/profile-card';
import { printWhen } from 'src/core/utils';
import { IdentityReq } from 'src/core/types';
import { MyJobs } from '../my-jobs.types';
import { useMyJobShared } from '../my-jobs.shared';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';

export const Desktop: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const {
    pendingList,
    updatePendingList,
    awaitingList,
    updateAwaitingList,
    declinedList,
    updateDeclinedList,
    onGoingList,
    updateOnGoingList,
    endedList,
    updateEndedList,
    defaultTab,
    navigateToJobDetail,
  } = useMyJobShared();
  const [myJobsMode, setMyJobsMode] = useState<MyJobs>(defaultTab);

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/connection.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Following', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate({ to: `/team/${identity.id}` }) },
  ];

  const JobsMenuList = [
    {
      label: 'Applied',
      icon: '/icons/my-applications.svg',
      link: () => {
        setMyJobsMode('Applied');
        navigate({ to: '.', search: { tab: 'Applied' }, replace: true });
      },
    },
    {
      label: 'Hired',
      icon: '/icons/hired-jobs.svg',
      link: () => {
        setMyJobsMode('Hired');
        navigate({ to: '.', search: { tab: 'Hired' }, replace: true });
      },
    },
  ];

  const myJobsAppliedJSX = (
    <Card className={css.webCard}>
      <Accordion id="Pending" title={`Pending (${pendingList.total_count})`}>
        {printWhen(
          <div className={css.listContainer}>
            <JobCardList
              list={pendingList.items}
              onClick={navigateToJobDetail}
              totalCount={pendingList.total_count}
              onSeeMoreClick={updatePendingList}
            />
          </div>,
          !!pendingList.items.length
        )}
      </Accordion>
      <Accordion id="awaiting-review" title={`Awaiting review (${awaitingList.total_count})`}>
        {printWhen(
          <div className={css.listContainer}>
            <JobCardList
              list={awaitingList.items}
              onItemClick={(id) => navigate({ to: `/jobs/received-offer/${id}/d` })}
              totalCount={awaitingList.total_count}
              onSeeMoreClick={updateAwaitingList}
            />
          </div>,
          !!awaitingList.items.length
        )}
      </Accordion>
      <Accordion id="declined" title={`Declined (${declinedList.total_count})`} no_border>
        {printWhen(
          <div className={css.listContainer}>
            <JobCardList
              list={declinedList.items}
              onClick={navigateToJobDetail}
              totalCount={declinedList.total_count}
              onSeeMoreClick={updateDeclinedList}
            />
          </div>,
          !!declinedList.items.length
        )}
      </Accordion>
    </Card>
  );

  const myJobsHiredJSX = (
    <Card className={css.webCard}>
      <Accordion id="on-going" title={`On-Going (${onGoingList.total_count})`}>
        {printWhen(
          <div className={css.listContainer}>
            <JobCardList
              list={onGoingList.items}
              onItemClick={(id) => navigate({ to: `/d/jobs/applied/complete-mission/${id}` })}
              totalCount={onGoingList.total_count}
              onSeeMoreClick={updateOnGoingList}
            />
          </div>,
          !!onGoingList.items.length
        )}
      </Accordion>
      <Accordion id="ended" title={`Ended (${endedList.total_count})`} no_border>
        {printWhen(
          <div className={css.listContainer}>
            <JobCardList
              list={endedList.items}
              onClick={navigateToJobDetail}
              totalCount={endedList.total_count}
              onSeeMoreClick={updateEndedList}
            />
          </div>,
          !!endedList.items.length
        )}
      </Accordion>
    </Card>
  );

  return (
    <TwoColumnCursor visibleSidebar={isLoggedIn}>
      <div className={css.leftContainer}>
        <ProfileCard />
        <CardMenu title="Network" list={identity.type === 'organizations' ? NetworkMenuListOrg : NetworkMenuList} />
        <CardMenu title="My Jobs" list={JobsMenuList} />
      </div>
      <div className={css.rightContainer}>
        <Card className={css.created}>{myJobsMode}</Card>
        {printWhen(myJobsAppliedJSX, myJobsMode === 'Applied')}
        {printWhen(myJobsHiredJSX, myJobsMode === 'Hired')}
      </div>
    </TwoColumnCursor>
  );
};
