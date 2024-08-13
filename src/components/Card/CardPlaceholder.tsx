import React from 'react';
import styles from './Card.module.scss';

const CardPlaceholder: React.FC = () => {

    return (
        <div className={styles.card} aria-hidden="true" >
            <div className={`${styles.header} placeholder-glow`}>
                <span className="placeholder col-3"></span>
                <span className="placeholder rounded-circle" style={{ width: '20px', height: '20px' }}></span>
            </div>
            <div className="card-body w-100 p-4">
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                </p>
            </div>
            <div className={`${styles.footer} card-text placeholder-glow`}>
                <div>
                    <span className="placeholder rounded-circle ms-3" style={{ width: '20px', height: '20px' }}></span>
                    <span className="placeholder rounded-circle ms-5" style={{ width: '20px', height: '20px' }}></span>
                </div>
                <span className="placeholder rounded-circle me-3" style={{ width: '20px', height: '20px' }}></span>
            </div>
        </div>
    )
}

export default CardPlaceholder;