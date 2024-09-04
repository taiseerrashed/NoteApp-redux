import { useDispatch } from "react-redux";
import { deleteNote, INote } from "../redux/notes/notesSlice";
import { AppDispatch } from "../redux/store";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface NoteCardProps {
    note: INote;
    onEdit: (note: INote) => void;
}

const NoteCard = ({note, onEdit}: NoteCardProps) => {
    const dispatch:AppDispatch = useDispatch();

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md relative">
        <div className="bg-white p-3">
            <h3 className="text-lg font-semibold break-words border-b border-gray-300">Title: {note.title}</h3>
            <p className="break-words"><b>Content:</b> {note.content}</p>
        </div>
        <div className="flex justify-between mt-3">
            <FiEdit onClick={() => onEdit(note)} className="text-blue-500 cursor-pointer absolute bottom-1 left-1"/>
            <FiTrash2 onClick={() => dispatch(deleteNote(note.id))} className="text-red-500 cursor-pointer absolute bottom-1 right-1"/>
        </div>
    </div>
  );
};

export default NoteCard;
