import axios from 'axios';
import toast from 'react-hot-toast';

import { ArrowLeftIcon, Skull } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import api from '../lib/axios';

const CreatePage = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Todos los campos son requeridos!");
      return;
    }

    setLoading(true)
    try {
      await api.post("/notes", {
        title,
        content
      });

      toast.success("Nota creada con exito!");
      navigate("/");

    } catch (error) {
      console.log("Error creando la nota",  error);
      toast.error("Fallo al crear la nota!");

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>

          <Link to={"/"} className='btn btn-ghost mb-6'> 
            <ArrowLeftIcon className='size-5' />
            Regresar a las notas
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Crear nueva Nota</h2>

              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Titulo</span>
                  </label>
                  
                  <input type='text' 
                    placeholder='Titulo de la Nota'
                    className='input input-bordered'
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Contenido</span>
                  </label>
                  
                  <textarea
                    placeholder='Escribe tu nota aqui...'
                    className='textarea textarea-bordered h-32'
                    value = {content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? "Creando..." : "Crear nota"}
                  </button>
                </div>
              </form>

            </div>

          </div>

        </div>
      </div>  
    </div>
  )
}

export default CreatePage;