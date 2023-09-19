import { Card } from 'src/components/atoms/card/card';
import { Categories } from 'src/components/atoms/categories/categories';
import { HourlySubmissionsCardProps } from './job-description-card.types';
import css from './job-description-card.module.scss';

export const HourlySubmissionsCard: React.FC<HourlySubmissionsCardProps> = ({
  title,
  start_date,
  end_date,
  submissions,
}) => {
  const createList = submissions.map((item: any) => (
    <div className={css.job__info} key={item.mission}>
      {item.mission} : {item.hours}
    </div>
  ));

  return (
    <Card className={css.job}>
      <span className={css.job__title}>{title}</span>
      <div></div>
      <div className={css.job__footer}>
        <div>
          {start_date} - {end_date}
        </div>
        <div className={submissions.length ? css.submissions : css.nosubmissions}>
          {submissions.length ? <Categories list={createList} /> : 'No submissions yet'}
        </div>
      </div>
    </Card>
  );
};
