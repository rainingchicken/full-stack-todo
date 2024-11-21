import { create } from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  notes: null,
  fetchNotes: async () => {
    //fetch the ntoes
    const res = await axios.get(
      "https://full-stack-todo-server.onrender.com/notes"
    );

    //set to state
    set({
      notes: res.data.notes,
    });
    // setNotes(res.data.notes);
    // // console.log(res);},
  },
  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
    // setCreateForm({
    //   ...createForm,
    //   [name]: value,
    // });
  },
}));

export default notesStore;
