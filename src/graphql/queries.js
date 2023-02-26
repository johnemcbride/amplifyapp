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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMembers = /* GraphQL */ `
  query SyncMembers(
    $filter: ModelMemberFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMembers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        enrolmentMemberId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEnrolments = /* GraphQL */ `
  query SyncEnrolments(
    $filter: ModelEnrolmentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEnrolments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        _version
        _deleted
        _lastChangedAt
        enrolmentMemberId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
