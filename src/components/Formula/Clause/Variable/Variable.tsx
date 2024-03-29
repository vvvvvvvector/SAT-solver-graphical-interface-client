import styles from './Variable.module.scss';

interface VariableProps {
  index: number;
}

const Variable = ({ index }: VariableProps) => {
  return (
    <div className={styles.variable}>
      {index > 0 ? <span>x</span> : <span>&#172;x</span>}
      <sub>{index > 0 ? index : index * -1}</sub>
    </div>
  );
};

export default Variable;
