import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { updateUser } from "../../redux/slices/userlist";

const UpdateContacts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { id, firstName, lastName, status } = location.state;

  const [details, setDetails] = useState({
    id: id,
    firstName: firstName,
    lastName: lastName,
    status: status,
  });

  const handleSetDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateUser(details));

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
          <input
            type="text"
            name="firstName"
            onChange={handleSetDetails}
            value={details.firstName}
          />
        </div>
        <div className="flex flex-row m-5">
          <label className="m-2 text-xl">Last Name: </label>
          <input
            type="text"
            name="lastName"
            onChange={handleSetDetails}
            value={details.lastName}
          />
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
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default UpdateContacts;
