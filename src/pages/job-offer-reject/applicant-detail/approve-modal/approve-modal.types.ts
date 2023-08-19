import { ModalProps } from 'src/components/templates/modal/modal.types';
import { ApplicantResp } from 'src/core/types';

export interface OfferModalProps extends Omit<ModalProps, 'children'> {
  applicantDetail: ApplicantResp;
  onDone: () => void;
}
