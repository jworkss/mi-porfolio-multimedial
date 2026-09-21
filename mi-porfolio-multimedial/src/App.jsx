import { useState } from 'react';
import perfilData from './data/perfil.json';
import trabajosData from './data/trabajos.json';
import avatarImg from './assets/avatar.png';
import {
  ExternalLink,
  //Github,
  Mail,
  Briefcase,
  GraduationCap,
  Layers,
  X,
  Play
} from 'lucide-react';

export default function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');

  const categorias = ['Todos', ...new Set(trabajosData.map((item) => item.categoria))];

  const proyectosFiltrados = filtroCategoria === 'Todos'
    ? trabajosData
    : trabajosData.filter((item) => item.categoria === filtroCategoria);

  return (
    <div className="min-h-screen bg-[#EFECE6] text-[#121212] font-sans selection:bg-[#E6391A] selection:text-white">
      {/* Barra de navegación superior */}
      <nav className="sticky top-0 z-40 bg-[#EFECE6]/90 backdrop-blur-md border-b-2 border-[#121212]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => setSeccionActiva('inicio')}
            className="flex items-center gap-2 text-xl font-black uppercase tracking-tight"
          >
            <span className="w-4 h-4 bg-[#E6391A] inline-block"></span>
            {perfilData.apodo || perfilData.nombre}
          </button>
          
          <div className="flex gap-2 sm:gap-6 text-xs sm:text-sm font-bold uppercase tracking-wider overflow-x-auto py-2">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'sobre-mi', label: 'Sobre Mí' },
              { id: 'proyectos', label: 'Proyectos' },
              { id: 'proceso', label: 'Bitácora' },
              { id: 'cv', label: 'CV' },
              { id: 'contacto', label: 'Contacto' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSeccionActiva(item.id)}
                className={`pb-1 transition-all whitespace-nowrap ${
                  seccionActiva === item.id 
                    ? 'border-b-2 border-[#E6391A] text-[#E6391A]' 
                    : 'text-[#121212] hover:text-[#E6391A]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenido principal dinámico */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* SECCIÓN: INICIO / HOME */}
        {seccionActiva === 'inicio' && (
          <section className="flex flex-col-reverse md:flex-row items-center gap-12 py-8">
            <div className="flex-1 space-y-6">
              <span className="inline-block bg-[#121212] text-white text-xs uppercase px-3 py-1 font-mono tracking-widest">
                Portafolio Multimedial
              </span>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-none uppercase">
                {perfilData.nombre} <br />
                <span className="text-[#E6391A]">{perfilData.apellido}</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-neutral-700 max-w-xl leading-relaxed">
                {perfilData.bio}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => setSeccionActiva('proyectos')}
                  className="bg-[#E6391A] hover:bg-[#c93014] text-white px-6 py-3 font-bold uppercase text-sm tracking-wider border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#121212]"
                >
                  Explorar Trabajos
                </button>
                <button
                  onClick={() => setSeccionActiva('contacto')}
                  className="bg-[#EFECE6] hover:bg-white text-[#121212] px-6 py-3 font-bold uppercase text-sm tracking-wider border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#121212]"
                >
                  Contactar
                </button>
              </div>
            </div>

            <div className="w-64 sm:w-80 relative">
              <div className="absolute inset-0 bg-[#E6391A] translate-x-3 translate-y-3 border-2 border-[#121212]"></div>
              <div className="relative border-2 border-[#121212] bg-[#121212] overflow-hidden">
                <img 
                  src={avatarImg} 
                  alt={perfilData.nombre} 
                  className="w-full h-auto object-cover grayscale contrast-125"
                />
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN: SOBRE MÍ */}
        {seccionActiva === 'sobre-mi' && (
          <section className="space-y-8 animate-fadeIn">
            <h2 className="text-4xl font-black uppercase border-b-2 border-[#121212] pb-4">
              Acerca de mí
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4 text-lg">
                <p>
                  Soy <strong>{perfilData.nombre} {perfilData.apellido}</strong> (conocido como <em>{perfilData.apodo}</em>). Me especializo en combinar lenguaje visual analógico y gráfico con entornos digitales modernos.
                </p>
                <p className="text-neutral-700">
                  Mi enfoque de trabajo une la experimentación del diseño gráfico, el montaje audiovisual y el desarrollo frontend interactivo para generar interfaces que escapen a la monotonía visual actual.
                </p>
              </div>
              <div className="border-2 border-[#121212] p-6 bg-white shadow-[4px_4px_0px_0px_#121212]">
                <h3 className="font-black uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#E6391A]" /> Habilidades
                </h3>
                <ul className="space-y-2 font-mono text-sm">
                  {perfilData.habilidades.map((hab, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#E6391A]"></span>
                      {hab}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN: GALERÍA DE PROYECTOS */}
        {seccionActiva === 'proyectos' && (
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#121212] pb-4 gap-4">
              <h2 className="text-4xl font-black uppercase">Galería de Trabajos</h2>
              <div className="flex gap-2 flex-wrap font-mono text-xs">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFiltroCategoria(cat)}
                    className={`px-3 py-1.5 border border-[#121212] uppercase font-bold transition-all ${
                      filtroCategoria === cat 
                        ? 'bg-[#121212] text-white shadow-[2px_2px_0px_0px_#E6391A]' 
                        : 'bg-white hover:bg-neutral-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectosFiltrados.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setProyectoSeleccionado(item)}
                  className="group cursor-pointer border-2 border-[#121212] bg-white flex flex-col justify-between shadow-[4px_4px_0px_0px_#121212] hover:shadow-[6px_6px_0px_0px_#E6391A] transition-all"
                >
                  <div>
                    <div className="relative h-48 border-b-2 border-[#121212] overflow-hidden bg-neutral-200">
                      <img 
                        src={item.imagen} 
                        alt={item.nombre} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.video && (
                        <div className="absolute top-2 right-2 bg-[#E6391A] text-white p-1 rounded-none border border-[#121212]">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-[11px] font-mono uppercase bg-[#EFECE6] px-2 py-0.5 border border-[#121212] text-neutral-800">
                        {item.categoria}
                      </span>
                      <h3 className="text-xl font-black mt-2 leading-tight uppercase group-hover:text-[#E6391A] transition-colors">
                        {item.nombre}
                      </h3>
                      <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
                        {item.descripcion}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 flex flex-wrap gap-1">
                    {item.tecnologias.map((tec, i) => (
                      <span key={i} className="text-[10px] font-mono text-neutral-500 uppercase">
                        #{tec}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECCIÓN: REFLEXIONES / PROCESO DE APRENDIZAJE */}
        {seccionActiva === 'proceso' && (
          <section className="space-y-6">
            <h2 className="text-4xl font-black uppercase border-b-2 border-[#121212] pb-4">
              Bitácora & Proceso
            </h2>
            <div className="border-l-4 border-[#E6391A] pl-6 space-y-6">
              <article className="bg-white border-2 border-[#121212] p-6 shadow-[4px_4px_0px_0px_#121212]">
                <span className="text-xs font-mono text-[#E6391A] uppercase font-bold">Reflexión #01</span>
                <h3 className="text-xl font-black uppercase mt-1">Hibridación Gráfica y Código</h3>
                <p className="mt-2 text-neutral-700 leading-relaxed">
                  Entender el frontend como un lienzo editorial transformó mi metodología de trabajo. La interactividad de la web no tiene por qué obedecer a plantillas genéricas; el contraste tipográfico, las texturas de semitono y los estados dinámicos rescatan la fuerza del grabado tradicional en el navegador.
                </p>
              </article>

              <article className="bg-white border-2 border-[#121212] p-6 shadow-[4px_4px_0px_0px_#121212]">
                <span className="text-xs font-mono text-[#E6391A] uppercase font-bold">Reflexión #02</span>
                <h3 className="text-xl font-black uppercase mt-1">El Flujo Audiovisual Interactivo</h3>
                <p className="mt-2 text-neutral-700 leading-relaxed">
                  La integración de video y micro-animaciones no debe saturar la interfaz. Cada elemento cinético debe responder a una intención de navegación clara: retener la atención del usuario sin penalizar el rendimiento ni la fluidez del sitio.
                </p>
              </article>
            </div>
          </section>
        )}

        {/* SECCIÓN: CURRÍCULUM VITAE */}
        {seccionActiva === 'cv' && (
          <section className="space-y-8">
            <h2 className="text-4xl font-black uppercase border-b-2 border-[#121212] pb-4">
              Currículum Vitae
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Experiencia */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#E6391A]" /> Experiencia Laboral
                </h3>
                {perfilData.experienciaLaboral.map((exp, idx) => (
                  <div key={idx} className="border-2 border-[#121212] bg-white p-5 shadow-[4px_4px_0px_0px_#121212]">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold uppercase text-base">{exp.posicion}</h4>
                      <span className="font-mono text-xs text-[#E6391A] font-bold">
                        {exp.fechaInicio} - {exp.fechaFin}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-neutral-600">{exp.compania}</p>
                    <p className="text-sm mt-3 text-neutral-700">{exp.descripcion}</p>
                  </div>
                ))}
              </div>

              {/* Educación */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#E6391A]" /> Formación & Títulos
                </h3>
                <div className="border-2 border-[#121212] bg-white p-5 shadow-[4px_4px_0px_0px_#121212] space-y-4">
                  <div>
                    <h4 className="font-bold uppercase text-base">{perfilData.educacion}</h4>
                    <p className="text-sm text-neutral-600 mt-1">Formación Académica en Diseño y Medios</p>
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase font-bold text-[#E6391A] block mb-2">Títulos Obtenidos:</span>
                    <ul className="list-disc list-inside text-sm space-y-1 font-medium">
                      {perfilData.titulos.map((tit, i) => (
                        <li key={i}>{tit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN: CONTACTO */}
        {seccionActiva === 'contacto' && (
          <section className="max-w-2xl mx-auto space-y-6 text-center">
            <h2 className="text-4xl font-black uppercase">¿Hablamos de un proyecto?</h2>
            <p className="text-neutral-700 text-lg">
              Disponible para proyectos de dirección de arte, desarrollo interactivo y animación experimental.
            </p>
            
            <div className="border-2 border-[#121212] bg-white p-8 shadow-[6px_6px_0px_0px_#121212] space-y-6">
              <a 
                href={`mailto:${perfilData.correo}`}
                className="inline-flex items-center gap-3 text-lg font-mono font-bold bg-[#EFECE6] border-2 border-[#121212] px-6 py-3 hover:bg-[#E6391A] hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                {perfilData.correo}
              </a>
            </div>
          </section>
        )}
      </main>

      {/* MODAL DETALLE DE PROYECTO */}
      {proyectoSeleccionado && (
        <div className="fixed inset-0 z-50 bg-[#121212]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#EFECE6] border-4 border-[#121212] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_0px_#E6391A] p-6 space-y-6">
            <div className="flex justify-between items-start border-b-2 border-[#121212] pb-4">
              <div>
                <span className="text-xs font-mono uppercase bg-[#121212] text-white px-2 py-0.5">
                  {proyectoSeleccionado.categoria}
                </span>
                <h3 className="text-3xl font-black uppercase mt-1">
                  {proyectoSeleccionado.nombre}
                </h3>
              </div>
              <button 
                onClick={() => setProyectoSeleccionado(null)}
                className="p-1 hover:bg-[#E6391A] hover:text-white border-2 border-[#121212] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Visual: Video o Imagen */}
            {proyectoSeleccionado.video ? (
              <video 
                controls 
                className="w-full border-2 border-[#121212] bg-black max-h-80 object-cover"
                src={proyectoSeleccionado.video}
              />
            ) : (
              <img 
                src={proyectoSeleccionado.imagen} 
                alt={proyectoSeleccionado.nombre} 
                className="w-full border-2 border-[#121212] max-h-80 object-cover"
              />
            )}

            <p className="text-base text-neutral-800 leading-relaxed">
              {proyectoSeleccionado.descripcion}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-sm font-mono bg-white p-4 border-2 border-[#121212]">
              <div>
                <strong className="block text-[#E6391A] uppercase">Roles:</strong>
                <p>{proyectoSeleccionado.roles.join(', ')}</p>
              </div>
              <div>
                <strong className="block text-[#E6391A] uppercase">Tecnologías:</strong>
                <p>{proyectoSeleccionado.tecnologias.join(', ')}</p>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              {proyectoSeleccionado.url && (
                <a 
                  href={proyectoSeleccionado.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-[#E6391A] text-white px-4 py-2 font-bold uppercase text-xs border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212]"
                >
                  <ExternalLink className="w-4 h-4" /> Demo en vivo
                </a>
              )}
              {proyectoSeleccionado.github && (
                <a 
                  href={proyectoSeleccionado.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-white text-[#121212] px-4 py-2 font-bold uppercase text-xs border-2 border-[#121212] shadow-[3px_3px_0px_0px_#121212]"
                >
                  
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}