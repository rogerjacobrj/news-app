import styles from './styles.module.scss';
import { SortOption, sources } from '../../constants';
import { RadioInput, Checkbox, DateInput } from '../../components';
import { FilterSectionProps } from './types';
import { Category } from '../../types';

const FilterSection = (props: FilterSectionProps) => {
  const { categories } = props;

  return (
    <div className={styles.filterSection}>
      <div className={styles.header}>
        <h1>Filters</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.filterContent}>
          <h5>Source</h5>
          {sources?.map((item: SortOption) => {
            return (
              <RadioInput key={item.label} name="source" label={item.label} value={item.value} />
            );
          })}
        </div>

        {categories.length > 0 && (
          <div className={styles.filterContent}>
            <h5>Category</h5>
            {categories?.map((item: Category) => {
              return <Checkbox key={item.id} label={item.name} value={item.name} />;
            })}
          </div>
        )}

        <div className={styles.filterContent}>
          <h5>Date</h5>
          <DateInput />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
