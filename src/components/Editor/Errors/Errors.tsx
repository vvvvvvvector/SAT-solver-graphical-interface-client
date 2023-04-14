import { forwardRef, useRef, useCallback, useEffect } from 'react';

import { addError, removeError } from '../../../redux/slices/editor';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';

import {
  formulaDefinition,
  lineEndsWithZero,
  validClause,
} from '../../../utils/utils';

import debounce from 'lodash.debounce';

import styles from './Errors.module.scss';

const Errors = forwardRef<HTMLDivElement>((_, ref) => {
  const dispatch = useAppDispatch();

  const formulaDefinitionRow = useRef(0);
  const isFormulaDefined = useRef(false);

  const { dimacs, errors } = useAppSelector((state) => state.editor);

  const addNewError = (
    line: number,
    errorCode: 0 | 1 | 2 | 3 | 4,
    description: string,
    damaged: string
  ) => {
    dispatch(
      addError({
        line,
        errorCode,
        description,
        damaged,
      })
    );
  };

  const verify = useCallback(
    debounce((dimacs: string) => {
      const lines = dimacs.split('\n');

      lines.forEach((line, index) => {
        if (line.startsWith('c')) {
          dispatch(removeError({ line: index + 1, length: lines.length }));
          return;
        }

        if (line.match(/^p\scnf\s.*$/) && !isFormulaDefined.current) {
          isFormulaDefined.current = true;
          formulaDefinitionRow.current = index + 1;
        }

        if (line === '' && index !== lines.length - 1) {
          addNewError(index + 1, 0, 'empty line', line);
        } else if (!line.match(formulaDefinition) && line.startsWith('p')) {
          addNewError(index + 1, 1, 'invalid formula definition', line);
        } else if (
          !line.match(lineEndsWithZero) &&
          line !== '' &&
          !line.startsWith('p')
        ) {
          addNewError(index + 1, 2, 'clause must end with 0', line);
        } else if (
          !line.match(validClause) &&
          line !== '' &&
          !line.startsWith('p')
        ) {
          addNewError(index + 1, 3, 'invalid clause', line);
        } else if (
          line.match(/^p\s+cnf\s+.*$/) &&
          isFormulaDefined.current &&
          index + 1 !== formulaDefinitionRow.current
        ) {
          addNewError(
            index + 1,
            4,
            `formula was already defined in line ${formulaDefinitionRow.current}`,
            line
          );
        } else {
          dispatch(removeError({ line: index + 1, length: lines.length }));
        }
      });
    }, 50),
    []
  );

  useEffect(() => {
    formulaDefinitionRow.current = 0;
    isFormulaDefined.current = false;

    verify(dimacs);
  }, [dimacs]);

  return (
    <div ref={ref} className={styles.errors}>
      {errors.map((error, index) => (
        <div
          key={index}
          className={styles.error}
          style={{
            top: `${(error.line - 1) * 20 - index * 20}px`,
          }}
        >
          {`err: ${error.description}`}
        </div>
      ))}
      <div
        className={styles.error}
        style={{
          top: `1e6px`,
        }}
      >
        end of errors
      </div>
    </div>
  );
});

export default Errors;
