import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ForwardRefInjectedProps } from '../../commons/new';
import { SliderProps } from './index';
import { SliderContextProps } from './context/SliderContext';
type SliderOnValueChange = (value: string, alfa: number) => void;
export declare enum GradientSliderTypes {
    DEFAULT = "default",
    HUE = "hue",
    LIGHTNESS = "lightness",
    SATURATION = "saturation"
}
export type GradientSliderProps = Omit<SliderProps, 'onValueChange' | 'value' | 'minimumValue' | 'maximumValue' | 'step' | 'thumbHitSlop' | 'useGap'> & {
    /**
     * The gradient color
     */
    color?: string;
    /**
     * The gradient type (default, hue, lightness, saturation)
     */
    type?: GradientSliderTypes;
    /**
     * The gradient steps
     */
    gradientSteps?: number;
    /**
     * Callback for onValueChange, returns the updated color
     */
    onValueChange?: SliderOnValueChange;
    /**
     * If true the component will have accessibility features enabled
     */
    accessible?: boolean;
    /**
     * The container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * If true the Slider will be disabled and will appear in disabled color
     */
    disabled?: boolean;
} & Partial<Pick<SliderProps, 'value' | 'minimumValue' | 'maximumValue' | 'step' | 'thumbHitSlop' | 'useGap'>>;
type GradientSliderComponentProps = {
    /**
     * Context of the slider group
     */
    sliderContext: SliderContextProps;
} & GradientSliderProps;
type Props = GradientSliderComponentProps & ForwardRefInjectedProps;
declare const _default: React.ComponentClass<GradientSliderProps, any> & {
    (props: Props): React.JSX.Element;
    displayName: string;
    types: typeof GradientSliderTypes;
};
export default _default;
