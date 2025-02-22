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
import { Article, Category, SelectOption, DateRange } from './types';
import {
  formatDateCompact,
  formatYYYYMMDDDate,
  generateUrl,
  mergeArticleArrays,
  // mergeCategoryArrays,
  // removeCategoryDuplicates,
} from './helpers';
import Loader from './components/loader';
import { useInView } from 'react-intersection-observer';
import { SingleValue } from 'react-select';
import useDebounce from './hooks/useDebounce';
import { isMobile } from 'react-device-detect';

const App = () => {
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [source, setSource] = useState<string>('newyork_times');
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [sortBy, setSortBy] = useState<SelectOption>({ label: 'Newest', value: 'newest' });
  const [query, setQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(query, 500);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const toggleMobileFilter = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  useEffect(() => {
    if (debouncedSearchQuery || selectedCategories || source || dateRange) {
      setPage(1);
    }
  }, [debouncedSearchQuery, selectedCategories, source, dateRange]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading } = useFetch<any>({
    url: `${API_URL}/articles?${generateUrl(source, page, size, sortBy, debouncedSearchQuery, selectedCategories, dateRange)}`,
  });

  useEffect(() => {
    if (data?.articles) {
      const results = data?.articles;
      const categoryData = data?.categories;

      if (results && results?.length > 0) {
        if (debouncedSearchQuery) {
          setArticles(results);
        } else if (page === 1) {
          setArticles(results);
        } else {
          const merged = mergeArticleArrays(articles, results);
          setArticles(merged);
        }
      }

      if (categoryData?.length > 0) {
        setCategories(categoryData);
      } else if (categoryData?.length === 0) {
        setCategories([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      if (data?.articles?.length > 0) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [inView, data]);

  const handleSort = (option: SingleValue<SelectOption>) => {
    setSortBy(option!);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event?.target?.value);
  };

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSource(event?.target?.value);
  };

  const onCheckBoxChange = (value: string) => {
    const categories: string[] = [...selectedCategories];
    const index = categories.findIndex((item) => item === value);

    if (index === -1) {
      categories.push(value);
      setSelectedCategories(categories);
    } else {
      const filteredCategories = categories.filter((item) => item !== value);
      setSelectedCategories(filteredCategories);
    }
  };

  const onDateChange = (entity: string, date: Date) => {
    if (entity === 'startDate') setStartDate(date);
    if (entity === 'endDate') setEndDate(date);
  };

  useEffect(() => {
    if (startDate && endDate) {
      if (source === 'guardian' || source === 'news_api') {
        const from = formatYYYYMMDDDate(startDate);
        const to = formatYYYYMMDDDate(endDate);
        setDateRange({ from, to });
      } else if (source === 'newyork_times') {
        const from = formatDateCompact(startDate);
        const to = formatDateCompact(endDate);
        setDateRange({ from, to });
      }
    }
  }, [startDate, endDate, source]);

  useEffect(() => {
    if (dateRange && (startDate === null || endDate === null)) {
      setDateRange(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setDateRange(null);
  };

  const resetAllFilters = () => {
    setSelectedCategories([]);
    clearDateFilter();
  };

  useEffect(() => {
    if (source) {
      setSelectedCategories([]);
      clearDateFilter();
    }
  }, [source]);

  return (
    <div className={styles.newsFeed}>
      <Header />
      <Banner />

      <section className={styles.contentSection}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 d-lg-none">
              <TextInput placeholder="Search Articles" onChange={handleSearch} value={query} />
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
                  selectedOption={sortBy}
                  onChange={handleSort}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="d-none d-lg-block col-lg-3">
              <FilterSection
                categories={categories}
                source={source}
                onRadioChange={onRadioChange}
                onCheckBoxChange={onCheckBoxChange}
                onDateChange={onDateChange}
                startDate={startDate}
                endDate={endDate}
                clearDateFilter={clearDateFilter}
                selectedCategories={selectedCategories}
              />
            </div>
            <div className="col-12 col-md-12 col-lg-9">
              <div className="row d-none d-lg-block">
                <div className="col-12 col-md-12 d-none d-lg-block">
                  <TextInput placeholder="Search Articles" onChange={handleSearch} value={query} />
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
                      selectedOption={sortBy}
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
                <div ref={ref} className={styles.intersectionElement} />
              </div>
              {isLoading && !isMobile && <Loader />}
            </div>
          </div>
        </div>

        <MobileFilter
          showMobileFilter={showFilterPopup}
          toggleShowMobileFilter={toggleMobileFilter}
          categories={categories}
          source={source}
          onRadioChange={onRadioChange}
          onCheckBoxChange={onCheckBoxChange}
          onDateChange={onDateChange}
          startDate={startDate}
          endDate={endDate}
          clearDateFilter={clearDateFilter}
          resetAllFilters={resetAllFilters}
          selectedCategories={selectedCategories}
        />
      </section>
    </div>
  );
};

export default App;
