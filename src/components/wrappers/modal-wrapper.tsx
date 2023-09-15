import { ModalId } from 'lib/types/global';
import { ReactNode, createContext, useContext, useState } from 'react';

type ModalProps = {
  title: string;
  content: ReactNode;
  id: ModalId;
  onClose?: (p?: any) => void;
  size?: number;
};

type InitialState = {
  modal: ModalProps | null;
  setModal: React.Dispatch<React.SetStateAction<ModalProps | null>>;
  closeModal: (callback?: () => void) => void;
};

const initialState: InitialState = {
  modal: null,
  setModal: () => {},
  closeModal: () => {},
};

const ModalContext = createContext<InitialState>(initialState);

export function ModalWrapper({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalProps | null>(initialState.modal);

  function closeModal() {
    if (modal?.onClose) {
      modal?.onClose();
    }
    setModal(null);
  }

  const value = {
    modal,
    setModal,
    closeModal,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
