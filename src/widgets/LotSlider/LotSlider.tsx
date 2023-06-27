import React from 'react';
import uuid from 'react-uuid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './LotSlider.module.scss';
import classNames from 'classnames';
import { IconButton } from '@mui/material';

interface ISlider {
    images: string[];
}

export function LotSlider({ images }: ISlider) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const goToNextSlide = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
    };

    const goToPrevSlide = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
    };

    return (
        <div className={styles.slider}>
            <div className={styles.images}>
                {images.length ? (
                    images.map((image, index) => (
                        <img
                            key={uuid()}
                            src={image}
                            alt={`Slide ${index}`}
                            className={classNames(styles.sliderImage, {
                                [styles.active]: index === currentIndex,
                            })}
                        />
                    ))
                ) : (
                    <div></div>
                )}
            </div>

            <div className={styles.buttonsWrapper}>
                <IconButton onClick={() => goToPrevSlide()}>
                    <div className={styles.btn}>
                        <ArrowBackIosIcon fontSize="small" />
                    </div>
                </IconButton>

                <IconButton onClick={() => goToNextSlide()}>
                    <div className={styles.btn}>
                        <ArrowForwardIosIcon fontSize="small" />
                    </div>
                </IconButton>
            </div>
        </div>
    );
}
