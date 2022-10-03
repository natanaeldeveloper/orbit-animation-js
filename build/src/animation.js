const OrbitAnimation = (props) => {
    const states = {
        children: [],
        observers: [],
        debug: false,
        deg: 0,
        controls: {
            prev: null,
            next: null,
            event: 'click',
        }
    };
    function subscribe(observer) {
        states.observers.push(observer);
    }
    function notifyAll(command) {
        for (let observer in states.observers) {
            states.observers[observer](command);
        }
    }
    function init() {
        states.controls.prev = document.querySelector(props.controls.prev);
        states.controls.next = document.querySelector(props.controls.next);
        states.controls.event = props.controls.event;
        states.deg = props.deg;
        states.debug = props.debug ? props.debug : false;
        document.querySelectorAll(props.children).forEach((item, index) => {
            states.children.push({
                el: item,
                deg: states.deg * index * -1,
                q: -1,
            });
            states.children.push({
                el: createParentElement(item),
                deg: states.deg * index,
                q: 1,
            });
        });
        handleElements();
        handleEvents();
        onNext();
    }
    function createParentElement(el) {
        var _a;
        const parentElement = document.createElement('div');
        (_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(parentElement);
        parentElement.classList.add('orbit_item');
        parentElement.appendChild(el);
        return parentElement;
    }
    function handleElements() {
        states.children.forEach((item, index) => {
            if (states.debug) {
                item.el.style.border = '1px solid black';
            }
            const observer = (command) => {
                let deg = 0;
                if (command.direction == 'next') {
                    deg = item.deg + (states.deg * item.q);
                }
                else {
                    deg = item.deg - (states.deg * item.q);
                }
                states.children[index].deg = deg;
                item.el.style.rotate = deg + 'deg';
            };
            subscribe(observer);
        });
    }
    function handleEvents() {
        var _a, _b;
        (_a = states.controls.prev) === null || _a === void 0 ? void 0 : _a.addEventListener(states.controls.event, e => {
            notifyAll({ direction: 'prev' });
        });
        (_b = states.controls.next) === null || _b === void 0 ? void 0 : _b.addEventListener(states.controls.event, e => {
            notifyAll({ direction: 'next' });
        });
    }
    function onPrev() {
        notifyAll({ direction: 'prev' });
    }
    function onNext() {
        notifyAll({ direction: 'next' });
    }
    return {
        states,
        onPrev,
        onNext,
        init,
    };
};
export default {
    create: OrbitAnimation
};
//# sourceMappingURL=animation.js.map