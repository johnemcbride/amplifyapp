/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEnrolment = /* GraphQL */ `
  mutation CreateEnrolment(
    $input: CreateEnrolmentInput!
    $condition: ModelEnrolmentConditionInput
  ) {
    createEnrolment(input: $input, condition: $condition) {
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
      total
      giftAidConsent
      city
      line1
      line2
      postCode
      email
      siblings
      firstname
      familyname
      member {
        Username
        UserCreateDate
        UserLastModifiedDate
        Enabled
        UserStatus
        PreferredMfaSetting
        UserMFASettingList
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateEnrolment = /* GraphQL */ `
  mutation UpdateEnrolment(
    $input: UpdateEnrolmentInput!
    $condition: ModelEnrolmentConditionInput
  ) {
    updateEnrolment(input: $input, condition: $condition) {
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
      total
      giftAidConsent
      city
      line1
      line2
      postCode
      email
      siblings
      firstname
      familyname
      member {
        Username
        UserCreateDate
        UserLastModifiedDate
        Enabled
        UserStatus
        PreferredMfaSetting
        UserMFASettingList
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteEnrolment = /* GraphQL */ `
  mutation DeleteEnrolment(
    $input: DeleteEnrolmentInput!
    $condition: ModelEnrolmentConditionInput
  ) {
    deleteEnrolment(input: $input, condition: $condition) {
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
      total
      giftAidConsent
      city
      line1
      line2
      postCode
      email
      siblings
      firstname
      familyname
      member {
        Username
        UserCreateDate
        UserLastModifiedDate
        Enabled
        UserStatus
        PreferredMfaSetting
        UserMFASettingList
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
