/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Member } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MemberUpdateFormInputValues = {
    forename?: string;
    surname?: string;
    dateofbirth?: string;
    ethnicity?: string;
    instruments?: string[];
    createdAt?: string;
};
export declare type MemberUpdateFormValidationValues = {
    forename?: ValidationFunction<string>;
    surname?: ValidationFunction<string>;
    dateofbirth?: ValidationFunction<string>;
    ethnicity?: ValidationFunction<string>;
    instruments?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MemberUpdateFormOverridesProps = {
    MemberUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    forename?: PrimitiveOverrideProps<TextFieldProps>;
    surname?: PrimitiveOverrideProps<TextFieldProps>;
    dateofbirth?: PrimitiveOverrideProps<TextFieldProps>;
    ethnicity?: PrimitiveOverrideProps<TextFieldProps>;
    instruments?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MemberUpdateFormProps = React.PropsWithChildren<{
    overrides?: MemberUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    member?: Member;
    onSubmit?: (fields: MemberUpdateFormInputValues) => MemberUpdateFormInputValues;
    onSuccess?: (fields: MemberUpdateFormInputValues) => void;
    onError?: (fields: MemberUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MemberUpdateFormInputValues) => MemberUpdateFormInputValues;
    onValidate?: MemberUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MemberUpdateForm(props: MemberUpdateFormProps): React.ReactElement;
