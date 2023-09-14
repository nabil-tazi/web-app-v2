export interface WithdrawMissionsProps {
  mission_name: string;
  escrow: { mission_id: string; release_id: string; released_at: string };
  amount: number;
  total: number;
  fee: number;
  onClickWithdraw: () => void;
  service?: 'STRIPE' | 'CRYPTO';
  currency?: string;
  disbaledWithdraw?: boolean;
  disableText?: string;
}
