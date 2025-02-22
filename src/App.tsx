import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
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
  FilterSection,
  SelectInput,
} from './components';
import { sortOptions, API_URL } from './constants';
import useFetch from './hooks/useFetch';
import { Article, Category, SelectOption, ParamProps } from './types';
import { generateUrl, formatDateRange } from './helpers';
import Loader from './components/loader';
import { useInView } from 'react-intersection-observer';
import { SingleValue } from 'react-select';
import useDebounce from './hooks/useDebounce';
import { isMobile } from 'react-device-detect';

const App = () => {
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [params, setParams] = useState<ParamProps>({
    source: 'newyork_times',
    page: 1,
    size: 10,
    sortBy: { label: 'Newest', value: 'newest' },
    query: '',
    startDate: null,
    endDate: null,
    dateRange: null,
    selectedCategories: [],
  });

  const debouncedSearchQuery = useDebounce(params.query, 500);

  const toggleMobileFilter = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  useEffect(() => {
    if (debouncedSearchQuery || params.selectedCategories || params.source || params.dateRange) {
      setParams({ ...params, page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, params.selectedCategories, params.source, params.dateRange]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading } = useFetch<any>({
    url: `${API_URL}/articles?${generateUrl(params.source, params.page, params.size, params.sortBy, debouncedSearchQuery, params.selectedCategories, params.dateRange)}`,
  });

  useEffect(() => {
    if (data?.articles) {
      const results = data?.articles;
      const categoryData = data?.categories;

      if (results && results?.length > 0) {
        if (params.page === 1) {
          setArticles(results);
        } else {
          setArticles((prevArticles) => [...prevArticles, ...results]);
        }
      }

      // Remove this section when using categories from API
      if (categoryData?.length > 0) {
        setCategories(categoryData);
      } else if (categoryData?.length === 0) {
        setCategories([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { ref, inView } = useInView({
    rootMargin: '100px 0px',
  });

  useEffect(() => {
    if (inView && !isLoading) {
      setParams({ ...params, page: Number(params.page) + 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const handleSort = (option: SingleValue<SelectOption>) => {
    setParams({ ...params, sortBy: option! });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, query: event?.target?.value });
  };

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, source: event?.target?.value });
  };

  const onCheckBoxChange = (value: string) => {
    const categories: string[] = [...params.selectedCategories];
    const index = categories.findIndex((item) => item === value);

    if (index === -1) {
      categories.push(value);
      setParams({ ...params, selectedCategories: categories });
    } else {
      const filteredCategories = categories.filter((item) => item !== value);
      setParams({ ...params, selectedCategories: filteredCategories });
    }
  };

  const onDateChange = (entity: string, date: Date) => {
    if (entity === 'startDate') setParams({ ...params, startDate: date });
    if (entity === 'endDate') setParams({ ...params, endDate: date });
  };

  useEffect(() => {
    if (params.startDate && params.endDate) {
      const { from, to } = formatDateRange(params.source, params.startDate, params.endDate);
      setParams({ ...params, dateRange: { from, to } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.startDate, params.endDate, params.source]);

  useEffect(() => {
    if (params.dateRange && (params.startDate === null || params.endDate === null)) {
      setParams({ ...params, dateRange: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.startDate, params.endDate]);

  const clearDateFilter = () => {
    setParams({ ...params, startDate: null, endDate: null, dateRange: null });
  };

  const resetAllFilters = () => {
    setParams({ ...params, selectedCategories: [] });
    clearDateFilter();
  };

  return (
    <div className={styles.newsFeed}>
      <Header />
      <Banner />

      <section className={styles.contentSection}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 d-lg-none">
              <TextInput
                placeholder="Search Articles"
                onChange={handleSearch}
                value={params.query}
              />
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
                <SelectInput
                  showLabel={true}
                  label="Sort"
                  options={sortOptions}
                  selectedOption={params.sortBy}
                  onChange={handleSort}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="d-none d-lg-block col-lg-3">
              <FilterSection
                categories={categories}
                source={params.source}
                onRadioChange={onRadioChange}
                onCheckBoxChange={onCheckBoxChange}
                onDateChange={onDateChange}
                startDate={params.startDate}
                endDate={params.endDate}
                clearDateFilter={clearDateFilter}
                selectedCategories={params.selectedCategories}
              />
            </div>
            <div className="col-12 col-md-12 col-lg-9">
              <div className="row d-none d-lg-block">
                <div className="col-12 col-md-12 d-none d-lg-block">
                  <TextInput
                    placeholder="Search Articles"
                    onChange={handleSearch}
                    value={params.query}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 d-none d-lg-block">
                  <ArticleCount count={articles?.length} />
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                  <div className={styles.sortContainer}>
                    <SelectInput
                      showLabel={true}
                      label="Sort"
                      options={sortOptions}
                      selectedOption={params.sortBy}
                      onChange={handleSort}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.cardContainer}>
                {articles?.length > 0 &&
                  articles.map((article: Article) => {
                    return <Card key={article.id} data={article} />;
                  })}

                <div ref={ref} className={styles.intersectionElement}>
                  {isLoading && !isMobile && <Loader />}
                </div>
              </div>
            </div>
          </div>
        </div>

        <MobileFilter
          showMobileFilter={showFilterPopup}
          toggleShowMobileFilter={toggleMobileFilter}
          categories={categories}
          source={params.source}
          onRadioChange={onRadioChange}
          onCheckBoxChange={onCheckBoxChange}
          onDateChange={onDateChange}
          startDate={params.startDate}
          endDate={params.endDate}
          clearDateFilter={clearDateFilter}
          resetAllFilters={resetAllFilters}
          selectedCategories={params.selectedCategories}
        />
      </section>
    </div>
  );
};

export default App;
