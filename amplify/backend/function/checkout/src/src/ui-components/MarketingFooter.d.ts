/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MarketingFooterOverridesProps = {
    MarketingFooter?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 738"?: PrimitiveOverrideProps<ViewProps>;
    CopyrightFrame?: PrimitiveOverrideProps<FlexProps>;
    Copyright?: PrimitiveOverrideProps<TextProps>;
    "Frame 418"?: PrimitiveOverrideProps<FlexProps>;
    "ezgif 1"?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type MarketingFooterProps = React.PropsWithChildren<Partial<ViewProps> & {
    width?: String;
    img?: String;
    copyright?: String;
} & {
    overrides?: MarketingFooterOverridesProps | undefined | null;
}>;
export default function MarketingFooter(props: MarketingFooterProps): React.ReactElement;
