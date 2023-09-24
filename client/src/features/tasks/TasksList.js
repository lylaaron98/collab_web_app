import { useGetTasksQuery } from "./tasksApiSlice";
import Task from "./Task";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";

const TasksList = () => {
  useTitle("ChoreMaster: Tasks List");

  const { username, isAdmin } = useAuth();

  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksQuery("tasksList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = tasks;

    let filteredIds;
    if (isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (taskId) => entities[taskId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((taskId) => <Task key={taskId} taskId={taskId} />);

    content = (
      <table className="table table--tasks">
        <thead className="table__thead">
          <tr className="tableRow">
            <th scope="col" className="table__th note__status">
              Status
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="tableBody">{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default TasksList;
