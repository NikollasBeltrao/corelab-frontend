export interface Card {
    id: number;
    color: string;
    content: string | null;
    title: string | null;
    favorite: boolean;
    isChaged: boolean;
    id_user: number;
}

export interface CardProps {
    card: Card;
    isAddCard?: boolean;
    isLoading: (show: boolean) => void;
    showAlert: (alert: AlertProps) => void;
    changeCard: (card: Card) => void;
    reloadCards: () => void;
}

export interface ModalProps {
    title: string;
    content: string;
    id: string;
    onConfirm: () => any;
    onCancel: () => any;
}

export interface HeaderProps {
    onSearch: (value: string) => void;
}

export interface LoadingScreenProps {
    show: boolean;
}

export interface AlertProps {
    show: boolean;
    content: string;
    type: '' | 'success' | 'danger' | 'warning' | 'info';
}

export interface User {
    id_user: number;    
    name: string;
    login: string;
    password: string;
}