import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





type EagerMember = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Member, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly forename?: string | null;
  readonly surname?: string | null;
  readonly dateofbirth?: string | null;
  readonly ethnicity?: string | null;
  readonly instruments?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt?: string | null;
}

type LazyMember = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Member, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly forename?: string | null;
  readonly surname?: string | null;
  readonly dateofbirth?: string | null;
  readonly ethnicity?: string | null;
  readonly instruments?: (string | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt?: string | null;
}

export declare type Member = LazyLoading extends LazyLoadingDisabled ? EagerMember : LazyMember

export declare const Member: (new (init: ModelInit<Member>) => Member) & {
  copyOf(source: Member, mutator: (draft: MutableModel<Member>) => MutableModel<Member> | void): Member;
}

type EagerEnrolment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Enrolment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bands?: (string | null)[] | null;
  readonly status?: string | null;
  readonly term?: string | null;
  readonly ratedescription?: string | null;
  readonly rate?: number | null;
  readonly stripeRef?: string | null;
  readonly member?: Member | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly enrolmentMemberId?: string | null;
}

type LazyEnrolment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Enrolment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bands?: (string | null)[] | null;
  readonly status?: string | null;
  readonly term?: string | null;
  readonly ratedescription?: string | null;
  readonly rate?: number | null;
  readonly stripeRef?: string | null;
  readonly member: AsyncItem<Member | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly enrolmentMemberId?: string | null;
}

export declare type Enrolment = LazyLoading extends LazyLoadingDisabled ? EagerEnrolment : LazyEnrolment

export declare const Enrolment: (new (init: ModelInit<Enrolment>) => Enrolment) & {
  copyOf(source: Enrolment, mutator: (draft: MutableModel<Enrolment>) => MutableModel<Enrolment> | void): Enrolment;
}