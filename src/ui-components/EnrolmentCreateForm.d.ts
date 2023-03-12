/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
    bandDesc?: string;
    bandRate?: number;
    lessons?: boolean;
    lessonDesc?: number;
    lessonRate?: string;
    stripeRef?: string;
};
export declare type EnrolmentCreateFormValidationValues = {
    bands?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    term?: ValidationFunction<string>;
    bandDesc?: ValidationFunction<string>;
    bandRate?: ValidationFunction<number>;
    lessons?: ValidationFunction<boolean>;
    lessonDesc?: ValidationFunction<number>;
    lessonRate?: ValidationFunction<string>;
    stripeRef?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EnrolmentCreateFormOverridesProps = {
    EnrolmentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    bands?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    term?: PrimitiveOverrideProps<TextFieldProps>;
    bandDesc?: PrimitiveOverrideProps<TextFieldProps>;
    bandRate?: PrimitiveOverrideProps<TextFieldProps>;
    lessons?: PrimitiveOverrideProps<SwitchFieldProps>;
    lessonDesc?: PrimitiveOverrideProps<TextFieldProps>;
    lessonRate?: PrimitiveOverrideProps<TextFieldProps>;
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
