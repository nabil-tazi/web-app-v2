import { toRelativeTime } from '../../../core/relative-time';
import { ActionList } from '../../atoms/action-list/action-list';
import { Avatar } from '../../atoms/avatar/avatar';
import { Card } from '../../atoms/card/card';
import { CategoriesClickable } from '../../atoms/categories-clickable/categories-clickable';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Typography } from '../../atoms/typography/typography';
import { FeedItemProps } from './feed-item.types';
import css from './feed-item.module.scss';

export const FeedItem = (props: FeedItemProps): JSX.Element => {
  const { id, type, actionList, date, lineLimit = 3, img, name, categories, imgAvatar } = props;

  return (
    <Card>
      <div className={css.header}>
        <div className={css.info}>
          <Avatar onClick={props.onAvatarClick} type={type} size="2rem" img={imgAvatar} />
          <span>{name}</span>
          <span className={css.date}>{toRelativeTime(date)}</span>
        </div>
        <div className={css.icon} onClick={props.onMoreClick}>
          <img src="/icons/three-dots-blue.svg" />
        </div>
      </div>
      <div className={css.img}>
        <img src={img} />
      </div>
      <CategoriesClickable list={props.categories} />
      <div className={css.text}>
        <Typography type="body" lineLimit={lineLimit} size="s2">
          <ExpandableText text={props.text} />
        </Typography>
      </div>
      <div>
        <ActionList list={actionList} />
      </div>
    </Card>
  );
};
