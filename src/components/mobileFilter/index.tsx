import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import Button from '../button';
import buttonStyles from '../button/styles.module.scss';

interface MobileFilterProps {
  showMobileFilter?: boolean;
  toggleShowMobileFilter: () => void;
}

const MobileFilter = (props: MobileFilterProps) => {
  const { showMobileFilter, toggleShowMobileFilter } = props;

  const [isOpen, setMenuState] = useState<boolean>(false);
  const hamburgerMenu = useRef<HTMLDivElement>(null);
  const mobileFilterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleMobileMenuBar = () => {
    hamburgerMenu.current?.classList.toggle(styles.openMenu);
    const hasOpenClass = mobileFilterRef.current?.classList.contains(styles.openMobileMenu);

    if (!hasOpenClass) {
      setMenuState(true);
      mobileFilterRef.current?.classList.add(styles.openMobileMenu);
      mobileFilterRef.current?.classList.add(styles.isAnimating);
      mobileFilterRef.current?.classList.add(styles.slideInUp);
    } else {
      if (showMobileFilter) {
        toggleShowMobileFilter();
      }

      setMenuState(false);
      mobileFilterRef.current?.classList.remove(styles.openMobileMenu);
      mobileFilterRef.current?.classList.add(styles.isAnimating);
      mobileFilterRef.current?.classList.add(styles.slideOutDown);
    }
  };

  const removeAnimationClasses = () => {
    if (isOpen) {
      mobileFilterRef.current?.classList.remove(styles.isAnimating);
      mobileFilterRef.current?.classList.remove(styles.slideInUp);
    } else {
      mobileFilterRef.current?.classList.remove(styles.isAnimating);
      mobileFilterRef.current?.classList.remove(styles.slideOutDown);
    }
  };

  useEffect(() => {
    if (showMobileFilter) {
      toggleMobileMenuBar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMobileFilter]);

  return (
    <div className={styles.filterButtonSection}>
      <Button
        label="Filters"
        customClass={`d-block d-sm-none ${buttonStyles.filterButton}`}
        onClick={toggleMobileMenuBar}
      />

      <div
        ref={mobileFilterRef}
        className={styles.mobileFilter}
        onAnimationEnd={() => removeAnimationClasses()}
      >
        <div className={styles.mobileFilterContent}></div>

        <div className={styles.buttonContainer}>
          <Button
            customClass={buttonStyles.resetButton}
            label="Reset Filter"
            onClick={toggleMobileMenuBar}
          />
          <Button
            customClass={buttonStyles.applyButton}
            label="Apply Filter"
            onClick={toggleMobileMenuBar}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileFilter;
