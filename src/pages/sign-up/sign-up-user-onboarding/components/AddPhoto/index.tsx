import React, { useState } from 'react';
import css from './addphoto.module.scss';
import { Button } from 'src/components/atoms/button/button';
import { Camera } from '@capacitor/camera';
import { uploadImage } from 'src/pages/profile-user-edit/profile-user-edit.services';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { useUser } from '../../sign-up-user-onboarding.context';

import { useNavigate } from '@tanstack/react-location';
import { post } from 'src/core/http';
import { removeValuesFromObject } from 'src/core/utils';

const AddPhoto: React.FC = () => {
  const navigate = useNavigate();
  const { state, updateUser } = useUser();
  const [image, setImage] = useState({ imageUrl: state.avatar?.url, id: '' });
  const onUploadImage = async () => {
    const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
    const resp = await uploadImage(webPath);
    updateUser({ ...state, avatar: resp });
    setImage({ imageUrl: resp.url, id: resp.id });
  };
  const removeImage = async () => {
    setImage({ imageUrl: '', id: '' });
    updateUser({ ...state, avatar: null });
  };
  const updateProfile = () => {
    const avatarImage = state.avatar ? { avatar: image.id } : {};
    post(
      '/user/update/profile',
      removeValuesFromObject(
        {
          ...state,
          ...avatarImage,
        },
        ['', null]
      )
    ).then(() => {
      navigate({ to: '/sign-up/user/allow-notification' });
    });
  };
  return (
    <div className={css['container']}>
      <div className={css['form']}>
        <div className={css['title']}> Add a profile photo</div>

        <Avatar size="128px" type="users" img={image.imageUrl} />
        {state.avatar === null && (
          <Button className={css['submit']} color="white" onClick={onUploadImage}>
            Add from album
          </Button>
        )}
        {state.avatar !== null && (
          <Button className={css['submit']} color="white" onClick={removeImage}>
            Remove photo
          </Button>
        )}
      </div>
      <div className={css['buttons']}>
        <Button onClick={updateProfile}>Compelete your profile</Button>
      </div>
    </div>
  );
};

export default AddPhoto;
