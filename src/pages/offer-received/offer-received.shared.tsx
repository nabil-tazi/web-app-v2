import { useEffect, useState } from 'react';
import Dapp from 'src/dapp';
import { StripeProfileResp } from 'src/core/types';
import { useMatch } from '@tanstack/react-location';
import { useAccount } from 'wagmi';
import { Resolver } from './offer-received.types';
import { StatusKeys } from 'src/constants/APPLICANT_STATUS';
import { endpoint } from 'src/core/endpoints';
import { useForm } from 'src/core/form';
import { dialog } from 'src/core/dialog/dialog';
import { findTokenRate, getStripeLink, getSrtipeProfile, formModel } from './offer-received.services';

export const useOfferReceivedShared = () => {
  const { offer, media } = useMatch().ownData as Resolver;
  const { project, payment_mode, recipient } = offer;
  const { payment_type } = project || {};
  const { wallet_address } = recipient?.meta || {};
  const isPaidCrypto = payment_type === 'PAID' && payment_mode === 'CRYPTO';
  const isPaid = payment_type === 'PAID';
  const { address: account, isConnected } = useAccount();
  const [status, setStatus] = useState<StatusKeys>(offer?.status as StatusKeys);
  const [tokenRate, setTokenRate] = useState(1);

  let unit = offer.currency === 'JPY' ? '¥' : '$';
  if (offer.crypto_currency_address) {
    Dapp.NETWORKS.map((n) => {
      const token = n.tokens.filter((t) => offer.crypto_currency_address === t.address)[0];
      if (token) unit = token.symbol;
    });
  }

  useEffect(() => {
    if (isConnected && account && (!wallet_address || String(wallet_address) !== account)) {
      endpoint.post.user['{user_id}/update_wallet']({
        wallet_address: account,
      });
    }
  }, [isConnected, account]);

  useEffect(() => {
    const getTokenRate = async () => {
      const { rate } = await findTokenRate(offer.crypto_currency_address);
      setTokenRate(rate);
    };
    getTokenRate();
  }, []);

  function onAccept(id: string) {
    return () =>
      endpoint.post.offers['{offer_id}/approve'](id).then(() => {
        dialog.alert({ title: 'Offer accepted', message: 'You have successfully accepted the offer' }).then(() => {
          setStatus('APPROVED');
        });
      });
  }

  function onDeclined(id: string) {
    return () => {
      endpoint.post.offers['{offer_id}/withdrawn'](id).then(() => {
        dialog.alert({ title: 'Offer declined', message: 'You have successfully declined the offer' }).then(() => {
          setStatus('WITHRAWN');
        });
      });
    };
  }

  function equivalentUSD() {
    return Math.round(offer.assignment_total * tokenRate * 100) / 100;
  }

  return { offer, media, status, account, isPaidCrypto, isPaid, unit, onAccept, onDeclined, equivalentUSD };
};

export const useWalletShared = () => {
  const { offer } = useMatch().ownData as Resolver;
  const form = useForm(formModel);
  const [stripeLink, setStripeLink] = useState('');
  const [stripeProfile, setStripeProfile] = useState(null);

  async function onSelectCountry(value: string) {
    try {
      const result = await getStripeLink(value, offer.currency === 'JPY');
      const {
        link: { url },
      } = result;
      setStripeLink(url);
    } catch (err: any) {
      dialog.alert({
        message: err?.response?.data.error || err?.message,
        title: 'Failed',
      });
    }
  }

  useEffect(() => {
    getSrtipeProfile(offer.currency === 'JPY').then((r) => {
      const { data } = r?.external_accounts || {};
      if (data?.length > 0) setStripeProfile(data);
    });
  }, []);

  return {
    form,
    stripeLink,
    stripeProfile,
    onSelectCountry,
  };
};
