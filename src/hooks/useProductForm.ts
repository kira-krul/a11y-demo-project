import {
  useState,
  type KeyboardEventHandler,
  type SubmitEventHandler,
} from "react";

export function useProductForm(onConfirm: () => void) {
  const handleSubmit: SubmitEventHandler<
    HTMLFormElement | HTMLDialogElement
  > = (event) => {
    event.preventDefault();
    onConfirm();
  };
  const handleInvalid: KeyboardEventHandler<HTMLFormElement> = (event) => {
    console.log("Invalid form submission", event);
    const target = event.target as HTMLInputElement;
    if (target.name === "sizes") {
      setSizeError("Please select a size");
    }
    if (target.name === "colors") {
      setColorError("Please select a color");
    }
  };

  const [sizeError, setSizeError] = useState<string | null>(null);
  const [colorError, setColorError] = useState<string | null>(null);

  return {
    formProps: { onSubmit: handleSubmit, onInvalidCapture: handleInvalid },
    errors: { color: colorError, size: sizeError },
  };
}
