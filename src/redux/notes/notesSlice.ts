import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INote  {
    id: number;
    title: string;
    content: string;
}

type TInitialState = {
    isLoading: boolean;
    notes: INote[];
}

const initialState: TInitialState = {
    isLoading: false,
    notes: [{
        id: 1,
        title: "title1",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat modi, sequi voluptas illo aspernatur hic corrupti placeat, repellendus blanditiis quas, quaerat doloremque ab amet consequatur."
    }],
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        addNote: (state, action: PayloadAction<INote>) => {
            state.notes.push(action.payload)
        },
        editNote: (state, action: PayloadAction<INote>) => {
            const index = state.notes.findIndex((note) => note.id === action.payload.id)            
            if(index !== -1) {
                state.notes[index] = action.payload
            }
        },
        deleteNote: (state, action: PayloadAction<number>) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload)
        }
    }
});

export const {setLoading, addNote, editNote, deleteNote} = notesSlice.actions;
export default notesSlice.reducer;
