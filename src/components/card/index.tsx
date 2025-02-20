import styles from './styles.module.scss';
import { Article } from '../../types';
import { formatTitle } from '../../helpers';

interface CardProps {
  data: Article;
}

const Card = (props: CardProps) => {
  const { data } = props;

  return (
    <div className={styles.card}>
      <div>
        <img className={styles.cardImage} src={data?.thumbnail} />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{formatTitle(data?.title, 60)}</h2>
        <h5 className={styles.cardDate}>{data?.date}</h5>
        <span className={styles.cardTag}>{data?.category}</span>
      </div>
    </div>
  );
};

export default Card;
