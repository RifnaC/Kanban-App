/* eslint-disable react/prop-types */

const Task = ({ text }) => {
  return (
    <div className="bg-white p-2 rounded shadow mb-2">
      {text}
    </div>
  );
};

export default Task;
