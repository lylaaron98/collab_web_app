import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";
import useAuth from "../../hooks/useAuth";

const User = ({ userId }) => {
  const { username, isAdmin } = useAuth();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  function orderAndConcatWords(word1, word2) {
    // Convert both words to lowercase for case-insensitive comparison
    const lowercaseWord1 = word1.toLowerCase();
    const lowercaseWord2 = word2.toLowerCase();

    // Compare and order the words alphabetically
    const orderedWords = [lowercaseWord1, lowercaseWord2].sort();

    // Join the ordered words with an underscore and return the result
    return `${orderedWords[0]}_${orderedWords[1]}`;
  }

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const handleChat = () =>
      navigate(`/dash/chat`, {
        state: {
          username: username,
          room: orderAndConcatWords(username, user?.username),
        },
      });

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="tableRow table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          {isAdmin && (
            <button className="icon-button table__button" onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          )}

          {user.username != username && (
            <button className="icon-button table__button" onClick={handleChat}>
              <FontAwesomeIcon icon={faCommentAlt} />
            </button>
          )}
        </td>
      </tr>
    );
  } else return null;
};

const memoizedUser = memo(User);

export default memoizedUser;
