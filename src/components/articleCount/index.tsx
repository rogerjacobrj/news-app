import styles from './styles.module.scss';

interface ArticleCountProps {
  count: number;
}

const ArticleCount = (props: ArticleCountProps) => {
  const { count } = props;

  return <p className={styles.resultCount}>{count} Articles</p>;
};

export default ArticleCount;
