"use client";

import * as React from "react";

import type { ToastProps } from "@/components/ui/toaster";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 3000;

export type Toast = ToastProps;

type ToastState = {
  toasts: Toast[];
};

type ToastAction =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "UPDATE_TOAST"; toast: Partial<Toast> & { id: string } }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.toast.id ? { ...toast, ...action.toast } : toast
        ),
      };
    case "DISMISS_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.toastId || action.toastId === undefined
            ? { ...toast, open: false }
            : toast
        ),
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.toastId),
      };
    default:
      return state;
  }
};

const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

const dispatch = (action: ToastAction) => {
  memoryState = toastReducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const toast = ({ ...props }: Omit<Toast, "id">) => {
  const id = crypto.randomUUID();

  const update = (updates: Toast) =>
    dispatch({ type: "UPDATE_TOAST", toast: { ...updates, id } });

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({ type: "ADD_TOAST", toast: { ...props, id, open: true } });

  if (!toastTimeouts.has(id)) {
    toastTimeouts.set(
      id,
      setTimeout(() => {
        toastTimeouts.delete(id);
        dispatch({ type: "REMOVE_TOAST", toastId: id });
      },
      TOAST_REMOVE_DELAY)
    );
  }

  return { id, dismiss, update };
};

const useToast = () => {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
};

export { useToast, toast };
