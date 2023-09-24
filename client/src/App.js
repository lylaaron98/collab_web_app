import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import TasksList from "./features/tasks/TasksList";
import EditTask from "./features/tasks/EditTask";
import NewTask from "./features/tasks/NewTask";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import Chat from "./features/chat/Chat";
import Board from "./features/board/board";
import ExpenseTracker from "./features/ExpenseTracker/ExpenseTracker";
import Signup from "./features/auth/Signup";

function App() {
  useTitle("ChoreMaster");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route path="chat" element={<Chat />} />

                <Route path="users" element={<UsersList />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="users">
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="tasks">
                  <Route index element={<TasksList />} />
                  <Route path=":id" element={<EditTask />} />
                  <Route path="new" element={<NewTask />} />
                </Route>

                <Route path="kanbanBoard">
                  <Route index element={<Board />} />
                </Route>
                <Route path="ExpenseTracker">
                  <Route index element={<ExpenseTracker />} />
                </Route>
              </Route>
              {/* End Dash */}
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
