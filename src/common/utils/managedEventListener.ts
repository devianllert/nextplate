export type EventMap<T> = T extends Window
  ? WindowEventMap
  : T extends Document
    ? DocumentEventMap
    : { [key: string]: Event };

export function managedEventListener<
  T extends EventTarget,
  K extends keyof EventMap<T> & string,
>(
  target: T,
  type: K,
  callback: (event: EventMap<T>[K]) => void,
  options?: AddEventListenerOptions,
): () => void {
  target.addEventListener(type, callback as EventListener, options);

  return (): void => {
    target.removeEventListener(type, callback as EventListener, options);
  };
}
