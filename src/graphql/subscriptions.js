/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMember = /* GraphQL */ `
  subscription OnCreateMember(
    $filter: ModelSubscriptionMemberFilterInput
    $owner: String
  ) {
    onCreateMember(filter: $filter, owner: $owner) {
      id
      forename
      surname
      dateofbirth
      ethnicity
      instruments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateMember = /* GraphQL */ `
  subscription OnUpdateMember(
    $filter: ModelSubscriptionMemberFilterInput
    $owner: String
  ) {
    onUpdateMember(filter: $filter, owner: $owner) {
      id
      forename
      surname
      dateofbirth
      ethnicity
      instruments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteMember = /* GraphQL */ `
  subscription OnDeleteMember(
    $filter: ModelSubscriptionMemberFilterInput
    $owner: String
  ) {
    onDeleteMember(filter: $filter, owner: $owner) {
      id
      forename
      surname
      dateofbirth
      ethnicity
      instruments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateEnrolment = /* GraphQL */ `
  subscription OnCreateEnrolment(
    $filter: ModelSubscriptionEnrolmentFilterInput
    $owner: String
  ) {
    onCreateEnrolment(filter: $filter, owner: $owner) {
      id
      bands
      status
      term
      ratedescription
      rate
      stripeRef
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateEnrolment = /* GraphQL */ `
  subscription OnUpdateEnrolment(
    $filter: ModelSubscriptionEnrolmentFilterInput
    $owner: String
  ) {
    onUpdateEnrolment(filter: $filter, owner: $owner) {
      id
      bands
      status
      term
      ratedescription
      rate
      stripeRef
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteEnrolment = /* GraphQL */ `
  subscription OnDeleteEnrolment(
    $filter: ModelSubscriptionEnrolmentFilterInput
    $owner: String
  ) {
    onDeleteEnrolment(filter: $filter, owner: $owner) {
      id
      bands
      status
      term
      ratedescription
      rate
      stripeRef
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
