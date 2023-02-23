/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMember = /* GraphQL */ `
  query GetMember($id: ID!) {
    getMember(id: $id) {
      id
      forename
      surname
      dateofbirth
      ethnicity
      instruments
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listMembers = /* GraphQL */ `
  query ListMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        forename
        surname
        dateofbirth
        ethnicity
        instruments
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getEnrolment = /* GraphQL */ `
  query GetEnrolment($id: ID!) {
    getEnrolment(id: $id) {
      id
      bands
      status
      term
      ratedescription
      rate
      stripeRef
      member {
        id
        forename
        surname
        dateofbirth
        ethnicity
        instruments
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      enrolmentMemberId
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
        ratedescription
        rate
        stripeRef
        createdAt
        updatedAt
        enrolmentMemberId
        owner
      }
      nextToken
    }
  }
`;
