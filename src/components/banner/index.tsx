import styles from './styles.module.scss';

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className={styles.title}>Latest News</h1>
            <p className={styles.subtitle}>
              Catch up with the most recent stories and headlines from around the world. Stay
              informed with the latest updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
