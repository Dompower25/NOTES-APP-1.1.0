import React from 'react'
import st from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={st.loader}>
      <svg className={st.circular} viewBox="25 25 50 50">
        <circle
          className={st.path}
          cx="50"
          cy="50"
          r="20"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default Loader