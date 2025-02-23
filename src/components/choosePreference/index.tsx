import styles from './styles.module.scss';
import { SortOption, sources } from '../../constants';
import { RadioInput, Checkbox } from '../../components';
import { Category } from '../../types';

interface ChoosePreferenceProps {
  source: string;
  categories: Category[];
  onRadioChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckBoxChange?: (value: string) => void;
  onDateChange?: (entity: string, date: Date) => void;
  selectedCategories: string[];
}

const ChoosePreference = (props: ChoosePreferenceProps) => {
  const { categories, source, onRadioChange, onCheckBoxChange, selectedCategories } = props;

  return (
    <div className={styles.filterSection}>
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
                  onChange={onRadioChange!}
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
                    value={item.id}
                    checked={selectedCategories?.includes(item.id)}
                    onChange={onCheckBoxChange!}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoosePreference;
