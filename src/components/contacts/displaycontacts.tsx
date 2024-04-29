import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { deleteUser } from "../../redux/slices/userlist";

const DisplayContacts = () => {
  const list = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="mt-10 flex-grow flex flex-col items-center">
      <button
        onClick={() => {
          navigate("/adduser");
        }}
        className="bg-purple-400 text-slate-50 p-2 rounded-full"
      >
        Create Contact
      </button>

      {list.length > 0 ? (
        <div>
          {list.map((element) => {
            return (
              <div
                key={element.id.toString()}
                className="bg-gray-200 m-5 p-5 w-96"
              >
                <div className="flex-grow flex flex-col items-center">
                  <h3>{element.firstName}</h3>
                  <h3>{element.lastName}</h3>
                  <p>{element.status}</p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() =>
                      navigate("/updateuser", {
                        state: {
                          id: element.id,
                          firstName: element.firstName,
                          lastName: element.lastName,
                          status: element.status,
                        },
                      })
                    }
                    className="bg-emerald-400 text-slate-50 p-3 rounded-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteUser(element.id))}
                    className="bg-red-400 text-slate-50 p-2 rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          No contacts Found. Please add contact from create contact Button
        </div>
      )}
    </div>
  );
};

export default DisplayContacts;
