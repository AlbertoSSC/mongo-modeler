import React from 'react';
import classes from './table-pk-picker.component.module.css';
import { FieldTree } from './components/field-tree.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { PkOptionVm } from './table-pk-picker.model';
import { GUID } from '@/core/model';
import { SELECT_AN_PK_OPTION } from './table-pk-picker.const';

interface Props {
  name: string;
  options: PkOptionVm[];
  label?: string;
  selectedKeyFieldId?: GUID;
  selectTitle?: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

export const TablePkPicker: React.FC<Props> = props => {
  const {
    name,
    label,
    options,
    selectTitle,
    selectedKeyFieldId,
    error,
    touched,
    disabled,
  } = props;

  const [selectedPath, setSelectedPath] = React.useState('');
  const [optionsListVisible, setOptionsListVisible] = React.useState(false);
  const [currentSelectedKeyFieldId, setCurrentSelectedKeyFieldId] =
    React.useState(selectedKeyFieldId);

  const handleOptionClick = (option: PkOptionVm, parentPath: string) => {
    setCurrentSelectedKeyFieldId(option.id);
    const currentPath = parentPath
      ? `${parentPath} > ${option.label}`
      : option.label;
    setSelectedPath(currentPath);
    setOptionsListVisible(false);
  };

  return (
    <>
      <div className={classes.select}>
        <p className={classes.selectLabel}>{label ? label : ''}</p>
        <div className={classes.selectContainer}>
          <div
            className={`${classes.selectSelect} ${
              error && touched && !disabled && classes.selectError
            } ${disabled && classes.selectDisabled}`}
          >
            <div
              className={classes.selectChosen}
              onClick={() => setOptionsListVisible(!optionsListVisible)}
            >
              <p className={classes.selectText}>
                {selectedPath || selectTitle || SELECT_AN_PK_OPTION}
              </p>
              <ExpandDown />
            </div>
            {disabled || (
              <FieldTree
                name={name}
                options={options}
                optionsListVisible={optionsListVisible}
                handleOptionClick={handleOptionClick}
                selectedPKField={currentSelectedKeyFieldId}
              />
            )}
          </div>
          {error && touched && !disabled && (
            <span className={classes.error}>{error}</span>
          )}
        </div>
      </div>
      {optionsListVisible && (
        <div
          className={classes.veil}
          onClick={() => setOptionsListVisible(!optionsListVisible)}
        ></div>
      )}
    </>
  );
};
