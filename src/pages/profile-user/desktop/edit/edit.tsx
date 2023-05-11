import { Header } from 'src/components/atoms/header-v2/header';
import css from './edit.module.scss';
import { Modal } from 'src/components/templates/modal/modal';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';
import { Category } from 'src/components/molecules/category/category';
import { skillsToCategoryAdaptor, socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { ProfileReq } from 'src/pages/profile-organization/profile-organization.types';
import { useMatch } from '@tanstack/react-location';
import { useMemo } from 'react';
import { useForm } from 'src/core/form/useForm/useForm';
import { useProfileUserEditShared } from 'src/pages/profile-user-edit/profile-user-edit.shared';
import { generateFormModel } from 'src/pages/profile-user-edit/profile-user-edit.form';
import { Input } from 'src/components/atoms/input/input';
import { EditProps } from './edit.types';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { endpoint } from 'src/core/endpoints';

export const Edit = (props: EditProps): JSX.Element => {
  const user = useMatch().data.user as ProfileReq;
  const formModel = useMemo(() => generateFormModel(user), []);
  const form = useForm(formModel);

  const { onCoverEdit, onAvatarEdit, onCountryUpdate, coverImage, avatarImage, cities } = useProfileUserEditShared();

  function onSave() {
    const payload = getFormValues(form);
    endpoint.post.user['update/profile'](payload).then(() => {
      props.onClose();
    });
  }

  return (
    <Modal height={props.height} width={props.width} open={props.open} onClose={props.onClose}>
      <div className={css.container}>
        <div className={css.mainHeader}>
          <Header onBack={props.onClose} title="Edit" right={{ label: 'Save', onClick: onSave }} />
        </div>
        <div>
          <div>
            <div className={css.header}>
              <div className={css.coverImage} style={{ backgroundImage: `url(${coverImage})` }} />
              <div className={css.photoIcon} onClick={onCoverEdit}>
                <img src="/icons/photos-white.svg" />
              </div>
              <div className={css.profileImgContainer}>
                <div className={css.photoIcon} onClick={onAvatarEdit}>
                  <img src="/icons/photos-white.svg" />
                </div>
                <div className={css.profileImage} style={{ backgroundImage: `url(${avatarImage})` }} />
              </div>
            </div>
          </div>
          <div className={css.formContainer}>
            <Input register={form} label="First name" name="first_name" placeholder="first name" />
            <Input register={form} label="Last name" name="last_name" placeholder="last name" />
            <Input register={form} label="Username" name="username" placeholder="username" />
            <Textarea register={form} label="Bio" name="bio" placeholder="biography" />
            <Textarea register={form} label="Mission" name="mission" placeholder="mission" />
            <Category
              register={form}
              name="social_causes"
              label="Social causes"
              list={socialCausesToCategoryAdaptor()}
              placeholder="Social causes"
            />
            <Category
              register={form}
              name="skills"
              label="Skills"
              list={skillsToCategoryAdaptor()}
              placeholder="skills"
            />
            <Textarea register={form} label="Address" name="address" placeholder="address" />
            <Dropdown
              register={form}
              label="Country"
              name="country"
              list={COUNTRIES}
              placeholder="country"
              onValueChange={onCountryUpdate}
            />
            <Dropdown
              register={form}
              label="City"
              name="city"
              list={cities}
              placeholder="city"
              onValueChange={(option) => form.controls.geoname_id.setValue(option.id)}
            />
            <div>
              <div className={css.label}>Phone</div>
              <div className={css.phoneContainer}>
                <Dropdown register={form} name="mobile_country_code" placeholder="+1" list={COUNTRY_CODES} />
                <Input register={form} name="phone" placeholder="phone" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
