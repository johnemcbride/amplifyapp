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
export declare type EnrolmentCreateFormInputValues = {
    bands?: string[];
    status?: string;
    term?: string;
    ratedescription?: string;
    rate?: number;
    stripeRef?: string;
};
export declare type EnrolmentCreateFormValidationValues = {
    bands?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    term?: ValidationFunction<string>;
    ratedescription?: ValidationFunction<string>;
    rate?: ValidationFunction<number>;
    stripeRef?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EnrolmentCreateFormOverridesProps = {
    EnrolmentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    bands?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    term?: PrimitiveOverrideProps<TextFieldProps>;
    ratedescription?: PrimitiveOverrideProps<TextFieldProps>;
    rate?: PrimitiveOverrideProps<TextFieldProps>;
    stripeRef?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EnrolmentCreateFormProps = React.PropsWithChildren<{
    overrides?: EnrolmentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EnrolmentCreateFormInputValues) => EnrolmentCreateFormInputValues;
    onSuccess?: (fields: EnrolmentCreateFormInputValues) => void;
    onError?: (fields: EnrolmentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EnrolmentCreateFormInputValues) => EnrolmentCreateFormInputValues;
    onValidate?: EnrolmentCreateFormValidationValues;
} & React.CSSProperties>;
export default function EnrolmentCreateForm(props: EnrolmentCreateFormProps): React.ReactElement;
