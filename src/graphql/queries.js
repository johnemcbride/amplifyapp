/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEnrolment = /* GraphQL */ `
  query GetEnrolment($id: ID!) {
    getEnrolment(id: $id) {
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
export const listEnrolments = /* GraphQL */ `
  query ListEnrolments(
    $filter: ModelEnrolmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrolments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
