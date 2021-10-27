import React, { useEffect, useState } from "react";
// helper formateo de moneda
import formatCurrency from "../../../../helpers/covert";

const TotalBudgets = ({ tasks, index }) => {
  // state para mostrar el resultado de suma de los presupuestos de cada tarea del proyecto
  const [totalBudget, setTotalBudget] = useState(0);
  //console.log(totalBudget);
  // useEffect para sumar los diferentes presupuestos de un proyecto
  useEffect(() => {
    let totalBudget = 0;
    tasks.forEach(num => {
      totalBudget += Number(num.budget);
    });
    //console.log(totalBudget);
    // cambia el estado del acomulador
    setTotalBudget(totalBudget);
  }, [tasks]);
  
  //console.log(index);

  return (
    <div className="budget__bar">
      {(index + 1) === 1 ? (
        <p className="budget__bar__text">
          Total: <span>{formatCurrency(totalBudget)}</span>
        </p>
      ) : null}
    </div>
  );
};

export default TotalBudgets;
