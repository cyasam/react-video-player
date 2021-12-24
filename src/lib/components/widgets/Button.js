import styles from './Button.module.css';
import classNames from 'classnames';

function Button({ className, onClick, children }) {
  return (
    <button className={classNames(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
