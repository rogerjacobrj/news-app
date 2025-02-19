import { useState, useRef, useEffect, Fragment } from 'react';
import styles from './styles.module.scss';

const Header = () => {
  const [isOpen, setMenuState] = useState<boolean>(false);
  const hamburgerMenu = useRef<HTMLDivElement>(null);
  const mobileNavBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleMobileMenuBar = () => {
    hamburgerMenu.current?.classList.toggle(styles.openMenu);
    const hasOpenClass = mobileNavBar.current?.classList.contains(styles.openMobileMenu);

    if (!hasOpenClass) {
      setMenuState(true);
      mobileNavBar.current?.classList.add(styles.openMobileMenu);
      mobileNavBar.current?.classList.add(styles.isAnimating);
      mobileNavBar.current?.classList.add(styles.slideInLeft);
    } else {
      setMenuState(false);
      mobileNavBar.current?.classList.remove(styles.openMobileMenu);
      mobileNavBar.current?.classList.add(styles.isAnimating);
      mobileNavBar.current?.classList.add(styles.slideOutLeft);
    }
  };

  const removeAnimationClasses = () => {
    if (isOpen) {
      mobileNavBar.current?.classList.remove(styles.isAnimating);
      mobileNavBar.current?.classList.remove(styles.slideInLeft);
    } else {
      mobileNavBar.current?.classList.remove(styles.isAnimating);
      mobileNavBar.current?.classList.remove(styles.slideOutLeft);
    }
  };

  return (
    <Fragment>
      <header role="banner" className={[styles.navigation].join(' ')}>
        <nav
          className={`navbar navbar-expand-lg d-lg-none navbar-light ${styles.mobileNavBar}`}
          role="navigation"
          aria-label="Primary Navigation"
        >
          <div className="container-fluid d-lg-none">
            <div className={` navbar-brand ${styles.mobileNavbarBrand}`}>News App</div>
            <div
              ref={hamburgerMenu}
              className={`${styles.hamburgerMenu}`}
              onClick={toggleMobileMenuBar}
            >
              <span className={styles.hamburgerMenuItem}></span>
              <span className={styles.hamburgerMenuItem}></span>
              <span className={styles.hamburgerMenuItem}></span>
              <span className={styles.hamburgerMenuItem}></span>
            </div>
          </div>
        </nav>

        <div
          ref={mobileNavBar}
          className={styles.mobileNavbarMenu}
          onAnimationEnd={() => removeAnimationClasses()}
        >
          <div className={styles.mobileNavbarLinkContainer}>
            <ul className="navbar-nav"></ul>
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
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
