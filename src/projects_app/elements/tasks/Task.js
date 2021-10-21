// momment - npm install momment --save
import moment from "moment";

const Task = ({ date, task }) => {
  // moment
  const taskDate = moment(date);

  return (
    <div className="task">
      <div className="task__dates">
        <p className="task__dates--date">{taskDate.format("LLLL")}</p>
        <p className="task__dates--name">{task}</p>
      </div>
    </div>
  );
};

export default Task;
