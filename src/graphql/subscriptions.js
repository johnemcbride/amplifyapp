/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMember = /* GraphQL */ `
  subscription OnCreateMember(
    $filter: ModelSubscriptionMemberFilterInput
    $owner: String
  ) {
    onCreateMember(filter: $filter, owner: $owner) {
      forename
      surname
      dateOfBirth
      addressLine1
      addressLine2
      town
      postCode
      id
      createdAt
      updatedAt
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
      forename
      surname
      dateOfBirth
      addressLine1
      addressLine2
      town
      postCode
      id
      createdAt
      updatedAt
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
      forename
      surname
      dateOfBirth
      addressLine1
      addressLine2
      town
      postCode
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
