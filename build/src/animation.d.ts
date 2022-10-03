export declare type OrbitAnimationProps = {
    children: string;
    deg: number;
    debug?: boolean;
    controls: {
        prev: string;
        next: string;
        event: string;
    };
};
declare type StatesProps = {
    children: Array<{
        el: HTMLElement;
        deg: number;
        q: number;
    }>;
    observers: Array<(command: CommandProps) => void>;
    debug: boolean;
    deg: number;
    controls: {
        prev: HTMLElement | null;
        next: HTMLElement | null;
        event: string;
    };
};
declare type CommandProps = {
    direction: string;
};
declare const _default: {
    create: (props: OrbitAnimationProps) => {
        states: StatesProps;
        onPrev: () => void;
        onNext: () => void;
        init: () => void;
    };
};
export default _default;
