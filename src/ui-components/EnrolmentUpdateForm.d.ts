/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Enrolment } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EnrolmentUpdateFormInputValues = {
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
export declare type EnrolmentUpdateFormValidationValues = {
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
export declare type EnrolmentUpdateFormOverridesProps = {
    EnrolmentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type EnrolmentUpdateFormProps = React.PropsWithChildren<{
    overrides?: EnrolmentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    enrolment?: Enrolment;
    onSubmit?: (fields: EnrolmentUpdateFormInputValues) => EnrolmentUpdateFormInputValues;
    onSuccess?: (fields: EnrolmentUpdateFormInputValues) => void;
    onError?: (fields: EnrolmentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EnrolmentUpdateFormInputValues) => EnrolmentUpdateFormInputValues;
    onValidate?: EnrolmentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EnrolmentUpdateForm(props: EnrolmentUpdateFormProps): React.ReactElement;
