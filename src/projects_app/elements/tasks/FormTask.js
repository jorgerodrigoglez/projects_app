export const FormTask = () => {
  return (
    <form className="form__task">
      <input
        type="text"
        placeholder="Tarea"
        className="form__task--input"
        name="task"
      />
      <div className="form__task--btn">
        <button>Añadir...</button>
      </div>
    </form>
  );
};
