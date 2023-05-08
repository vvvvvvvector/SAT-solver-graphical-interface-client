import { forwardRef, useRef, useCallback, useEffect } from 'react';

import { addError, removeError } from '../../../redux/slices/editor';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';

import {
  formulaDefinition,
  lineEndsWithZero,
  validClause,
} from '../../../utils/utils';

import debounce from 'lodash.debounce';

import Error from './Error/Error';

import styles from './Errors.module.scss';

const Errors = forwardRef<HTMLDivElement>((_, ref) => {
  const dispatch = useAppDispatch();

  const formulaDefinitionRow = useRef(0);
  const variablesRange = useRef(-1);
  const isFormulaDefined = useRef(false);

  const { dimacs, errors } = useAppSelector((state) => state.editor);

  const addEmplyLineError = (line: number, damaged: string) => {
    dispatch(
      addError({
        line,
        errorCode: 0,
        description: 'no empty lines allowed',
        damaged,
      })
    );
  };

  const addInvalidFormulaDefinitionError = (line: number, damaged: string) => {
    dispatch(
      addError({
        line,
        errorCode: 1,
        description: 'invalid formula definition',
        damaged,
      })
    );
  };

  const addThereAreNoZeroError = (line: number, damaged: string) => {
    dispatch(
      addError({
        line,
        errorCode: 2,
        description: 'clause must end with 0',
        damaged,
      })
    );
  };

  const addInvalidClauseError = (line: number, damaged: string) => {
    dispatch(
      addError({
        line,
        errorCode: 3,
        description: 'invalid clause',
        damaged,
      })
    );
  };

  const addFormulaAlreadyDefinedError = (line: number, damaged: string) => {
    dispatch(
      addError({
        line,
        errorCode: 4,
        description: `formula was already defined in line ${formulaDefinitionRow.current}`,
        damaged,
      })
    );
  };

  const addVariableNotInDefinedRangeError = (
    line: number,
    damaged: string,
    variable: number
  ) => {
    dispatch(
      addError({
        line,
        errorCode: 5,
        description: `Wrong variable value: ${variable} => range[1..${variablesRange.current}]`,
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

        const lineVariablesArray: number[] = line
          .split(' ')
          .filter((item) => item !== '')
          .map((item) => +item);

        if (line.match(/^p\scnf\s.*$/) && !isFormulaDefined.current) {
          isFormulaDefined.current = true;
          variablesRange.current = lineVariablesArray[2]; // definition line -> undefined undefined variablesRange clausesNumber
          formulaDefinitionRow.current = index + 1;
        }

        if (variablesRange.current > 0) {
          for (let variable of lineVariablesArray) {
            const variableAbs = Math.abs(variable);
            if (
              variableAbs > variablesRange.current &&
              !line.match(/^p\scnf\s.*$/)
            ) {
              addVariableNotInDefinedRangeError(index + 1, line, variableAbs);
              return; // will not check the rest of the line for this error type, only the first one
            }
          }
        }

        if (line === '' && index !== lines.length - 1) {
          addEmplyLineError(index + 1, line);
        } else if (!line.match(formulaDefinition) && line.startsWith('p')) {
          addInvalidFormulaDefinitionError(index + 1, line);
        } else if (
          !line.match(lineEndsWithZero) &&
          line !== '' &&
          !line.startsWith('p')
        ) {
          addThereAreNoZeroError(index + 1, line);
        } else if (
          !line.match(validClause) &&
          line !== '' &&
          !line.startsWith('p')
        ) {
          addInvalidClauseError(index + 1, line);
        } else if (
          line.match(/^p\s+cnf\s+.*$/) &&
          isFormulaDefined.current &&
          index + 1 !== formulaDefinitionRow.current
        ) {
          addFormulaAlreadyDefinedError(index + 1, line);
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
        <Error key={error.line} error={error} index={index} />
      ))}
      <div
        style={{
          height: '20px',
          position: 'relative',
          top: `1e6px`,
        }}
      >
        <span></span>
      </div>
    </div>
  );
});

export default Errors;
