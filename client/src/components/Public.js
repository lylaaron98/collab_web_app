import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Chore Master!</span>
        </h1>
        <Link to="/login">Login</Link>
      </header>
      <main className="public__main">
        <h1>Your Household, Organized</h1>
        <p>
          ChoreMaster is your all-in-one solution for managing tasks, chores,
          and expenses within your family or household. Say goodbye to conflicts
          and chaos, and embrace a more organized and harmonious home life.
        </p>
        <br />
        <h2>Features</h2>
        <h3>Calendar Scheduler:</h3>
        <p>
          Keep track of important dates, events, and deadlines effortlessly.
        </p>
        <br />
        <h3>Live Chat:</h3>
        <p>
          Stay connected with your family members through our real-time chat
          feature.
        </p>
        <br />
        <h3>Points Reward System:</h3>
        <p>
          Reward and motivate your household members with our credit system.
        </p>
        <br />
        <h3>Expense Graph:</h3>
        <p>Visualize your expenses and work towards your financial goals.</p>
        <br />
        <h3>Shopping List:</h3>
        <p>
          Collaboratively manage your shopping list and never forget a thing.
        </p>
        <br />
        <h3>Kanban Board:</h3>
        <p>Efficiently manage tasks with a drag-and-drop Kanban-style board.</p>
        <br />
        <h3>Notification System:</h3>
        <p>Receive timely alerts and reminders for tasks and events.</p>
        <br />
        <h3>Household Appliance Dashboard:</h3>
        <p>Monitor appliance usage and optimize your energy consumption.</p>
        <br />
        <br />
        <h1>Why Choose ChoreMaster</h1>
        <br />
        <h3>Family-Oriented:</h3>

        <p>
          Designed with families in mind, ChoreMaster ensures everyone stays on
          the same page.
        </p>
        <br />
        <h3> User-Friendly:</h3>

        <p>Our intuitive interface makes managing your household a breeze.</p>
        <br />
        <h3>Secure and Private:</h3>

        <p>
          Your data is safe with us. We prioritize your privacy and security.
        </p>
      </main>
      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
