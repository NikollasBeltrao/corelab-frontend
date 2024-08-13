import React from 'react';
import { LoadingScreenProps } from '../../types/interfaces';
import styles from './LoadingScreen.module.scss';

const LoadingScreenComponent: React.FC<LoadingScreenProps> = ({ show }) => {

    return (
        <div className={`${styles.container_loading} ${show ? styles.show : ""}`}>
            <div className="d-flex justify-content-center">
                <div className={`${styles.custom_spinner} spinner-border text-light`} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreenComponent;