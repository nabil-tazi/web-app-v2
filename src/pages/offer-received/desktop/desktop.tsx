import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import Dapp from 'src/dapp';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Divider } from 'src/components/templates/divider/divider';
import { Typography } from 'src/components/atoms/typography/typography';
import { ProfileCard } from 'src/components/templates/profile-card';
import { Button } from 'src/components/atoms/button/button';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { PaymentMethods } from 'src/components/templates/payment-methods';
import { translatePaymentTerms } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { translatePaymentMode } from 'src/constants/PROJECT_PAYMENT_MODE';
import { printWhen } from 'src/core/utils';
import { IdentityReq } from 'src/core/types';
import { useOfferReceivedShared, useWalletShared } from '../offer-received.shared';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { BankAccounts } from 'src/components/templates/bank-accounts';

export const Desktop = (): JSX.Element => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const { offer, media, status, account, isPaidCrypto, isPaid, unit, onAccept, onDeclined, equivalentUSD } =
    useOfferReceivedShared();

  const { form, stripeProfile, stripeLink, onSelectCountry } = useWalletShared();

  const offeredMessageBoxJSX = (
    <div className={css.congratulations}>
      <img src="/icons/mail-inbox-envelope-favorite-white.svg" />
      <div>
        <div className={css.congratulationsText}>Congratulations, you received an offer.</div>
        <div className={css.congratulationsText}>Accept the offer to start working on this job.</div>
      </div>
    </div>
  );

  const acceptedMessageBoxJSX = (
    <div className={css.acceptedMessageBox}>
      <img src="/icons/mail-inbox-envelope-check-black.svg" />
      <div>
        <div className={css.congratulationsText}>You accepted this offer.</div>
        <div className={css.congratulationsText}>
          We are just waiting for the final confirmation from{' '}
          <span className={css.companyName}>{offer.offerer.meta.name}</span> to start the job.
        </div>
      </div>
    </div>
  );

  const withdrawnMessageBoxJSX = (
    <div className={css.acceptedMessageBox}>
      <img src="/icons/mail-inbox-envelope-check-black.svg" />
      <div>
        <div className={css.congratulationsText}>You withdrew this offer.</div>
        <div className={css.congratulationsText}>
          You have already withdrawn the offer from <span className={css.companyName}>{offer.offerer.meta.name}</span>.
        </div>
      </div>
    </div>
  );

  const buttonsJSX = (
    <div className={css.btnContainer}>
      <Button
        onClick={onAccept(offer.id)}
        disabled={(!account && isPaidCrypto) || (!stripeProfile && !isPaidCrypto && isPaid)}
        className={css.btn}
      >
        Accept offer
      </Button>
      <Button onClick={onDeclined(offer.id)} color="white" className={css.btn}>
        Decline
      </Button>
    </div>
  );

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/connection.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Following', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate({ to: `/team/${identity.id}` }) },
  ];

  return (
    <>
      <div className={css.status}>
        {printWhen(offeredMessageBoxJSX, status === 'PENDING')}
        {printWhen(acceptedMessageBoxJSX, status === 'APPROVED')}
        {printWhen(withdrawnMessageBoxJSX, status === 'WITHRAWN')}
      </div>
      <TwoColumnCursor visibleSidebar={isLoggedIn}>
        <div className={css.leftContainer}>
          <ProfileCard />
          <CardMenu title="Network" list={identity.type === 'organizations' ? NetworkMenuListOrg : NetworkMenuList} />
        </div>
        <Card className={css.rightContainer}>
          <div>
            <Accordion title="Job details" id="mission-details">
              <div className={css.missionDetailContainer}>
                <div className={css.missionDetailMessage}>{offer.offer_message}</div>
                <div className={css.detailItemContainer}>
                  <div className={css.detailItem}>
                    <div className={css.detailItemLabel}>Payment type</div>
                    <div className={css.detailItemValue}>{translatePaymentType(offer.project.payment_type)}</div>
                  </div>
                  <div className={css.detailItem}>
                    <div className={css.detailItemLabel}>Payment terms</div>
                    <div className={css.detailItemValue}>{translatePaymentTerms(offer.project.payment_scheme)}</div>
                  </div>
                  <div className={css.detailItem}>
                    <div className={css.detailItemLabel}>Payment mode</div>
                    <div className={css.detailItemValue}>{translatePaymentMode(offer.payment_mode)}</div>
                  </div>
                  <div className={css.detailItem}>
                    <div className={css.detailItemLabel}>Job total</div>
                    <div className={css.detailItemValue}>
                      {offer.assignment_total} <span>{unit}</span>
                      {printWhen(
                        <span className={css.detailItemValue_small}> = {equivalentUSD()} USD</span>,
                        isPaidCrypto
                      )}
                    </div>
                  </div>
                  {/* <div className={css.detailItem}>
                    <div className={css.detailItemLabel}>Due date</div>
                    <div className={css.detailItemValue}>{offer.due_date || 'Unspecified'}</div>
                  </div> */}
                  {printWhen(
                    <div className={css.detailItem}>
                      <div className={css.detailItemLabel}>Estimate total hours</div>
                      <div className={css.detailItemValue}>{offer.total_hours} hrs</div>
                    </div>,
                    offer.project.payment_scheme === 'FIXED'
                  )}
                  {printWhen(
                    <div className={css.detailItem}>
                      <div className={css.detailItemLabel}>Weekly limit</div>
                      <div className={css.detailItemValue}>{offer.weekly_limit} hrs / week</div>
                    </div>,
                    offer.project.payment_scheme === 'HOURLY'
                  )}
                </div>
              </div>
            </Accordion>
            <Accordion title="Job Info" id="job-info">
              <div className={css.jobInfoContainer}>
                <ProfileView
                  img={offer.offerer.meta.image}
                  type={offer.offerer.type}
                  name={offer.offerer.meta.name}
                  username={offer.offerer.meta.shortname}
                  location={`${offer.offerer.meta.city}, ${offer.offerer.meta.country}`}
                />
                <div className={css.jobTitle}>{offer.project.title}</div>
                <Typography lineLimit={7}>{offer.project.description}</Typography>
              </div>
            </Accordion>
            <Accordion title="My application" id="my-application">
              <div className={css.myApplicationContainer}>
                <Divider title="Cover Letter">
                  <Typography>{offer.applicant.cover_letter}</Typography>
                </Divider>
                {printWhen(
                  <Divider title="Resume">
                    <div className={css.uploadedResume}>
                      <img src="/icons/attachment-black.svg" />
                      <a href={media.url} target="_blank">
                        {media.filename}
                      </a>
                    </div>
                  </Divider>,
                  !!media.url
                )}
              </div>
            </Accordion>
            <Accordion title={`About ${offer.organization.name}`} id="about-company">
              <div className={css.aboutCompany}>
                <Typography>{offer.organization.bio}</Typography>
              </div>
            </Accordion>
          </div>
          {printWhen(
            <div className={css.wallet}>
              <PaymentMethods crypto_method={<Dapp.Connect />} />
            </div>,
            isPaidCrypto
          )}
          {printWhen(
            <Dropdown
              register={form}
              name="country"
              label="Country"
              placeholder="country"
              list={COUNTRIES}
              onValueChange={(selected) => onSelectCountry(selected.value as string)}
            />,
            !isPaidCrypto && !stripeProfile
          )}
          {printWhen(
            <BankAccounts accounts={stripeProfile} isDisabled={!stripeLink} bankAccountLink={stripeLink} />,
            !isPaidCrypto && isPaid
          )}
          {printWhen(buttonsJSX, status === 'PENDING')}
        </Card>
      </TwoColumnCursor>
    </>
  );
};
