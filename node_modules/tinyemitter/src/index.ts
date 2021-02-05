export interface IHandle {
  (...args: any[]): void
}

interface IEventList {
  [name: string]: IHandle[]
}

export default class TinyEmitter {
  private e: IEventList

  constructor() {
    this.e = {}
  }

  on(name: string, handle: IHandle) {
    const e = this.e
    ;(e[name] || (e[name] = [])).push(handle)
  }

  off(name: string, handle?: IHandle) {
    const e = this.e
    if (!handle) {
      delete e[name]
      return
    }
    const events = e[name]
    if (!events) return
    const i = events.indexOf(handle)
    if (i >= 0) {
      if (events.length === 1) {
        delete e[name]
      } else {
        // 使用新数组替代原本的数组，
        // 这是为了避免在回调函数内调用 off 方法时改变了数组导致前面的回调函数被跳过
        e[name] = events.filter(h => h !== handle)
      }
    }
  }

  emit(name: string, ...args: any[]) {
    const events = this.e[name]
    if (!events) return
    events.forEach(handle => {
      handle.apply(null, args)
    })
  }
}
