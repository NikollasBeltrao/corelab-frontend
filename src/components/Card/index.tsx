import React, { useEffect, useRef, useState } from 'react';
import styles from './Card.module.scss';
import starFull from '../../assets/star_full.svg';
import starEmpty from '../../assets/star_empty.svg';
import closeButton from '../../assets/close.svg';
import paint_bucket from '../../assets/paint_bucket.svg';
import pencil from '../../assets/pencil.svg';
import { card_colors } from '../../constants/card_colors';
import { Card, CardProps, ModalProps } from '../../types/interfaces';
import { deleteCard, insertCard, updateCard } from '../../services/CardService';
import ModalComponent from '../Modal';

const CardComponent: React.FC<CardProps> = ({ card, isAddCard, isLoading, changeCard, reloadCards, showAlert }) => {
    const [isEditing, setIsEditing] = useState(card.isChaged);
    const [chooseColors, setChooseColors] = useState(false);
    const [hasChanges, setHasChanges] = useState(card.isChaged);
    const [cardForm, setCardForm] = useState<Card>(card);
    const colorsRef = useRef<HTMLDivElement | null>(null);
    const btnColorsRef = useRef<HTMLButtonElement | null>(null);
    const [modalConfig, setModalConfig] = useState<ModalProps>({
        id: `modalCard${card.id}`,
        title: "",
        content: "",
        onConfirm: () => { },
        onCancel: () => { }
    });

    function handleInsert() {
        isLoading(true);
        insertCard(cardForm)
            .then((card) => {
                if (card) {
                    showAlert({
                        show: true,
                        content: "Nota cadastrada com sucesso!",
                        type: "success"
                    })
                    setIsEditing(false);
                    setHasChanges(false);
                    setCardForm({
                        ...cardForm,
                        id: 0,
                        color: card_colors[0],
                        content: '',
                        title: 'Título',
                        isChaged: false,
                        favorite: false
                    })
                    reloadCards();
                } else {
                    isLoading(false);
                    showAlert({
                        show: true,
                        content: "Erro ao cadastrar nota!",
                        type: "danger"
                    })
                }
            })
    }

    function handleUpdate() {
        isLoading(true);
        updateCard(cardForm)
            .then((card) => {
                if (card) {
                    showAlert({
                        show: true,
                        content: "Nota atualizada com sucesso!",
                        type: "success"
                    })
                    reloadCards();
                } else {
                    isLoading(false);
                    showAlert({
                        show: true,
                        content: "Erro ao atualizar nota!",
                        type: "danger"
                    })
                }
            })
    }

    function handleDelete() {
        isLoading(true);
        deleteCard(card.id)
            .then((response) => {
                if (response) {
                    showAlert({
                        show: true,
                        content: "Nota removida com sucesso!",
                        type: "success"
                    })
                    reloadCards();
                } else {
                    isLoading(false);
                    showAlert({
                        show: true,
                        content: "Erro ao remover nota!",
                        type: "danger"
                    })
                }
            })
    }

    const handleCloseColors = (event: MouseEvent) => {
        if (
            (colorsRef.current && !colorsRef.current.contains(event.target as Node)) &&
            btnColorsRef.current && !btnColorsRef.current.contains(event.target as Node)
        ) {
            setChooseColors(false);
        }
    };

    useEffect(() => {
        if (chooseColors) {
            document.addEventListener('mousedown', handleCloseColors);
        } else {
            document.removeEventListener('mousedown', handleCloseColors);
        }
    }, [chooseColors]);

    return (
        <>
            <ModalComponent
                id={modalConfig.id}
                title={modalConfig.title}
                content={modalConfig.content}
                onConfirm={modalConfig.onConfirm}
                onCancel={modalConfig.onCancel}
            />
            <div
                className={`${styles.card} ${(isAddCard ? styles.collapse : "")}`}
                style={{ backgroundColor: cardForm.color }}
            >
                <div className={styles.header}>
                    <input
                        type="text"
                        value={cardForm.title ?? ''}
                        onChange={(e) => {
                            setHasChanges(true);
                            setCardForm({ ...cardForm, title: e.target.value });
                        }}
                        disabled={!isEditing && !isAddCard}
                    />
                    <button
                        className={`${styles.create_card} ${(hasChanges && isAddCard ? styles.active : "")}`}
                        onClick={handleInsert}
                    >
                        Salvar nota...
                    </button>
                    {cardForm.favorite ?
                        <button
                            onClick={() => {
                                setHasChanges(true);
                                setCardForm({ ...cardForm, favorite: false });
                                changeCard({ ...cardForm, favorite: false });
                            }}
                        >
                            <img
                                src={starFull}
                                alt="Star Full"
                                title="Favorito"
                                width={20}
                                height={20}

                            />
                        </button>
                        :
                        <button
                            onClick={() => {
                                setHasChanges(true);
                                setCardForm({ ...cardForm, favorite: true });
                                changeCard({ ...cardForm, favorite: true });
                            }}
                        >
                            <img
                                src={starEmpty}
                                alt="Star Empty"
                                title="Favorito"
                                width={20}
                                height={20}
                            />
                        </button>
                    }
                </div>
                <div className={styles.body}>
                    <textarea
                        id={styles.textarea}
                        placeholder={isAddCard ? "Criar nota..." : "Escreva uma anotação..."}
                        value={cardForm.content ?? ''}
                        className={(isAddCard ? styles.collapse : '')}
                        onChange={(e) => {
                            setHasChanges(true);
                            setCardForm({ ...cardForm, content: e.target.value })
                        }}
                        disabled={!isEditing && !isAddCard}
                    ></textarea>
                </div>
                {!isAddCard ?
                    <div className={styles.footer}>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`${styles.btn_icon} ${isEditing ? styles.active : ""}`}
                        >
                            <img
                                src={pencil}
                                alt="pencil"
                                title="Editar"
                                width={20}
                                height={20}
                            />
                        </button>
                        <button
                            onClick={() => setChooseColors(!chooseColors)}
                            className={`${styles.btn_icon} ${chooseColors ? styles.active : ""}`}
                            data-bs-toggle="collapse"
                            data-bs-target={`#chooseColors${cardForm.id}`}
                            aria-expanded={chooseColors}
                            aria-controls={`chooseColors${cardForm.id}`}
                            ref={btnColorsRef}
                        >
                            <img
                                src={paint_bucket}
                                alt="paint_bucket"
                                title="Cores"
                                width={20}
                                height={20}
                            />

                        </button>
                        <div
                            className={`collapse ${chooseColors ? "show" : ''}`}
                            id={`chooseColors${cardForm.id}`}
                            ref={colorsRef}
                        >
                            <div className={`card card-body ${styles.chooseColors}`}>
                                {card_colors.map((bg_color) => {
                                    return (
                                        <button
                                            key={bg_color}
                                            className={`${styles.btn_colors} ${(bg_color === cardForm.color ? styles.active : '')}`}
                                            style={{ backgroundColor: bg_color }}
                                            onClick={() => {
                                                setHasChanges(true);
                                                setCardForm({ ...cardForm, color: bg_color })
                                            }}
                                        >
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.container_save}>
                            <button
                                className={`${styles.save_changes} ${(hasChanges ? styles.active : "")}`}
                                onClick={handleUpdate}
                            >
                                Salvar alterações...
                            </button>
                        </div>
                        <button
                            className={styles.btn_icon}
                            data-bs-toggle="modal"
                            data-bs-target={`#${modalConfig.id}`}
                            onClick={() =>
                                setModalConfig({
                                    id: modalConfig.id,
                                    title: "Remover nota",
                                    content: `Tem certeza de que deseja remover a nota ${cardForm.title}?`,
                                    onConfirm: () => handleDelete(),
                                    onCancel: (() => { })
                                })
                            }
                        >
                            <img
                                src={closeButton}
                                alt="closeButton"
                                title="Remover"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div> : ''
                }
            </div>
        </>
    )
}

export default CardComponent;