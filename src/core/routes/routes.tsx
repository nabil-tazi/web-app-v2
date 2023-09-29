import { Navigate, Route } from '@tanstack/react-location';
import { getChatsSummery, getFollowings } from '../../pages/chat/contact-list/contact-list.services';
import { MenuCursor as RootCursorLayout } from '../../components/templates/menu-cursor/menu-cursor';
import { MenuTouch as RootTouchLayout } from '../../components/templates/menu-touch/menu-touch';
import { isTouchDevice } from '../device-type-detector';
import { getMessagesById, getParticipantsById } from '../../pages/chat/message-detail/message-detail.services';
import { createChats } from '../../pages/chat/new-chat/new-chat.services';
import { getActiveJobs, getArchivedJobs, getDraftJobs } from '../../pages/job-create/my-jobs/my-jobs.services';
import { getJobCategories } from '../../pages/job-create/info/info.services';
import { getNotificationList } from '../../pages/notifications/notifications.service';
import { getScreeningQuestions } from '../../pages/job-apply/apply/apply.services';
import {
  getAwaitingReviewList,
  getDeclinedApplicants,
  getEndedList,
  getOnGoingList,
  getPendingApplicants,
} from '../../pages/job-apply/my-jobs/my-jobs.services';
import {
  getApplicantDetail,
  getHiredList,
  getJobOverview,
  jobOfferRejectLoader,
} from '../../pages/job-offer-reject/job-offer-reject.services';
import { receivedOfferLoader } from '../../pages/offer-received/offer-received.services';
import { endpoint } from '../endpoints';
import { jobsPageLoader } from 'src/pages/jobs/jobs.loader';
import { profileUserPageLoader } from 'src/pages/profile-user/profile-user.loader';
import { AchievementsPageLoader } from 'src/pages/achievements/achievements.loader';
import { profileOrganizationPageLoader } from 'src/pages/profile-organization/profile-organization.loader';
import { getSettingsItems } from 'src/pages/notifications/settings/settings.service';
import { getJobList } from 'src/pages/jobs/jobs.services';
import { getCreditCardInfo, getCreditCardInfoById } from 'src/pages/payment/payment.service';
import { getMissionsList, getSrtipeProfile } from 'src/pages/wallet/wallet.service';
import { search } from 'src/pages/search/desktop/search.services';
import store from 'src/store/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { getIdentities } from '../api';
import { useEffect, useState } from 'react';
import Layout from 'src/components/templates/refactored/layout/layout';
import { getComments, getPostDetail } from 'src/pages/feed/refactored/feedDetails/feedDetail.service';
import { getFeedList } from 'src/pages/feed/refactored/feed.service';

