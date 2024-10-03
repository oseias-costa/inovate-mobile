import * as Haptics from 'expo-haptics';
import { ReactNode, createContext, useContext, useRef, useState } from 'react';

import ToastTest from '../lib/ToastTest';

interface ToastContextType {
  showToast: (message: string, type: Severity) => void;
}

export enum Severity {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
}

type Data = {
  severity: Severity;
  message: string;
};

export const ToastContext = createContext<ToastContextType>({
  showToast: () => null,
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Data>({
    message: '',
    severity: Severity.SUCCESS,
  });

  const ToastRef = useRef<{ toast: () => void } | null>(null);

  const showToast = (message: string, type: Severity) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setData({ message, severity: type });
    if (ToastRef.current) {
      ToastRef?.current?.toast();
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastTest ref={ToastRef} message={data.message} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
