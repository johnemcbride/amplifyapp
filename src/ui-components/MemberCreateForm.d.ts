/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MemberCreateFormInputValues = {
    forename?: string;
    surname?: string;
    dateofbirth?: string;
    ethnicity?: string;
    instruments?: string[];
    createdAt?: string;
};
export declare type MemberCreateFormValidationValues = {
    forename?: ValidationFunction<string>;
    surname?: ValidationFunction<string>;
    dateofbirth?: ValidationFunction<string>;
    ethnicity?: ValidationFunction<string>;
    instruments?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MemberCreateFormOverridesProps = {
    MemberCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    forename?: PrimitiveOverrideProps<TextFieldProps>;
    surname?: PrimitiveOverrideProps<TextFieldProps>;
    dateofbirth?: PrimitiveOverrideProps<TextFieldProps>;
    ethnicity?: PrimitiveOverrideProps<TextFieldProps>;
    instruments?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MemberCreateFormProps = React.PropsWithChildren<{
    overrides?: MemberCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MemberCreateFormInputValues) => MemberCreateFormInputValues;
    onSuccess?: (fields: MemberCreateFormInputValues) => void;
    onError?: (fields: MemberCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MemberCreateFormInputValues) => MemberCreateFormInputValues;
    onValidate?: MemberCreateFormValidationValues;
} & React.CSSProperties>;
export default function MemberCreateForm(props: MemberCreateFormProps): React.ReactElement;
