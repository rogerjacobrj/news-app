import styles from './styles.module.scss';
import { SortOption, sources } from '../../constants';
import { RadioInput, Checkbox, DateInput } from '../../components';
import { FilterSectionProps } from './types';
import { Category } from '../../types';

const FilterSection = (props: FilterSectionProps) => {
  const {
    categories,
    source,
    onRadioChange,
    onCheckBoxChange,
    onDateChange,
    startDate,
    endDate,
    clearDateFilter,
  } = props;

  return (
    <div className={styles.filterSection}>
      <div className={styles.header}>
        <h1>Filters</h1>
      </div>

      <p>Use the filters below to narrow your search by source, category, or date. </p>

      <div className={styles.content}>
        <div className={styles.filterSourceContent}>
          <p className={styles.filterTitle}>Source</p>
          <div className={styles.filterContent}>
            {sources?.map((item: SortOption) => {
              return (
                <RadioInput
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  source={source}
                  onChange={onRadioChange}
                />
              );
            })}
          </div>
        </div>

        {categories.length > 0 && (
          <div className={styles.filterContainer}>
            <p className={styles.filterTitle}>Category</p>
            <div className={styles.filterContent}>
              {categories?.map((item: Category) => {
                return (
                  <Checkbox
                    key={item.id}
                    label={item.name}
                    value={item.name}
                    onChange={onCheckBoxChange}
                  />
                );
              })}
            </div>
          </div>
        )}

        <div className={styles.filterDateContent}>
          <div className={styles.filterDateHeader}>
            <p className={styles.dateTitle}>Date</p>
            <p className={styles.clearDate} onClick={clearDateFilter}>
              Clear
            </p>
          </div>
          <div className={styles.filterDateSection}>
            <DateInput
              label="From"
              entity="startDate"
              value={startDate}
              onDateChange={onDateChange}
            />
            <DateInput label="To" entity="endDate" value={endDate} onDateChange={onDateChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
