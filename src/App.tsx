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
  Modal,
  ChoosePreference,
} from './components';
import { sortOptions, API_URL } from './constants';
import useFetch from './hooks/useFetch';
import { Article, Category, SelectOption, ParamProps, PreferenceParamProps } from './types';
import { generateUrl, formatDateRange } from './helpers';
import Loader from './components/loader';
import { useInView } from 'react-intersection-observer';
import { SingleValue } from 'react-select';
import useDebounce from './hooks/useDebounce';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';
import {
  setPreferred,
  setGuardianCategories,
  setNeyyorkTimesCategories,
  resetPreferences,
} from './slice';

const App = () => {
  const dispatch = useDispatch();

  const preferenceState = useSelector((state: RootState) => state.userPreferences);
  const { defaultSource, preferredGuardianCategories, preferredNewyorkTimesCategories } =
    preferenceState;

  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [preferenceCategories, setPreferenceCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [preferenceParams, setPreferenceParams] = useState<PreferenceParamProps>({
    source: defaultSource,
    selectedCategories:
      defaultSource === 'guardian' ? preferredGuardianCategories : preferredNewyorkTimesCategories,
  });

  const [params, setParams] = useState<ParamProps>({
    source: defaultSource,
    page: 1,
    size: 10,
    sortBy: { label: 'Newest', value: 'newest' },
    query: '',
    startDate: null,
    endDate: null,
    dateRange: null,
    selectedCategories:
      preferenceParams.source === 'guardian'
        ? preferredGuardianCategories
        : preferredNewyorkTimesCategories,
  });

  const debouncedSearchQuery = useDebounce(params.query, 500);

  const { data: categoryData } = useFetch<Category[]>({
    url: `${API_URL}/categories?source=${params.source}`,
  });

  const { data: preferenceDategoryData } = useFetch<Category[]>({
    url: `${API_URL}/categories?source=${preferenceParams.source}`,
  });

  useEffect(() => {
    if (categoryData) {
      if (params.source === 'news_api') {
        setCategories([]);
      } else {
        setCategories(categoryData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryData]);

  useEffect(() => {
    if (preferenceDategoryData) {
      setPreferenceCategories(preferenceDategoryData);
      if (preferenceParams.source === 'guardian') {
        dispatch(setGuardianCategories(preferenceDategoryData));
      } else if (preferenceParams.source === 'newyork_times') {
        dispatch(setNeyyorkTimesCategories(preferenceDategoryData));
      } else {
        setPreferenceCategories([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferenceDategoryData]);

  const toggleMobileFilter = () => {
    setShowFilterPopup(!showFilterPopup);
  };

  useEffect(() => {
    if (debouncedSearchQuery || params.selectedCategories || params.source || params.dateRange) {
      setParams({ ...params, page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, params.selectedCategories, params.source, params.dateRange]);

  useEffect(() => {
    if (params.source) {
      setParams({
        ...params,
        query: '',
        startDate: null,
        endDate: null,
        dateRange: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.source]);

  const { data, isLoading } = useFetch<{ articles: Article[] }>({
    url: `${API_URL}/articles?${generateUrl(params.source, params.page, params.size, params.sortBy, debouncedSearchQuery, params.selectedCategories, params.dateRange)}`,
  });

  useEffect(() => {
    if (data?.articles) {
      const results = data?.articles;

      if (results && results?.length > 0) {
        if (params.page === 1) {
          setArticles(results);
        } else {
          setArticles((prevArticles) => [...prevArticles, ...results]);
        }
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

  const onPreferenceClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    const { source, selectedCategories } = preferenceParams;
    dispatch(setPreferred({ source, selectedCategories }));
    setParams({ ...params, source, selectedCategories });
    closeModal();
    alert('Preferences saved');
  };

  const onPreferenceSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreferenceParams({ ...preferenceParams, source: event?.target?.value });
  };

  const onPreferenceCategoryChange = (value: string) => {
    const categories: string[] = [...preferenceParams.selectedCategories];
    const index = categories.findIndex((item) => item === value);

    if (index === -1) {
      categories.push(value);
      setPreferenceParams({ ...preferenceParams, selectedCategories: categories });
    } else {
      const filteredCategories = categories.filter((item) => item !== value);
      setPreferenceParams({ ...preferenceParams, selectedCategories: filteredCategories });
    }
  };

  const onResetPreference = () => {
    dispatch(resetPreferences());
    setParams({ ...params, source: 'guardian', selectedCategories: [] });
    setPreferenceParams({ ...preferenceParams, source: 'guardian', selectedCategories: [] });
    closeModal();
  };

  return (
    <div className={styles.newsFeed}>
      <Header onPreferenceClick={onPreferenceClick} />
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

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        resetPreference={onResetPreference}
        title="Preferences"
      >
        <ChoosePreference
          categories={preferenceCategories}
          source={preferenceParams.source}
          onRadioChange={onPreferenceSourceChange}
          onCheckBoxChange={onPreferenceCategoryChange}
          selectedCategories={preferenceParams.selectedCategories}
        />
      </Modal>
    </div>
  );
};

export default App;
