import { Button } from 'src/components/atoms/button/button';
import { Header } from 'src/components/atoms/header/header';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { printWhen } from 'src/core/utils';
import { formatDate } from 'src/core/time';
import { useSubmittedHoursShared } from '../submit-hours.shared';
import css from './mobile.module.scss';
import { Card } from 'src/components/atoms/card/card';
import { Input } from 'src/components/atoms/input/input';

export const Mobile = (): JSX.Element => {
  const {
    offer,
    media,
    status,
    onCompleteMission,
    onSubmitHours,
    onStopMission,
    mission,
    form,
    onCancel,
    selectedWeek,
    nextWeek,
    previousWeek,
    isSelectedWeekCurrent,
  } = useSubmittedHoursShared();

  function onSubmit() {
    onSubmitHours();
    history.back();
  }

  const hourlyButtonsJSX = (
    <div className={css.btnContainer}>
      <Button onClick={onSubmit}>Submit Hours</Button>
      <Button onClick={onCancel} color="white">
        Cancel
      </Button>
    </div>
  );
  return (
    <TopFixedMobile>
      <Header title="Submit hours" onBack={() => history.back()} />
      <div className={css.body}>
        <div className={css.jobInfoContainer}>
          <Card className={css.weekSelector}>
            <img src="/icons/chevron-left.svg" onClick={previousWeek} />
            {formatDate(selectedWeek.start_at)} - {formatDate(selectedWeek.end_at)},{' '}
            {selectedWeek.end_at.substring(0, 4)}
            <img
              className={`${css.rightChevron} ${isSelectedWeekCurrent() ? css.currentWeek : css.rightChevron}`}
              src="/icons/chevron-left.svg"
              onClick={nextWeek}
            />
          </Card>
          <Card>
            <div className={css.jobTitle}>{offer.project.title}</div>
            <ProfileView
              img={offer.offerer.meta.image}
              type={offer.offerer.type}
              name={offer.offerer.meta.name}
              username={offer.offerer.meta.shortname}
              location={`${offer.offerer.meta.city}, ${offer.offerer.meta.country}`}
            />
            <div className={css.agreement}>
              <span className={css.title}>Agreement : </span>
              <span className={css.subtitle}>
                {mission.offer.weekly_limit} Max {offer.total_hours} hrs / week
              </span>
            </div>
          </Card>
          <Card className={css.card}>
            <Input className={css.input} register={form} name="total_hours" placeholder="10:00" label="Input hours" />
          </Card>
        </div>
        {printWhen(hourlyButtonsJSX, true)}
      </div>
    </TopFixedMobile>
  );
};
