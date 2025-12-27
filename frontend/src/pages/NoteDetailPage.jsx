import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import toast, { LoaderIcon } from 'react-hot-toast';

import api from '../lib/axios';


const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);

      } catch (error) {
        console.log("Error buscando la nota!", error);
        toast.error("Fallo al buscar la nota!");

      } finally {
        setLoading(false);
      }

    };

    fetchNote();
  }, [id]);

  console.log({ note });

  // Funcion para eliminar la nota
  const handleDelete = async () => {
    if (!window.confirm("Seguro que quieres eliminar esta Nota?")) return;

    try {
      await api.delete(`/notes/${id}`); // Pedirle al Servidor por la nota con esa ID
      toast.success("Nota eliminada con exito!");
      navigate("/"); // Regresar al dashboard

    } catch (error) {
      console.log("Error al eliminar la nota", error);
      toast.error("Falla al eliminar la nota");
    }
  };

  // Funcion para salvar los cambios de la nota
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Porfavor agrega titulo o contenido");
      return;
    };

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success('Nota modificada con exito!');
      navigate("/");

    } catch (error) {
      console.log("Error al eliminar la nota", error);
      toast.error("Falla al eliminar la nota");

    } finally {
      setSaving(false);
    }


  };

  if(loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>);
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to={"/"} className='btn btn-ghost'> 
              <ArrowLeftIcon className='h-8 w-8' />
              Regresar a las notas
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-6 w-6' />
              Eliminar nota 
            </button>
          </div>

          <div className='card bg-base-100'>
            <div className="card-body">
              <h2 className='card-title text-2xl mb-4'>Modificar nota</h2>
              
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Titulo</span>
                </label>

                <input 
                  type='text'
                  placeholder='Titulo de la nota'
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}/>
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Contenido</span>
                </label>

                <textarea
                  placeholder='Escribe tu nota aqui'
                  className='textarea textarea-bordered h-32'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}/>
              </div>

              <div className='card-actions justify-end'>
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NoteDetailPage;


