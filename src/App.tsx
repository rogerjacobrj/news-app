import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
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
import { sortOptions } from './constants';

const App = () => {
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);

  const toggleMobileFilter = () => {
    setShowFilterPopup(!showFilterPopup);
  };

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
              <ArticleCount count={13} />
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
                  <ArticleCount count={13} />
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                  <div className={styles.sortContainer}>
                    <SelectInput showLabel={true} label="Sort" options={sortOptions} />
                  </div>
                </div>
              </div>
              <div className={styles.cardContainer}>
                {Array.from({ length: 6 }, (_, index: number) => {
                  return <Card key={index} />;
                })}
              </div>
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
