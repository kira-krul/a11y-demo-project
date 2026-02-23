import { useLayoutEffect, useRef } from "react";

export function useDialog(isOpen: boolean) {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);
  return ref;
}
