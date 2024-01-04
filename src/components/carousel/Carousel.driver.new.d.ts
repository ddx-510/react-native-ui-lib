import { CarouselProps } from './types';
import { ComponentProps } from '../../testkit/new/Component.driver';
import { ScrollProps } from '../../testkit/new/useScrollable.driver';
export declare const CarouselDriver: (props: ComponentProps) => {
    scroll: (props: ScrollProps) => void;
    getElement: () => import("react-test-renderer").ReactTestInstance;
    exists: () => boolean;
    getProps: () => CarouselProps;
};
