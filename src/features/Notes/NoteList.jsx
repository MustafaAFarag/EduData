/* eslint-disable react/prop-types */
import { Paginator } from 'primereact/paginator';
import NoteItem from './NoteItem';

function NoteList({
  notes,
  onRatingChange,
  user,
  bestNoteId,
  totalRecords,
  first,
  rows,
  onPageChange,
  handleDeleteNote,
  isDeletingNoteId,
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteItem
            key={note.note_id}
            note={note}
            onRatingChange={onRatingChange}
            user={user}
            isBestNote={note.note_id === bestNoteId}
            handleDeleteNote={() => handleDeleteNote(note.note_id)}
            isDeleting={isDeletingNoteId === note.note_id}
          />
        ))}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        className="mt-6 p-2 text-xl"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        leftContent={
          <span className="font-bold">
            {Math.ceil(first / rows) + 1} of {Math.ceil(totalRecords / rows)}
          </span>
        }
      />
    </div>
  );
}

export default NoteList;
