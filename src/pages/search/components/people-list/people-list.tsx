import css from './people-list.module.scss';
import { People, PeopleListProps } from './people-list.types';
import { Card } from 'src/components/atoms/card/card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Categories } from 'src/components/atoms/categories/categories';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { socialCausesToCategory } from 'src/core/adaptors';
import { toRelativeTime } from 'src/core/relative-time';
import { getList } from './people-list.services';
import { printWhen } from 'src/core/utils';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';

export const PeopleList = (props: PeopleListProps): JSX.Element => {
  const { data, onMorePageClick, showMorePage, ...rest } = props;

  const seeMoreJSX = (
    <div className={css.seeMore} onClick={() => onMorePageClick()}>
      See more
    </div>
  );

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }

  const location = (user: People) =>
    `${user.city}, ${getCountryName(user.country as keyof typeof COUNTRIES_DICT | undefined)}`;

  return (
    <div style={rest} className={css.container}>
      {data.map((user) => {
        return (
          <Card key={user.id} cursor="pointer" onClick={() => props.onClick(user)}>
            <div className={css.header}>
              <Avatar
                type="users"
                img={user?.avatar?.url}
                {...(user.open_to_work
                  ? { badge: { color: '#004a46', image: '/icons/available.svg', width: '24px', height: '24px' } }
                  : {})}
              />
              <div className={css.orgNameAndLocation}>
                <div>{`${user.first_name} ${user.last_name}`} </div>
                <div className={css.orgLocation}>{location(user)}</div>
              </div>
            </div>
            <div className={css.body}>
              <div className={css.bio}>{user.bio}</div>
              <Categories marginBottom="1rem" list={getList(user)} />
              <CategoriesClickable marginBottom="1rem" list={socialCausesToCategory(user.social_causes)} />
            </div>
            <div className={css.footer}>
              <>{toRelativeTime(user.created_at)}</>
              {user.open_to_volunteer && (
                <div className={css.volunteer}>
                  <img src="/icons/volunteer.svg" />
                  Open to volunteer
                </div>
              )}
            </div>
          </Card>
        );
      })}

      {printWhen(seeMoreJSX, showMorePage)}
    </div>
  );
};
