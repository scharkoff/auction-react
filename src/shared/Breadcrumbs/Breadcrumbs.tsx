import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';
import { ILotData } from 'redux/slices/lots';

interface IBreadcrumbs {
    lot: ILotData;
}

export function Breadcrumbs({ lot }: IBreadcrumbs) {
    return (
        <div className={styles.breadcrumbs}>
            <Link to="/">
                {' '}
                <span>Главная</span> /{' '}
            </Link>
            <span>
                <Link to={`/auction/${lot?.auction?.id}`}>{lot?.auction?.title}</Link>
            </span>{' '}
            / <span>{lot?.title}</span>
        </div>
    );
}
