import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import CardComponent from '../../components/Card';
import { card_colors } from '../../constants/card_colors';
import HeaderComponent from '../../components/Header';
import { AlertProps, Card } from '../../types/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CardPlaceholder from '../../components/Card/CardPlaceholder';
import { getCards } from '../../services/CardService';
import LoadingScreenComponent from '../../components/LoadingScreen';
import AlertComponent from '../../components/Alert';

const HomePage: React.FC = () => {
    const id_user = useSelector((state: RootState) => state.auth.id);
    const user_name = useSelector((state: RootState) => state.auth.name);
    const [cards, setCards] = useState(Array<Card>);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [alertConfig, setAlertConfig] = useState<AlertProps>({
        show: false,
        content: '',
        type: ''
    })


    function getContent() {
        setLoading(true);
        if (id_user) {
            getCards(id_user)
                .then(cards => {
                    if (cards) {
                        setCards(cards);
                    } else {
                        console.log(cards);
                        setAlertConfig({
                            show: true,
                            content: "Erro ao carregar notas",
                            type: "danger"
                        });
                    }
                })
                .finally(() => setLoading(false));
        }
    }

    function changeCard(card: Card) {
        const index = filteredCards.findIndex(c => c.id === card.id);
        var newCards = [...cards];
        newCards[index] = {
            ...newCards[index],
            color: card.color,
            content: card.content,
            title: card.title,
            favorite: card.favorite,
            isChaged: true
        };
        setCards(newCards);
    }

    const filteredCards = cards.filter(card =>
    (
        search.toLowerCase() === '' ||
        (
            card.title?.toLowerCase().includes(search.toLowerCase()) ||
            card.content?.toLowerCase().includes(search.toLowerCase())
        )
    )
    );

    useEffect(() => {
        getContent();
    }, [id_user])

    useEffect(() => {
        if (alertConfig.show) {
            const timer = setTimeout(() => {
                setAlertConfig({...alertConfig, show: false});
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alertConfig]);

    return (
        <>
            <AlertComponent
                show={alertConfig.show}
                content={alertConfig.content}
                type={alertConfig.type}
            />
            <LoadingScreenComponent show={loading}></LoadingScreenComponent>
            <HeaderComponent
                onSearch={setSearch}
            />
            <p className={styles.user_name}>
                Olá, {user_name}
            </p>
            <section className={styles.home_page}>
                <CardComponent
                    card={{
                        id: 0,
                        id_user: id_user ?? 0,
                        color: card_colors[0],
                        content: '',
                        title: 'Título',
                        isChaged: false,
                        favorite: false
                    }}
                    isAddCard={true}
                    changeCard={changeCard}
                    reloadCards={getContent}
                    isLoading={setLoading}
                    showAlert={setAlertConfig}
                />
                {/*Favoritos*/}
                <h6>Favoritas</h6>
                <div className={styles.container_cards}>
                    {!loading ? <>
                        {filteredCards?.filter((card) => card.favorite).length === 0 ?
                            <small className="text-body-tertiary">Nenhum favorito encontrado...</small>
                            : ''}
                        {filteredCards?.filter((card) => card.favorite)
                            .map((card) => {
                                return (
                                    <CardComponent
                                        key={card.id}
                                        card={card}
                                        changeCard={changeCard}
                                        reloadCards={getContent}
                                        isLoading={setLoading}
                                        showAlert={setAlertConfig}
                                    />
                                )
                            })
                        }
                    </> :
                        <>
                            <CardPlaceholder />
                            <CardPlaceholder />
                        </>}
                </div>
                {/*Cards*/}
                <h6>Outras</h6>
                <div className={styles.container_cards}>
                    {!loading ? <>
                        {filteredCards?.filter((card) => !card.favorite).length === 0 ?
                            <small className="text-body-tertiary">Nenhum card encontrado...</small>
                            : ''}
                        {filteredCards?.filter((card) => !card.favorite)
                            .map((card) => {
                                return (
                                    <CardComponent
                                        key={card.id}
                                        card={card}
                                        changeCard={changeCard}
                                        reloadCards={getContent}
                                        isLoading={setLoading}
                                        showAlert={setAlertConfig}
                                    />
                                )
                            })
                        }
                    </> :
                        <>
                            <CardPlaceholder />
                            <CardPlaceholder />
                        </>}
                </div>
            </section >
        </>
    )
}

export default HomePage;