export const routes: Route[] = [
  {
    path: 'intro',
    element: () => import('../../pages/intro/intro').then((m) => <m.Intro />),
  },
  {
    path: 'sign-in',
    element: () => import('../../pages/sign-in/sign-in-container').then((m) => <m.SignInContainer />),
  },
  {
    path: 'sign-up',
    children: [
      {
        path: '/user',
        children: [
          {
            path: '/email',
            element: () =>
              import('../../pages/sign-up/sign-up-user-email/sign-up-user-email.container').then((m) => (
                <m.SignUpUserEmailContainer />
              )),
          },
          {
            path: '/verification',
            element: () =>
              import('../../pages/sign-up/sign-up-user-verification/sign-up-user-verification.container').then((m) => (
                <m.SignUpUserVerificationContainer />
              )),
          },
          {
            path: '/complete',
            element: () =>
              import('../../pages/sign-up/sign-up-user-complete/sign-up-user-complete.container').then((m) => (
                <m.SignUpUserCompleteContainer />
              )),
          },
          {
            path: '/welcome',
            element: () => import('../../pages/sign-up/welcome/welcome').then((m) => <m.Welcome />),
          },
          {
            path: '/onboarding',
            element: () =>
              import('../../pages/sign-up/sign-up-user-onboarding/sign-up-user-complete.container').then((m) => (
                <m.SignUpUserOnboarding />
              )),
          },
          {
            path: '/allow-notification',
            element: () => import('../../pages/sign-up/AllowNotification').then((m) => <m.AllowNotification />),
          },
        ],
      },
    ],
  },
  {
    path: 'forget-password',
    children: [
      {
        path: '/email',
        element: () => import('../../pages/forget-password/email/email.container').then((m) => <m.Email />),
      },
      {
        path: '/otp',
        element: () => import('../../pages/forget-password/otp/otp.container').then((m) => <m.Otp />),
      },
      {
        path: '/password',
        element: () => import('../../pages/forget-password/password/password.container').then((m) => <m.Password />),
      },
    ],
  },
  {
    path: 'feeds',
    loader: jobsPageLoader,
    element: <Layout />,
    children: [
      {
        path: '/:id',
        loader: async ({ params }) => {
          const requests = [getPostDetail(params.id), getComments(params.id, 1)];
          const [post, comments] = await Promise.all(requests);
          return { post, comments };
        },
        element: () => import('../../pages/feed/refactored/feedDetails/feedDetails').then((m) => <m.default />),
      },
      {
        path: '/',
        element: () => import('../../pages/feed/refactored/feed').then((m) => <m.default />),
        loader: () => getFeedList({ page: 1 }),
      },
    ],
  },
  {
    path: 'jobs/',
    loader: jobsPageLoader,
    element: <Layout />,
    children: [
      {
        element: () => import('../../pages/jobs').then((m) => <m.Jobs />),
        loader: () => getJobList({ page: 1 }),
      },
    ],
  },

  {
    path: 'profile/users',
    loader: jobsPageLoader,
    element: <Layout />,
    children: [
      {
        path: '/:id',
        loader: profileUserPageLoader,
        children: [
          {
            path: 'view',
            element: () => import('../../pages/profile-user/refactored/profileUser').then((m) => <m.default />),
          },
          {
            path: 'edit',
            element: () =>
              import('../../pages/profile-user-edit/profile-user-edit.container').then((m) => (
                <m.ProfileUserEditContainer />
              )),
          },
        ],
      },
    ],
  },
  {
    path: 'profile/organizations',
    loader: jobsPageLoader,
    element: <Layout />,
    children: [
      {
        path: '/:id',
        loader: profileOrganizationPageLoader,
        children: [
          {
            path: 'view',
            element: () => import('../../pages/profile-organization/refactored/profileOrg').then((m) => <m.default />),
          },
          {
            path: 'edit',
            element: () =>
              import('../../pages/profile-organization-edit/profile-organization-edit').then((m) => (
                <m.ProfileOrganizationEdit />
              )),
          },
          {
            path: 'jobs',
            element: () => import('../../pages/jobs-index/jobs-index.container').then((m) => <m.JobsIndexContainer />),
          },
        ],
      },
    ],
  },
  {
    path: 'search',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: () => import('../../pages/search/desktop/search').then((m) => <m.Search />),
        loader: (p) => search({ filter: {}, q: p.search.q as string, type: 'projects', page: 1 }),
      },
    ],
  },
  {
    loader: jobsPageLoader,
    children: [
      {
        path: 'delete-profile',
        children: [
          {
            path: '/delete',
            element: () => import('../../pages/delete-profile/delete/delete').then((m) => <m.Delete />),
          },
          {
            path: '/password',
            element: () => import('../../pages/delete-profile/password/password').then((m) => <m.Password />),
          },
          {
            path: '/confirm',
            element: () => import('../../pages/delete-profile/confirm/confirm').then((m) => <m.Confirm />),
          },
        ],
      },
      {
        path: 'change-password',
        element: () =>
          import('../../pages/change-password/change-password.container').then((m) => <m.ChangePasswordContainer />),
      },
      {
        path: 'payment/:id',
        children: [
          {
            path: '/add-card',
            loader: async ({ params }) => {
              const { offer } = await receivedOfferLoader(params);
              return { offer };
            },
            element: () =>
              import('../../pages/payment/credit-card/credit-card.container').then((m) => <m.CreditCard />),
          },
          {
            path: '/edit-card/:id',
            loader: async ({ params }) => {
              const [cardInfo] = await Promise.all([getCreditCardInfoById(params.id)]);
              return cardInfo;
            },
            element: () =>
              import('../../pages/payment/credit-card/credit-card.container').then((m) => <m.CreditCard />),
          },
          {
            loader: async ({ params }) => {
              const { offer } = await receivedOfferLoader(params);
              const cardInfo = await getCreditCardInfo(offer.currency === 'JPY');
              return { offer, cardInfo };
            },
            element: () => import('../../pages/payment/payment.container').then((m) => <m.Payment />),
          },
        ],
      },
      {
        path: '/achievements/m',
        loader: AchievementsPageLoader,
        element: () => import('../../pages/achievements/mobile/achievements').then((m) => <m.Mobile />),
      },
      {
        path: 'organization',
        children: [
          {
            path: 'create',
            children: [
              {
                path: 'intro',
                element: () => import('../../pages/organization-create/intro/intro').then((m) => <m.Intro />),
              },
              {
                path: 'type',
                element: () => import('../../pages/organization-create/type/type').then((m) => <m.Type />),
              },
              {
                path: 'social-causes',
                element: () =>
                  import('../../pages/organization-create/social-causes/social-causes').then((m) => <m.SocialCauses />),
              },
              {
                path: 'profile',
                element: () => import('../../pages/organization-create/profile/profile').then((m) => <m.Profile />),
              },
              {
                path: 'mission',
                element: () => import('../../pages/organization-create/mission/mission').then((m) => <m.Mission />),
              },
              {
                path: 'culture',
                element: () => import('../../pages/organization-create/culture/culture').then((m) => <m.Culture />),
              },
              {
                path: 'social-impact',
                element: () =>
                  import('../../pages/organization-create/social-impact/social-impact').then((m) => <m.SocialImpact />),
              },
              {
                path: 'succeed',
                element: () => import('../../pages/organization-create/succeed/succeed').then((m) => <m.Succeed />),
              },
              {
                path: 'verified',
                element: () => import('../../pages/organization-create/verified/verified').then((m) => <m.Verified />),
              },
            ],
          },
        ],
      },
      {
        path: '/chats',
        children: [
          {
            path: 'new/:id',
            loader: async ({ params }) => {
              const createdChats = await createChats({ name: 'nameless', type: 'CHAT', participants: [params.id] });
              return createdChats?.id;
            },
            element: () => import('../../pages/chat/new-chat/new-chat').then((m) => <m.NewChat />),
          },
          {
            path: 'contacts/:id',
            loader: async ({ params }) => {
              const requests = [
                getMessagesById({ id: params.id, page: 1 }),
                getParticipantsById(params.id),
                getChatsSummery({ page: 1, filter: '' }),
                getFollowings({ page: 1, name: '' }),
              ];
              const [messages, participants, summery, followings] = await Promise.all(requests);
              return {
                messages,
                participants,
                summery,
                followings,
              };
            },
            element: () =>
              import('../../pages/chat/message-detail/message-detail.container').then((m) => <m.MessageDetail />),
          },
          {
            path: 'contacts',
            loader: async () => {
              const requests = [getChatsSummery({ page: 1, filter: '' }), getFollowings({ page: 1, name: '' })];
              const [summery, followings] = await Promise.all(requests);
              return { summery, followings };
            },
            element: () =>
              import('../../pages/chat/contact-list/contact-list.container').then((m) => <m.ContactList />),
          },
        ],
      },
      {
        path: 'm/jobs/created/:id/overview',
        children: [
          {
            path: '/:applicantId/offer',
            loader: async ({ params }) => {
              const requests = [getApplicantDetail(params.applicantId)];
              const [applicantDetail] = await Promise.all(requests);
              return { applicantDetail };
            },
            element: () => import('../../pages/job-offer-reject/offer/offer.container').then((m) => <m.Offer />),
          },
          {
            path: '/:applicantId',
            loader: async ({ params }) => {
              const requests = [getScreeningQuestions(params.id), getApplicantDetail(params.applicantId)];
              const [screeningQuestions, applicantDetail] = await Promise.all(requests);
              return { applicantDetail, screeningQuestions };
            },
            element: () =>
              import('../../pages/job-offer-reject/applicant-detail/applicant-detail').then((m) => (
                <m.ApplicantDetail />
              )),
          },
          {
            loader: (params) => jobOfferRejectLoader(params),
            element: () =>
              import('../../pages/job-offer-reject/job-offer-reject.container').then((m) => <m.JobOfferReject />),
          },
        ],
      },
      {
        path: '/m/jobs/created/:id',
        loader: async ({ params }) => {
          const requests = [
            getActiveJobs({ identityId: params.id, page: 1 }),
            getDraftJobs({ identityId: params.id, page: 1 }),
            getArchivedJobs({ identityId: params.id, page: 1 }),
            getJobCategories(),
          ];
          const [activeJobs, draftJobs, archivedJobs, jobCategories] = await Promise.all(requests);
          return { activeJobs, draftJobs, archivedJobs, jobCategories };
        },
        element: () => import('../../pages/job-create/my-jobs/my-jobs.container').then((m) => <m.MyJobs />),
      },
      {
        path: '/jobs/create',
        children: [
          {
            path: 'social-causes',
            element: () =>
              import('../../pages/job-create/social-causes/social-causes.container').then((m) => <m.SocialCauses />),
          },
          {
            path: 'skills',
            element: () => import('../../pages/job-create/skills/skills.container').then((m) => <m.Skills />),
          },
          {
            path: 'info',
            loader: () => getJobCategories(),
            element: () => import('../../pages/job-create/info/info.container').then((m) => <m.Info />),
          },
          {
            path: 'screener-questions/created/:id',
            element: () =>
              import('src/pages/job-create/screener-questions/created/created.container').then((m) => <m.Created />),
          },
          {
            path: 'screener-questions',
            element: () =>
              import('src/pages/job-create/screener-questions/screener-questions.container').then((m) => (
                <m.ScreenerQuestions />
              )),
          },
          {
            path: 'final-review',
            loader: () => getJobCategories(),
            element: () => import('src/pages/job-create/final-review/review.container').then((m) => <m.FinalReview />),
          },
        ],
      },
      {
        path: '/jobs/edit',
        children: [
          {
            path: 'info/:id',
            loader: async ({ params }) => {
              const requests = [getJobCategories(), getJobOverview(params.id)];
              const [jobCategories, overview] = await Promise.all(requests);
              return { jobCategories, overview };
            },
            element: () => import('../../pages/job-edit/info/info.container').then((m) => <m.Info />),
          },
          {
            path: 'skills/:id',
            loader: async ({ params }) => {
              const requests = [getJobOverview(params.id)];
              const [overview] = await Promise.all(requests);
              return { overview };
            },
            element: () => import('../../pages/job-edit/skills/skills.container').then((m) => <m.Skills />),
          },
          {
            path: 'social-causes/:id',
            loader: async ({ params }) => {
              const requests = [getJobOverview(params.id)];
              const [overview] = await Promise.all(requests);
              return { overview };
            },
            element: () =>
              import('../../pages/job-edit/social-causes/social-causes.container').then((m) => <m.SocialCauses />),
          },
          {
            path: 'screener-questions/:id',
            loader: async ({ params }) => {
              const defaultQuestions = await getScreeningQuestions(params.id);
              return { defaultQuestions };
            },
            element: () =>
              import('src/pages/job-edit/screener-questions/created/created.container').then((m) => <m.Created />),
          },
          {
            path: 'screener-questions/',
            element: () =>
              import('src/pages/job-edit/screener-questions/screener-questions.container').then((m) => (
                <m.ScreenerQuestions />
              )),
          },
        ],
      },
      {
        path: '/search',
        element: () => import('../../pages/search/desktop/search').then((m) => <m.Search />),
        loader: (p) => search({ filter: {}, q: p.search.q as string, type: 'projects', page: 1 }),
      },
      {
        path: 'privacy-policy',
        element: () => import('../../pages/privacy-policy/privacy-policy').then((m) => <m.PrivacyPolicy />),
      },
      {
        path: 'terms-conditions',
        element: () => import('../../pages/terms-conditions/terms-conditions').then((m) => <m.TermsConditions />),
      },
      {
        path: '/jobs/:id/apply',
        loader: async ({ params }) => {
          const requests = [endpoint.get.projects.project_id(params.id), getScreeningQuestions(params.id)];
          const [jobDetail, screeningQuestions] = await Promise.all(requests);
          return { jobDetail, screeningQuestions };
        },
        element: () => import('../../pages/job-apply/apply/apply.container').then((m) => <m.JobApply />),
      },
      {
        path: '/jobs/received-offer/:id/m',
        loader: async ({ params }) => {
          let media = { url: '' };
          const { offer } = await receivedOfferLoader(params);
          if (offer.applicant?.attachment) {
            media = await endpoint.get.media['media_id'](offer.applicant.attachment);
          }
          return { offer, media };
        },
        element: () => import('../../pages/offer-received/offer-received.container').then((m) => <m.OfferReceived />),
      },
      {
        path: '/jobs/applied/complete-mission/:id',
        loader: async ({ params }) => {
          let media = { url: '' };
          const mission = await endpoint.get.missions.mission_id(params.id);
          const offer = await endpoint.get.offers.offer_id(mission.offer_id);
          if (offer.applicant?.attachment) {
            media = await endpoint.get.media['media_id'](offer.applicant.attachment);
          }
          return { mission, offer, media };
        },
        element: () =>
          import('../../pages/complete-mission/complete-mission.container').then((m) => <m.CompleteMission />),
      },
      {
        path: 'm/jobs/applied',
        loader: async () => {
          const requests = [
            getPendingApplicants({ page: 1 }),
            getAwaitingReviewList({ page: 1 }),
            getDeclinedApplicants({ page: 1 }),
            getOnGoingList({ page: 1 }),
            getEndedList({ page: 1 }),
          ];
          const [pendingApplicants, awaitingApplicants, declinedApplicants, onGoingApplicants, endedApplicants] =
            await Promise.all(requests);
          return {
            pendingApplicants,
            awaitingApplicants,
            declinedApplicants,
            onGoingApplicants,
            endedApplicants,
          };
        },
        children: [
          {
            path: ':id',
            element: () => import('../../pages/job-apply/my-jobs/my-jobs').then((m) => <m.MyJobs />),
          },
        ],
      },
      {
        path: '/jobs/:id/confirm',
        element: () => import('../../pages/job-apply/confirm/confirm').then((m) => <m.Confirm />),
      },

      {
        element: isTouchDevice() ? <RootTouchLayout /> : <RootCursorLayout />,
        children: [
          {
            path: '/d/payment/:id',
            children: [
              {
                path: '/add-card',
                loader: async () => {
                  const [cardInfo] = await Promise.all([getCreditCardInfo()]);
                  return cardInfo;
                },
                element: () =>
                  import('../../pages/payment/credit-card/credit-card.container').then((m) => <m.CreditCard />),
              },
              {
                path: '/edit-card/:id',
                loader: async ({ params }) => {
                  const [cardInfo] = await Promise.all([getCreditCardInfoById(params.id)]);
                  return cardInfo;
                },
                element: () =>
                  import('../../pages/payment/credit-card/credit-card.container').then((m) => <m.CreditCard />),
              },
              {
                loader: async ({ params }) => {
                  const { offer } = await receivedOfferLoader(params);
                  const cardInfo = await getCreditCardInfo(offer.currency === 'JPY');
                  return { offer, cardInfo };
                },
                element: () => import('../../pages/payment/payment.container').then((m) => <m.Payment />),
              },
            ],
          },
          {
            path: '/d/jobs/applied/complete-mission/:id',
            loader: async ({ params }) => {
              let media = { url: '' };
              const mission = await endpoint.get.missions.mission_id(params.id);
              const offer = await endpoint.get.offers.offer_id(mission.offer_id);
              if (offer.applicant?.attachment) {
                media = await endpoint.get.media['media_id'](offer.applicant.attachment);
              }
              return { mission, offer, media };
            },
            element: () =>
              import('../../pages/complete-mission/complete-mission.container').then((m) => <m.CompleteMission />),
          },
          {
            path: '/d/jobs/applied/submitted-hours/:id',
            loader: async ({ params }) => {
              let media = { url: '' };
              const mission = await endpoint.get.missions.mission_id(params.id);
              const offer = await endpoint.get.offers.offer_id(mission.offer_id);
              if (offer.applicant?.attachment) {
                media = await endpoint.get.media['media_id'](offer.applicant.attachment);
              }
              return { mission, offer, media };
            },
            element: () => import('../../pages/submit-hours/submit-hours.container').then((m) => <m.SubmitHours />),
          },
          {
            path: '/d/jobs/applied',
            loader: async () => {
              const requests = [
                getPendingApplicants({ page: 1 }),
                getAwaitingReviewList({ page: 1 }),
                getDeclinedApplicants({ page: 1 }),
                getOnGoingList({ page: 1 }),
                getEndedList({ page: 1 }),
              ];
              const [pendingApplicants, awaitingApplicants, declinedApplicants, onGoingApplicants, endedApplicants] =
                await Promise.all(requests);
              return {
                pendingApplicants,
                awaitingApplicants,
                declinedApplicants,
                onGoingApplicants,
                endedApplicants,
              };
            },
            children: [
              {
                path: ':id',
                element: () => import('../../pages/job-apply/my-jobs/my-jobs').then((m) => <m.MyJobs />),
              },
            ],
          },
          {
            path: 'd/chats',
            children: [
              {
                path: 'new/:id',
                loader: async ({ params }) => {
                  const createdChats = await createChats({
                    name: 'nameless',
                    type: 'CHAT',
                    participants: [params.id],
                  });
                  return createdChats?.id;
                },
                element: () => import('../../pages/chat/new-chat/new-chat').then((m) => <m.NewChat />),
              },
              {
                path: 'contacts/:id',
                loader: async ({ params }) => {
                  const requests = [
                    getMessagesById({ id: params.id, page: 1 }),
                    getParticipantsById(params.id),
                    getChatsSummery({ page: 1, filter: '' }),
                    getFollowings({ page: 1, name: '' }),
                  ];
                  const [messages, participants, summery, followings] = await Promise.all(requests);
                  return {
                    messages,
                    participants,
                    summery,
                    followings,
                  };
                },
                element: () =>
                  import('../../pages/chat/message-detail/message-detail.container').then((m) => <m.MessageDetail />),
              },
              {
                path: 'contacts',
                loader: async () => {
                  const requests = [getChatsSummery({ page: 1, filter: '' }), getFollowings({ page: 1, name: '' })];
                  const [summery, followings] = await Promise.all(requests);
                  return { summery, followings };
                },
                element: () =>
                  import('../../pages/chat/contact-list/contact-list.container').then((m) => <m.ContactList />),
              },
            ],
          },
          {
            path: 'd/jobs/created/:id/overview',
            children: [
              {
                path: '/:applicantId/offer',
                loader: async ({ params }) => {
                  const requests = [getApplicantDetail(params.applicantId)];
                  const [applicantDetail] = await Promise.all(requests);
                  return { applicantDetail };
                },
                element: () => import('../../pages/job-offer-reject/offer/offer.container').then((m) => <m.Offer />),
              },
              {
                path: '/:applicantId',
                loader: async ({ params }) => {
                  const requests = [
                    getScreeningQuestions(params.id),
                    getApplicantDetail(params.applicantId),
                    getHiredList({ id: params.id, page: 1 }),
                  ];
                  const [screeningQuestions, applicantDetail, missions] = await Promise.all(requests);
                  return { applicantDetail, screeningQuestions, missions };
                },
                element: () =>
                  import('../../pages/job-offer-reject/applicant-detail/applicant-detail').then((m) => (
                    <m.ApplicantDetail />
                  )),
              },
              {
                loader: (params) => jobOfferRejectLoader(params),
                element: () =>
                  import('../../pages/job-offer-reject/job-offer-reject.container').then((m) => <m.JobOfferReject />),
              },
            ],
          },
          {
            path: '/d/jobs/created/:id',
            loader: async ({ params }) => {
              const requests = [
                getActiveJobs({ identityId: params.id, page: 1 }),
                getDraftJobs({ identityId: params.id, page: 1 }),
                getArchivedJobs({ identityId: params.id, page: 1 }),
                getJobCategories(),
              ];
              const [activeJobs, draftJobs, archivedJobs, jobCategories] = await Promise.all(requests);
              return { activeJobs, draftJobs, archivedJobs, jobCategories };
            },
            element: () => import('../../pages/job-create/my-jobs/my-jobs.container').then((m) => <m.MyJobs />),
          },
          {
            path: '/jobs/received-offer/:id/d',
            loader: async ({ params }) => {
              let media = { url: '' };
              const { offer } = await receivedOfferLoader(params);
              if (offer.applicant?.attachment) {
                media = await endpoint.get.media['media_id'](offer.applicant.attachment);
              }
              return { offer, media };
            },
            element: () =>
              import('../../pages/offer-received/offer-received.container').then((m) => <m.OfferReceived />),
          },
          {
            path: '/jobs/:id',
            loader: async ({ params }) => {
              const requests = [endpoint.get.projects.project_id(params.id), getScreeningQuestions(params.id)];
              const [jobDetail, screeningQuestions] = await Promise.all(requests);
              return { jobDetail, screeningQuestions };
            },
            element: () => import('../../pages/job-detail/job-detail.container').then((m) => <m.JobDetailContainer />),
          },
          {
            path: '/job-datails/:id',
            loader: async ({ params }) => {
              const requests = [endpoint.get.projects.project_id(params.id), getScreeningQuestions(params.id)];
              const [jobDetail, screeningQuestions] = await Promise.all(requests);
              return { jobDetail, screeningQuestions };
            },
            element: () => import('../../pages/job-detail/job-detail.container').then((m) => <m.JobDetailContainer />),
          },
          {
            path: '/jobIndexing',
            element: () => import('../../pages/job-indexing-google/job-indexing-google').then((m) => <m.default />),
          },
          {
            path: '/achievements/d',
            loader: AchievementsPageLoader,
            element: () => import('../../pages/achievements/desktop/desktop').then((m) => <m.Desktop />),
          },
          {
            path: 'notifications',
            children: [
              {
                path: '/settings',
                element: () =>
                  import('src/pages/notifications/settings/settings.container').then((m) => <m.Settings />),
                loader: () => getSettingsItems(),
              },
              {
                element: () =>
                  import('../../pages/notifications/notifications.container').then((m) => <m.Notifications />),
                loader: () => getNotificationList({ page: 1 }),
              },
            ],
          },
          {
            path: 'network',
            children: [
              {
                path: '/connections',
                element: () =>
                  import('src/pages/network/connections/connections.container').then((m) => <m.Connections />),
              },
              {
                path: '/followings',
                element: () =>
                  import('src/pages/network/followings/followings.container').then((m) => <m.Followings />),
                loader: () => getFollowings({ page: 1, name: '' }),
              },
              {
                element: () => import('src/pages/network/network.container').then((m) => <m.Network />),
              },
            ],
          },
          {
            path: 'wallet',
            element: () => import('../../pages/wallet/wallet.container').then((m) => <m.Wallet />),
            loader: async () => {
              const requests = [getMissionsList({ page: 1 }), getSrtipeProfile(), getSrtipeProfile(true)];
              const [missionsList, stripeProfile, jpStripeProfile] = await Promise.all(requests);
              return { missionsList, stripeProfile, jpStripeProfile };
            },
          },
          {
            path: 'team/:id',
            element: () => import('src/pages/team/team.container').then((m) => <m.Team />),
            loader: async ({ params }) => {
              const requests = [
                endpoint.get.members['org_id'](params.id, { page: 1 }),
                endpoint.get.follows['followings']({ page: 1, name: '', type: 'users' }),
              ];
              const [members, followings] = await Promise.all(requests);
              return { members, followings };
            },
          },

          {
            element: <DefaultRoute />,
          },
        ],
      },
    ],
  },
];

function DefaultRoute(): JSX.Element {
  const state = store.getState().identity.entities;

  if (state.length) {
    return <Navigate to="/jobs" />;
  } else {
    return <Navigate to="/intro" />;
  }
}
