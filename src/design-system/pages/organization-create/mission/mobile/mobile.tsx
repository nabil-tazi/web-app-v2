import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../../atoms/button/button';
import { Steps } from '../../../../atoms/steps/steps';
import { Textarea } from '../../../../atoms/textarea/textarea';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: '../profile' })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.stepsContainer}>
          <Steps clickable={false} length={6} current={4} />
        </div>
        <div className={css.skip}>Skip</div>
      </div>
      <div className={css.question}>What's your organization's mission?</div>
      <div className={css.main}>
        <Textarea variant="outline" placeholder="Your organization's mission" />
      </div>
      <div className={css.bottom}>
        <Button onClick={() => navigate({ to: '../culture' })}>Continue</Button>
      </div>
    </div>
  );
};
