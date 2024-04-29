import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addUser } from "../../redux/slices/userlist";
import { counter } from "../../redux/slices/counter";

const CreateContacts = () => {
  const count = useAppSelector((state) => state.idCounter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    status: "inactive",
  });

  const handleSetDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(counter());
    details.id = count;
    dispatch(addUser(details));

    navigate("/");
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center mt-20">
      <form
        onSubmit={handleFormSubmit}
        className="flex-grow flex flex-col items-center justify-center bg-gray-200 w-96 h-96 "
      >
        <div className="flex flex-row m-5">
          <label className="m-2 text-xl">First Name: </label>
          <input type="text" name="firstName" onChange={handleSetDetails} />
        </div>
        <div className="flex flex-row m-5">
          <label className="m-2 text-xl">Last Name: </label>
          <input type="text" name="lastName" onChange={handleSetDetails} />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row">
            <label className="m-2 text-xl">Active </label>
            <input
              type="radio"
              name="status"
              value="active"
              checked={details.status === "active"}
              onChange={handleSetDetails}
            />
          </div>
          <div className="flex flex-row">
            <label className="m-2 text-xl">Inactive </label>
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={details.status === "inactive"}
              onChange={handleSetDetails}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-purple-400 text-slate-50 p-3 rounded-full mt-5 text-xl"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default CreateContacts;
