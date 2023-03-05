/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      bandDesc
      bandRate
      lessons
      lessonDesc
      lessonRate
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
      bandDesc
      bandRate
      lessons
      lessonDesc
      lessonRate
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
      bandDesc
      bandRate
      lessons
      lessonDesc
      lessonRate
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
