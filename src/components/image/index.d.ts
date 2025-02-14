import React, { PureComponent } from 'react';
import { Image as RNImage, ImageProps as RNImageProps, NativeSyntheticEvent, ImageErrorEventData } from 'react-native';
import { ImagePropTypes } from 'deprecated-react-native-prop-types';
import { ForwardRefInjectedProps, BaseComponentInjectedProps, MarginModifiers } from '../../commons/new';
import { RecorderProps } from '../../typings/recorderTypes';
import { OverlayTypeType, OverlayIntensityType } from '../overlay';
export type ImageProps = RNImageProps & MarginModifiers & RecorderProps & {
    /**
     * custom source transform handler for manipulating the image source (great for size control)
     */
    sourceTransformer?: (props: any) => ImagePropTypes.source;
    /**
     * if provided image source will be driven from asset name
     */
    assetName?: string;
    /**
     * the asset group, default is "icons"
     */
    assetGroup?: string;
    /**
     * the asset tint
     */
    tintColor?: string;
    /**
     * whether the image should flip horizontally on RTL locals
     */
    supportRTL?: boolean;
    /**
     * Show image as a cover, full width, image (according to aspect ratio, default: 16:8)
     */
    cover?: boolean;
    /**
     * The aspect ratio for the image
     */
    aspectRatio?: number;
    /**
     * The type of overly to place on top of the image. Note: the image MUST have proper size, see examples in:
     * https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/OverlaysScreen.tsx
     */
    overlayType?: OverlayTypeType;
    /**
     * The intensity of the overlay ('LOW' | 'MEDIUM' | 'HIGH'), default is 'LOW'.
     */
    overlayIntensity?: OverlayIntensityType;
    /**
     * Pass a custom color for the overlay
     */
    overlayColor?: string;
    /**
     * Render an overlay with custom content
     */
    customOverlayContent?: JSX.Element;
    /**
     * Default image source in case of an error
     */
    errorSource?: ImagePropTypes.source;
    /**
     * An imageId that can be used in sourceTransformer logic
     */
    imageId?: string;
    /**
     * Use a container for the Image, this can solve issues on
     * Android when animation needs to be performed on the same
     * view; i.e. animation related crashes on Android.
     */
    useBackgroundContainer?: boolean;
    /**
     * The image width
     */
    width?: string | number;
    /**
     * The image height
     */
    height?: string | number;
};
type Props = ImageProps & ForwardRefInjectedProps & BaseComponentInjectedProps;
type State = {
    error: boolean;
    prevSource: ImagePropTypes.source;
};
/**
 * @description: Image wrapper with extra functionality like source transform and assets support
 * @extends: Image
 * @extendsLink: https://reactnative.dev/docs/image
 * @notes: please note that for SVG support you need to add both
 * `react-native-svg` and `react-native-svg-transformer`,
 * and also configure them (see `metro.config.js`)
 */
declare class Image extends PureComponent<Props, State> {
    static displayName: string;
    static defaultProps: {
        assetGroup: string;
    };
    static overlayTypes: {
        VERTICAL: string;
        TOP: string;
        BOTTOM: string;
        SOLID: string;
    };
    static overlayIntensityType: typeof OverlayIntensityType;
    sourceTransformer?: (props: any) => ImagePropTypes.source;
    constructor(props: Props);
    static getDerivedStateFromProps(nextProps: Partial<Props>, prevState: State): {
        error: boolean;
        prevSource: import("react-native").ImageSourcePropType | undefined;
    } | null;
    isGif(): boolean | undefined;
    shouldUseImageBackground(): boolean;
    getVerifiedSource(source?: ImagePropTypes.source): any;
    getImageSource(): any;
    onError: (event: NativeSyntheticEvent<ImageErrorEventData>) => void;
    renderSvg: () => React.JSX.Element;
    renderImageWithContainer: () => React.JSX.Element;
    renderImage: (useImageInsideContainer: boolean) => React.JSX.Element;
    renderRegularImage(): React.JSX.Element;
    render(): React.JSX.Element;
}
export { Image };
declare const _default: React.ComponentClass<ImageProps, any> & typeof Image & typeof RNImage;
export default _default;
