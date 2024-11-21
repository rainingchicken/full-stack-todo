import { useEffect, useState } from "react";
import axios from "axios";

function NotesPage() {
  //state
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });

  //use effect
  useEffect(() => {
    fetchNotes();
  }, []);

  //functions
  const fetchNotes = async () => {
    //fetch the ntoes
    const res = await axios.get(
      "https://full-stack-todo-server.onrender.com/notes",
      {
        withCredentials: true,
      }
    );

    //set to state
    // set({
    //   notes: res.data.notes,
    // });
    setNotes(res.data.notes);
    // // console.log(res)
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const createNote = async (e) => {
    e.preventDefault();

    //create the note
    const res = await axios.post(
      "https://full-stack-todo-server.onrender.com/notes",
      createForm,
      {
        withCredentials: true,
      }
    );

    //update state
    setNotes([...notes, res.data.note]);
    // console.log(res);

    //clear form state
    setCreateForm({
      title: "",
      body: "",
    });
  };

  const deleteNote = async (_id) => {
    //delete the note
    const res = await axios.delete(
      `https://full-stack-todo-server.onrender.com/notes/${_id}`,
      {
        withCredentials: true,
      }
    );

    //update state
    const newNotes = [...notes].filter((note) => {
      return note._id !== _id;
    });
    setNotes(newNotes);
  };

  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (note) => {
    //set state on update form
    setUpdateForm({
      title: note.title,
      body: note.body,
      _id: note._id,
    });
  };

  const updateNote = async (e) => {
    e.preventDefault();
    const { title, body } = updateForm;
    //send update request
    const res = await axios.put(
      `https://full-stack-todo-server.onrender.com/notes/${updateForm._id}`,
      {
        title,
        body,
      },
      {
        withCredentials: true,
      }
    );

    //update state
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === updateForm._id;
    });
    newNotes[noteIndex] = res.data.note;
    setNotes(newNotes);

    //clear update form state
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    });
  };

  return (
    <>
      <div>
        <h2>Notes:</h2>
        {notes &&
          notes.map((note) => {
            return (
              <div key={note._id}>
                <h3>{note.title}</h3>
                <button onClick={() => deleteNote(note._id)}>
                  Delete Note
                </button>
                <button onClick={() => toggleUpdate(note)}>Update note</button>
              </div>
            );
          })}
      </div>
      {updateForm._id && (
        <div>
          <h2>Update note</h2>
          <form onSubmit={updateNote}>
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.title}
              name="title"
            />
            <textarea
              onChange={handleUpdateFieldChange}
              value={updateForm.body}
              name="body"
            />
            <button type="submit">Update Note</button>
          </form>
        </div>
      )}
      {!updateForm._id && (
        <div>
          <h2>Create note</h2>
          <form onSubmit={createNote}>
            <input
              onChange={updateCreateFormField}
              type="text"
              name="title"
              value={createForm.title}
            />
            <textarea
              onChange={updateCreateFormField}
              name="body"
              value={createForm.body}
            ></textarea>
            <button type="submit">Create note</button>
          </form>
        </div>
      )}
    </>
  );
}

export default NotesPage;
