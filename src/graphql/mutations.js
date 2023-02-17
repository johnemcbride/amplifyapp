/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const createMember = /* GraphQL */ `
  mutation CreateMember(
    $input: CreateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    createMember(input: $input, condition: $condition) {
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
export const updateMember = /* GraphQL */ `
  mutation UpdateMember(
    $input: UpdateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    updateMember(input: $input, condition: $condition) {
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
export const deleteMember = /* GraphQL */ `
  mutation DeleteMember(
    $input: DeleteMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    deleteMember(input: $input, condition: $condition) {
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
      ratedescription
      rate
      stripeRef
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
      ratedescription
      rate
      stripeRef
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
      ratedescription
      rate
      stripeRef
      createdAt
      updatedAt
      owner
    }
  }
`;
