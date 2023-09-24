import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import CalendarWidget from "../../components/CalenderWidget";

const Welcome = () => {
  const { username, isAdmin } = useAuth();

  useTitle(`ChoreMaster: ${username}`);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {username}!</h1>
      <p>
        <Link to="/dash/tasks">View Tasks</Link>
      </p>

      <p>
        <Link to="/dash/kanbanBoard">View Tasks Kanban Board</Link>
      </p>
      <p>
        <Link to="/dash/ExpenseTracker">Expense Tracker</Link>
      </p>

      <p>
        <Link to="/dash/tasks/new">Add New Task</Link>
      </p>

      <p>
        <Link to="/dash/users">View Users</Link>
      </p>

      {isAdmin && (
        <p>
          <Link to="/dash/users/new">Add New User</Link>
        </p>
      )}

      <CalendarWidget />
    </section>
  );

  return content;
};
export default Welcome;
