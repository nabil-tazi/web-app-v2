import css from './menu-cursor.module.scss';
import { Outlet, useLocation } from '@tanstack/react-location';
import { Avatar } from '../../atoms/avatar/avatar';
import { Menu, getAvatar, menuList } from './menu-cursor.services';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { IdentityReq } from 'src/core/types';
import { SwitchAccount } from './components/switch-account/switch-account';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { Search } from 'src/components/atoms/search/search';
import { PayloadModel } from 'src/pages/search/desktop/search.types';

export const MenuCursor = (): JSX.Element => {
  const navigate = useNavigate();
  const route = useLocation();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const [accListVisibility, setAccListVisibility] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  function navigateToSearch(q: string) {
    navigate({
      to: '/d/search',
      search: (p: PayloadModel) => {
        const type = p.type ?? 'projects';
        const page = p.page ?? 1;
        return { type, q, page };
      },
    });
  }

  function onMenuItemClick(menu: Menu) {
    if (route.current.pathname !== menu.link) {
      setSearchValue('');
    }
    navigate({ to: menu.link });
  }

  return (
    <div className={css.container}>
      <div className={css.menu}>
        <div className={css.menuItems}>
          <div className={css.logo}>
            <img style={{ minWidth: 32 }} height={32} src="/icons/logo-white.svg" />
          </div>
          <Search
            onEnter={navigateToSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            marginRight="auto"
            placeholder="Search"
          />
          <ul className={css.navContainer}>
            {menuList.map((item) => (
              <li key={item.label} className={css.navItem} onClick={() => onMenuItemClick(item)}>
                <img className={css.navIcon} height={24} src={item.icon} />
                <div className={css.navLabel}>{item.label}</div>
              </li>
            ))}
          </ul>
          <div className={css.avatar}>
            <Avatar
              onClick={() => {
                setAccListVisibility(!accListVisibility);
              }}
              size="2rem"
              type={identity.type}
              img={getAvatar(identity)}
            />
            <div className={css.switchAccountMenu}>
              <SwitchAccount identity={identity} open={accListVisibility} onClose={() => setAccListVisibility(false)} />
            </div>
          </div>
        </div>
      </div>
      <div className={css.body}>
        <Outlet />
      </div>
    </div>
  );
};
