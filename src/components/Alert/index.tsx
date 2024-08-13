import React from 'react';
import styles from './Alert.module.scss';
import { AlertProps } from '../../types/interfaces';

const AlertComponent: React.FC<AlertProps> = ({ content, show, type }) => {

    return (
        <div className={`${styles.alert_container} alert alert-${type} fade ${show ? styles.show : ''}`} role="alert">
            {content}
        </div>
    )
}

export default AlertComponent;