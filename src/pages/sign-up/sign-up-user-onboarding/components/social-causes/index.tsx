import React, { useContext, useState } from 'react';
import css from './social-causes.module.scss';
import { Button } from '../../../../../components/atoms/button/button';
import { CategoriesClickable } from '../../../../../components/atoms/categories-clickable/categories-clickable';
import { Search } from '../../../../../components/atoms/search/search';
import { SOCIAL_CAUSES } from '../../../../organization-create/social-causes/social-causes.services';
import StepHeader from '../stepHeader';
import { StepsContext } from '../steper';
import { useUser } from '../../sign-up-user-onboarding.context';
import { isValidArrayRange } from '../../sign-up-user-onboarding.service';

const SocialCauses: React.FC = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const { state, updateUser } = useUser();
  const [list, setList] = useState(SOCIAL_CAUSES);
  const updateSocialCauses = (social_causes: Array<string>) => {
    updateUser({ ...state, social_causes });
  };
  function onSearch(value: string) {
    const filtered = SOCIAL_CAUSES.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
    setList(filtered);
  }

  return (
    <>
      <div className={css['container']}>
        <StepHeader
          title="What are your social causes?"
          subTitle="Select up to 5 social causes that you are passionate about"
        />
      </div>
      <div className={css['search']}>
        <Search width="100%" placeholder="Search" onValueChange={onSearch} />
      </div>
      <div className={css['tags']}>
        <div className={css['tags__title']}>Popular</div>
        <CategoriesClickable
          clickable
          onChange={updateSocialCauses}
          list={list}
          selected={state?.social_causes || []}
        />
      </div>
      <div className={css['buttons']}>
        <Button disabled={!isValidArrayRange(state.social_causes, 0, 5)} onClick={() => updateSelectedStep(2)}>
          Continue
        </Button>
      </div>
    </>
  );
};

export default SocialCauses;
