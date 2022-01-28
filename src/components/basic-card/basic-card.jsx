import React from 'react';
import styles from './basic-card.module.css';

const isUrl = (url) => {
  return url.indexOf('https://') >= 0;
};

function StaticGradiantCard(props) {
  const {
    title,
    avatar,
    content,
    href,
    styleType,
  } = props;
  return (
    <div className={[
      styles.cardWrapper,
      styles[styleType] || styles.spectrumBackground,
      'basic-card'
    ].join(' ')
    }
      onClick={() => {
        window.open(href, '_blank');
      }}>
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>
          {isUrl(avatar) ? <img src={avatar}></img> : avatar}
        </div>
        <div className={styles.title}>
          {title}
        </div>
      </div>

      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
}

export default StaticGradiantCard;
