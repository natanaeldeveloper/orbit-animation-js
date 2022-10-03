export type OrbitAnimationProps = {
  children: string,
  deg: number,
  debug?: boolean,
  controls: {
    prev: string,
    next: string,
    event: string,
  }
}

type StatesProps = {
  children: Array<{ el: HTMLElement, deg: number, q: number }>,
  observers: Array<(command: CommandProps) => void>,
  debug: boolean,
  deg: number,
  controls: {
    prev: HTMLElement | null,
    next: HTMLElement | null,
    event: string,
  }
}

type CommandProps = {
  direction: string,
}

const OrbitAnimation = (props: OrbitAnimationProps) => {
  const states: StatesProps = {
    children: [],
    observers: [],
    debug: false,
    deg: 0,
    controls: {
      prev: null,
      next: null,
      event: 'click',
    }
  }

  function subscribe(observer: (command: CommandProps) => void) {
    states.observers.push(observer)
  }

  function notifyAll(command: CommandProps) {
    for (let observer in states.observers) {
      states.observers[observer](command)
    }
  }

  function init() {

    states.controls.prev = document.querySelector(props.controls.prev)
    states.controls.next = document.querySelector(props.controls.next)
    states.controls.event = props.controls.event
    states.deg = props.deg
    states.debug = props.debug ? props.debug : false

    document.querySelectorAll<HTMLElement>(props.children).forEach((item, index) => {
      states.children.push({
        el: item,
        deg: states.deg * index * -1,
        q: -1,
      })

      states.children.push({
        el: createParentElement(item),
        deg: states.deg * index,
        q: 1,
      })
    })

    handleElements()
    handleEvents()

    onNext()
  }

  function createParentElement(el: HTMLElement) {
    const parentElement = document.createElement('div')
    el.parentElement?.appendChild(parentElement)
    parentElement.classList.add('orbit_item')
    parentElement.appendChild(el)
    return parentElement
  }

  function handleElements() {
    states.children.forEach((item, index) => {

      if(states.debug) {
        item.el.style.border = '1px solid black';
      }

      const observer = (command: CommandProps) => {
        let deg = 0
        if (command.direction == 'next') {
          deg = item.deg + (states.deg * item.q)
        } else {
          deg = item.deg - (states.deg * item.q)
        }
        states.children[index].deg = deg
        item.el.style.rotate = deg + 'deg'
      }

      subscribe(observer)
    })
  }

  function handleEvents() {
    states.controls.prev?.addEventListener(states.controls.event, e => {
      notifyAll({ direction: 'prev' })
    })

    states.controls.next?.addEventListener(states.controls.event, e => {
      notifyAll({ direction: 'next' })
    })
  }

  function onPrev() {
    notifyAll({ direction: 'prev' })
  }

  function onNext() {
    notifyAll({ direction: 'next' })
  }

  return {
    states,
    onPrev,
    onNext,
    init,
  }
}

export default {
  create: OrbitAnimation
};
