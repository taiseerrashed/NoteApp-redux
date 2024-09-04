import { useDispatch } from "react-redux";
import { addNote, editNote, INote, setLoading } from "../redux/notes/notesSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch } from "../redux/store";

const schema = z.object({
    title: z.string().min(1, {message: "Title is required"}),
    content: z.string().min(1, {message: "Content is required"} ),
});

type FormData = z.infer<typeof schema>;

interface NoteFormProps {
    note?: INote;
    mode: "create" | "edit";
    onFormClose: () => void;
}

const NoteForm = ({note, mode, onFormClose}: NoteFormProps) => {
    const dispatch:AppDispatch = useDispatch();

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>({
       resolver: zodResolver(schema),
       defaultValues: note || { title: "", content: "" },
    });

    const onSubmit: SubmitHandler <FormData>= (data) => {
        console.log(data);
        dispatch(setLoading(true));
        setTimeout(()=> {
            if(mode === "create") {
                const newNote = {
                    ...data,
                    id: Math.round(Math.random() * 100),
                };
                dispatch(addNote(newNote));
            } else if (mode === "edit" && note){
                dispatch(editNote ({...data, id: note.id}));
            }
            dispatch(setLoading(false));
            onFormClose();
        } , 1000)
        reset();
    }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 rounded-lg shadow-md space-y-4 mx-auto">
            <input {...register("title")} placeholder="Title" className="w-full p-2 border border-gray-300 rounded"/>
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            <textarea {...register("content")} placeholder="Content" className="w-full h-[150px] p-2 border border-gray-300 rounded"/>
            {errors.content && <p className="text-red-500">{errors.content.message}</p> }

            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{mode === "create" ? "Add Note" : "Update Note"}</button>
        </form>
    </div>
  );
};

export default NoteForm;
