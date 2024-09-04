import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../redux/store";
import NoteForm from "../components/NoteForm";
import Spinner from "../components/Spinner";
import NoteCard from "../components/NoteCard";

const Home = () => {
    const notes = useSelector((state: RootState) => state.notes.notes);
    const isLoading = useSelector((state: RootState) => state.notes.isLoading);
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
    const [openForm, setOpenForm] = useState<boolean>(false);

    const selectedNote = notes.find((note) => note.id === selectedNoteId);

    const handleEdit = (id: number) => {
        setSelectedNoteId(id);
        setOpenForm(true);
    };

    const handleAdd = () => {
        setSelectedNoteId(null);
        setOpenForm(true);
    };

  return (
    <div className="mx-auto mt-10 p-4 w-[90%] md-[80%]">
        {!openForm && (
            <button onClick={handleAdd} className="bg-green-500 text-white rounded py-2 px-3 mb-2">Add Note</button>
        )}

        {openForm && (
            <div className="mb-3">
                <h2 className="font-semibold text-lg text-center mb-2">Add Note</h2>
                <NoteForm note={selectedNote} mode={selectedNote ? "edit" : "create"} onFormClose={() => setOpenForm(false)} />
            </div>
        )}

        {!openForm && !isLoading && (
            <div className="space-y-4">
                <h2 className="font-bold text-lg">Notes</h2>
                <div className="grid sm:grid-col-1 md:grid-col-2 lg:grid-cols-4 gap-4">
                    {notes.map((note) => (
                        <NoteCard key={note.id} note={note} onEdit={() => handleEdit(note.id)} />
                    ))}
                </div>
            </div>
        )}

        {isLoading && <Spinner />}
    </div>
  );
};

export default Home;
