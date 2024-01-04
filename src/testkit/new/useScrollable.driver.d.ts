import { ComponentDriverResult } from './Component.driver';
import { ScrollViewProps, NativeScrollEvent, NativeScrollPoint } from 'react-native';
type ScrollableDriverOptions = Omit<NativeScrollEvent, 'contentOffset'>;
type ContentOffset = Partial<NativeScrollPoint>;
export type ScrollProps = ContentOffset & {
    options?: ScrollableDriverOptions;
};
export interface ScrollableDriverResult<Props> extends ComponentDriverResult<Props> {
    scroll: (contentOffset: ContentOffset, options?: ScrollableDriverOptions) => void;
}
export type ScrollableDriverProps = Partial<Pick<ScrollViewProps, 'contentOffset'>>;
export declare const useScrollableDriver: <Props extends Partial<Pick<ScrollViewProps, "contentOffset">>, DriverProps extends ComponentDriverResult<Props> = ComponentDriverResult<Props>>(driver: DriverProps) => ScrollableDriverResult<Props> & DriverProps;
export {};
