import { store } from "../../app/store";
import { tasksApiSlice } from "../tasks/tasksApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    // getTasks
    store.dispatch(
      tasksApiSlice.util.prefetch("getTasks", "tasksList", { force: true })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
