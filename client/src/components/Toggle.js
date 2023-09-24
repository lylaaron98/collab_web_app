import { useState } from "react";
import styles from "../styles/Toggle.module.css";

export default function Toggle({ label, toggled, onClick }) {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <label className={styles.label}>
      <input
        className={styles.input}
        type="checkbox"
        defaultChecked={isToggled}
        onClick={callback}
      />
      <span className={styles.span}></span>
      <strong className={styles.strong}>{label}</strong>
    </label>
  );
}
