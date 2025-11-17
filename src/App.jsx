import { useSelector, useDispatch } from "react-redux";
import {
  addUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} from "./store/reducer/user-reducer";
import { useForm } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

function App() {
  const { count, userList } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { handleSubmit, reset, register, setValue } = useForm();
  const [editingId, setEditingId] = useState(null);

  const handler = (data) => {
    if (editingId) {
      dispatch(updateUser({ ...data, id: editingId }));
      setEditingId(null);
    } else {
      dispatch(addUser({ ...data, id: nanoid() }));
    }
    reset();
  };

  const handleEdit = (item) => {
    setValue("userName", item.userName);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllUsers());
  };

  const handleCancel = () => {
    reset();
    setEditingId(null);
  };

  return (
    <>
      <h1>{count}</h1>
      <form onSubmit={handleSubmit(handler)}>
        <input type="text" {...register("userName")} />
        <button type="submit">{editingId ? "Yangilash" : "send"}</button>
        {editingId && <button type="button" onClick={handleCancel}>Bekor qilish</button>}
      </form>

      {userList.map((item) => (
        <div key={item.id}>
          <h1>{item.userName}</h1>
          <button onClick={() => handleEdit(item)}>Tahrirlash</button>
          <button onClick={() => handleDelete(item.id)}>O'chirish</button>
        </div>
      ))}

      {userList.length > 0 && (
        <button onClick={handleDeleteAll}>Barcha O'chirish</button>
      )}
    </>
  );
}

export default App;