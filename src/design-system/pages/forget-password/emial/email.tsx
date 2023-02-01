
import { useNavigate } from '@tanstack/react-location';
import { Button } from '../../../atoms/button/button';
import { Input } from '../../../atoms/input/input';
import css from './email.module.scss';

export const Email = () => {
    const navigate = useNavigate();

    const navigateToOtp = () => {
        navigate({ to: '../otp' });
    }

    return (
        <div className={css.container}>
            <div className={css.header}>
                <img src="/icons/chevron-left.svg" alt="" />
            </div>
            <div className={css.main}>
                <div className={css.forgetPass}>
                    <div className={css.title}>Forget your password</div>
                    <div className={css.input}>
                        <Input variant='outline' placeholder='Email' label='Email' />
                    </div>
                </div>
            </div>
            <div className={css.footer}>
                <Button color='blue' onClick={navigateToOtp}>
                    Get a verification code
                </Button>
            </div>
        </div>
    )
}