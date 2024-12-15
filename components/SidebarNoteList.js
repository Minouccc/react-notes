import SidebarNoteFilterList from '@/components/SidebarNoteListFilter';
import { getAllNotes } from '@/lib/redis';
import { sleep } from '@/lib/utils';
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader';

export default async function NoteList() {

  await sleep(500)
  const notes = await getAllNotes()

  if (Object.entries(notes).length == 0) {
    return <div className="notes-empty">
      {'No notes created yet!'}
    </div>
  }

  return (
    <SidebarNoteFilterList notes = {
      Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note)
        return {
          noteId,
          note: noteData,
          header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />
        }
      })
    } />
  )
}