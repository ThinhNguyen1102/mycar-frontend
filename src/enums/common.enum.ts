export enum CarContractStatus {
  APPROVED = 'approved',
  STARTED = 'started',
  ENDED = 'ended',
  CANCELED = 'canceled',
  REJECTED = 'rejected',
  WAITING_APPROVAL = 'waiting_approval'
}

export enum ContractTransactionType {
  PAYMENT = 'pay',
  CAR_CONTRACT_CREATE = 'createContract',
  REFUND_ADMIN_CANCEL = 'refund',
  REFUND_OWNER_REJECT = 'refundOwnerReject',
  REFUND_OWNER_CANCEL = 'refundOwnerCancel',
  REFUND_RENTAL_CANCEL = 'refundRentalCancel',
  CAR_CONTRACT_STARTED = 'startContract',
  CAR_CONTRACT_ENDED = 'endContract'
}

export enum CarContractMessageType {
  CREATE_CAR_CONTRACT = 'call::create_car_contract',
  REFUND_OWNER_REJECTED = 'call::refund_owner_rejected',
  REFUND_OWNER_CANCELED = 'call::refund_owner_canceled',
  REFUND_RENTER_CANCELED = 'call::refund_renter_canceled',
  REFUND_ADMIN_CANCEL = 'call::refund_admin_cancel',
  START_CAR_CONTRACT = 'call::start_contract',
  END_CAR_CONTRACT = 'call::end_contract'
}
