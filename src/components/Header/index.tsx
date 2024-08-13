import React, { useState } from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg';
import close from '../../assets/close.svg';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import ModalComponent from '../Modal';
import { HeaderProps, ModalProps } from '../../types/interfaces';

const HeaderComponent: React.FC<HeaderProps> = ({ onSearch }) => {
    const dispatch = useDispatch();
    const [modalConfig, setModalConfig] = useState<ModalProps>({
        id: "modalHeader",
        title: "",
        content: "",
        onConfirm: () => { },
        onCancel: () => { }
    });

    return (
        <header>
            <ModalComponent
                id={modalConfig.id}
                title={modalConfig.title}
                content={modalConfig.content}
                onConfirm={modalConfig.onConfirm}
                onCancel={modalConfig.onCancel}
            />
            <nav className={styles.navbar}>
                <div className={styles.container_fluid}>
                    <div className={styles.container_left}>
                        <img
                            src={logo}
                            title="CoreNotes"
                            alt="Logo"
                            width={36}
                            height={36}
                        />
                        <span>CoreNotes</span>
                        <div className={styles.search_container}>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Pequisar notas"
                                onChange={(e) => onSearch(e.target.value)}
                            />
                            <BsSearch
                                className={styles.search_button}
                                title="Pesquisar"
                            />
                        </div>
                    </div>
                    <img
                        title="Sair"
                        className={styles.close}
                        src={close}
                        alt="Sair"
                        width={15}
                        height={15}
                        data-bs-toggle="modal"
                        data-bs-target={`#${modalConfig.id}`}
                        onClick={() => {
                            setModalConfig({
                                id: modalConfig.id,
                                title: "Sair",
                                content: "Tem certeza de que deseja sair?",
                                onConfirm: () => dispatch(logout()),
                                onCancel: () => { }
                            });
                        }}
                    />
                </div>
            </nav>
        </header>
    )
}

export default HeaderComponent;