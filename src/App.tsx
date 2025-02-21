import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './styles/global.scss';
import styles from './style.module.scss';
import {
  ArticleCount,
  Banner,
  Header,
  TextInput,
  Button,
  Card,
  MobileFilter,
  SelectInput,
} from './components';
import { sortOptions, API_URL } from './constants';
import useFetch from './hooks/useFetch';
import { Article, Category } from './types';
import { useInView } from 'react-intersection-observer';
import { mergeArticleArrays } from './helpers';
import Loader from './components/loader';

const App = () => {
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [source] = useState<string>('guardian');
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(12);
  const [, setHasMore] = useState<boolean>(true);

  const toggleMobileFilter = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading } = useFetch<any>({
    url: `${API_URL}/articles?source=${source}&size=${size}&page=${page}`,
    page,
  });

  useEffect(() => {
    if (data?.articles) {
      const results = data?.articles;

      if (results && results?.length > 0) {
        const merged = mergeArticleArrays(articles, results);
        setArticles(merged);
      } else if (results && results?.length === 0) {
        setHasMore(false);
      }

      if (source === 'guardian' && categories?.length === 0) {
        setCategories(results?.sections);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isLoading]);

  return (
    <div className={styles.newsFeed}>
      <Header />
      <Banner />

      <section className={styles.contentSection}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 d-lg-none">
              <TextInput placeholder="Search Articles" />
            </div>
            <div className="col-6 col-md-6 d-none d-md-block d-lg-none">
              <div className={styles.toggleMobileFilter}>
                <Button label="Filters" customClass={`d-block`} onClick={toggleMobileFilter} />
              </div>
            </div>
            <div className="col-6 col-lg-6 d-lg-none">
              <ArticleCount count={articles?.length} />
            </div>
            <div className="col-6 col-md-6 col-lg-6 d-lg-none">
              <div className={styles.sortContainer}>
                <SelectInput showLabel={true} label="Sort" options={sortOptions} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="d-none d-lg-block col-lg-3">Filters Sidebar in Desktop</div>
            <div className="col-12 col-md-12 col-lg-9">
              <div className="row d-none d-lg-block">
                <div className="col-12 col-md-12 d-none d-lg-block">
                  <TextInput placeholder="Search Articles" />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 d-none d-lg-block">
                  <ArticleCount count={articles?.length} />
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                  <div className={styles.sortContainer}>
                    <SelectInput showLabel={true} label="Sort" options={sortOptions} />
                  </div>
                </div>
              </div>
              <div className={styles.cardContainer}>
                {articles?.length > 0 &&
                  articles.map((article: Article) => {
                    return <Card key={article.id} data={article} />;
                  })}
                <div ref={ref} className={styles.intersectionElement} />
              </div>
              {isLoading && <Loader />}
            </div>
          </div>
        </div>

        <MobileFilter
          showMobileFilter={showFilterPopup}
          toggleShowMobileFilter={toggleMobileFilter}
        />
      </section>
    </div>
  );
};

export default App;
