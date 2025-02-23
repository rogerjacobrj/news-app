import { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import Button from '../button';
import buttonStyles from '../button/styles.module.scss';
import FilterSection from '../filterSection';
import { Category } from '../../types';

interface MobileFilterProps {
  showMobileFilter?: boolean;
  toggleShowMobileFilter: () => void;
  categories: Category[];
  source: string;
  onRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckBoxChange: (value: string) => void;
  onDateChange: (entity: string, date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
  clearDateFilter: () => void;
  resetAllFilters: () => void;
  selectedCategories: string[];
}

const MobileFilter = (props: MobileFilterProps) => {
  const {
    showMobileFilter,
    toggleShowMobileFilter,
    categories,
    source,
    onRadioChange,
    onCheckBoxChange,
    onDateChange,
    resetAllFilters,
    startDate,
    endDate,
    clearDateFilter,
    selectedCategories,
  } = props;

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

  const toggleMobileMenuBar = (type: string | null = null) => {
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

      if (type === 'resetAllFilters') {
        resetAllFilters();
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
        <div className={styles.mobileFilterContent}>
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

        <div className={styles.buttonContainer}>
          <div className={styles.applyButtonContainer}>
            <Button
              customClass={buttonStyles.applyButton}
              label="Apply Filter"
              onClick={toggleMobileMenuBar}
            />
          </div>
          <div className={styles.bottomButtons}>
            <Button
              customClass={buttonStyles.closeButton}
              label="Close"
              onClick={toggleMobileMenuBar}
            />
            <Button
              customClass={buttonStyles.resetButton}
              label="Reset All"
              onClick={() => toggleMobileMenuBar('resetAllFilters')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilter;
