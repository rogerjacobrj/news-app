import styles from './styles.module.scss';
interface HeaderProps {
  onPreferenceClick: () => void;
}

const Header = (props: HeaderProps) => {
  const { onPreferenceClick } = props;

  return (
    <header role="banner" className={[styles.navigation].join(' ')}>
      <nav
        className={`navbar navbar-expand-lg d-lg-none navbar-light ${styles.mobileNavBar}`}
        role="navigation"
        aria-label="Primary Navigation"
      >
        <div className="container-fluid d-lg-none">
          <div className={` navbar-brand ${styles.mobileNavbarBrand}`}>News App</div>
          <div className={`${styles.preferenceSection}`} onClick={onPreferenceClick}>
            <div>Preferences</div>
          </div>
        </div>
      </nav>

      <div className={styles.mobileNavbarMenu}>
        <div className={styles.mobileNavbarLinkContainer}>
          <ul className="navbar-nav">
            <li>Preferences</li>
          </ul>
        </div>
      </div>

      {/* Desktop version */}
      <div className={styles.desktopNavBar}>
        <section className={`${styles.navigation} d-none d-lg-flex`}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className={styles.desktopNavigation}>
                  <div className={styles.navbarBrand}>News App</div>
                  <div className={styles.navItemContainer}>
                    <ul className={styles.navigationContent}>
                      <li className={styles.navigationListItem} onClick={onPreferenceClick}>
                        Preferences
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;
