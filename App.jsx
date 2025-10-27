import React, { useEffect, useMemo, useState } from "react";

/**********************
 * Servident MVM Dental Group
 * Landing page en una sola vista (React + Tailwind)
 * - Secciones: Hero, Servicios, Equipo, Reserva, Testimonios, FAQ, Contacto, Footer
 * - CTA a WhatsApp y formulario de reserva (demo)
 * - Textos en español (Perú) y placeholders para datos legales/operativos
 **********************/

// Utilidades
const cx = (...classes) => classes.filter(Boolean).join(" ");
const formatPhone = (tel) => tel.replace(/\s+/g, "");

// Iconos simples (SVG)
const IconTooth = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6" {...props}>
    <path fill="currentColor" d="M12 2c-4.2 0-7 3.4-7 7.2 0 2.5.9 3.9 2 6.1C8.1 18 9 21 10.8 21c1.3 0 1.8-1 2.3-2 .5 1 1 2 2.3 2C17 21 17.9 18 19 15.3c1-2.3 2-3.7 2-6.1C21 5.4 18.2 2 14 2c-.8 0-1.6.2-2 .5-.4-.3-1.2-.5-2-.5Z"/>
  </svg>
);
const IconWhats = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" {...props}>
    <path fill="currentColor" d="M12 2a10 10 0 0 0-8.94 14.59L2 22l5.56-1.02A10 10 0 1 0 12 2Zm5.21 14.37c-.22.62-1.28 1.18-1.77 1.22-.45.04-1.01.06-1.62-.1a9.48 9.48 0 0 1-4.23-2.35 7.63 7.63 0 0 1-1.82-2.78c-.18-.5-.2-.93-.02-1.28.2-.39.7-.64 1.1-.64.27 0 .52.02.74.02.22 0 .5-.08.77.59.28.7.95 2.43 1.03 2.6.08.17.12.38.02.6-.1.22-.15.35-.3.54-.15.2-.32.44-.45.59-.15.15-.3.33-.12.63.18.3.8 1.31 1.73 2.12 1.2 1.02 2.2 1.33 2.5 1.48.3.15.48.12.65-.07.17-.2.75-.87.95-1.18.2-.31.4-.26.67-.15.27.12 1.7.8 1.99.95.29.15.49.22.56.34.07.12.07.68-.15 1.3Z"/>
  </svg>
);
const IconMap = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" {...props}>
    <path fill="currentColor" d="M9.5 4.2 3 6.6v13.3l6.5-2.4 5 2.4L21 17.6V4.3l-6.5 2.4-5-2.5ZM9.5 17l-5 1.8V7.6l5-1.8V17Zm2-9.4 5 2.5v9.4l-5-2.4V7.6Zm-1-1.2Z"/>
  </svg>
);
const IconClock = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" {...props}>
    <path fill="currentColor" d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm1 5h-2v6l5 3 .9-1.45L13 12.7V7Z"/>
  </svg>
);
const IconPhone = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" {...props}>
    <path fill="currentColor" d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.1-.2 1.2.6 2.6 1 4 1 .6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.4 22 2 13.6 2 3c0-.6.4-1 1-1h3c.6 0 1 .4 1 1 0 1.4.4 2.8 1 4 .2.4.1.8-.2 1.1L6.6 10.8Z"/>
  </svg>
);

// Datos
const PHONE = "+51 941 904 372"; // Reemplazar por el teléfono real
const WHATS = "https://wa.me/51941904372?text=Hola%20Servident%2C%20quisiera%20agendar%20una%20cita"; // Reemplazar

const SERVICES = [
  { id: "restauraciones", name: "Restauraciones", desc: "Resinas compuestas estéticas para caries y fracturas.", img: "/img/servicios/restauraciones.webp" },
  { id: "exodoncia", name: "Exodoncia", desc: "Extracciones simples y complejas con control del dolor.", img: "/img/servicios/exodoncia.webp" },
  { id: "endodoncia", name: "Endodoncia", desc: "Tratamiento de conductos con sistema rotatorio y obturación térmica.", img: "/img/servicios/endodoncia.webp" },
  { id: "protesis-fija", name: "Prótesis fija", desc: "Coronas y puentes cementados para reponer piezas perdidas.", img: "/img/servicios/protesis-fija.webp" },
  { id: "protesis-removible", name: "Prótesis removible", desc: "Parciales acrílicas oflexibles según tu caso clínico.", img: "/img/servicios/protesis-removible.webp" },
  { id: "protesis-totales", name: "Prótesis totales", desc: "Rehabilitación completa superior e inferior.", img: "/img/servicios/protesis-totales.webp" },
  { id: "implantes", name: "Implantes", desc: "Colocación y rehabilitación implantosoportada.", img: "/img/servicios/implantes.webp" },
  { id: "terceras-molares", name: "Cirugías de 3ras molares", desc: "Exodoncia quirúrgica de cordales retenidas o impactadas.", img: "/img/servicios/terceras-molares.webp" },
  { id: "ortodoncia", name: "Ortodoncia", desc: "Brackets metálicos/estéticos o alineadores transparentes.", img: "/img/servicios/ortodoncia.webp" },
  { id: "corona-metal-porcelana", name: "Coronas metal porcelana", desc: "Resistencia y estética balanceada para posteriores.", img: "/img/servicios/coronas-metal-porcelana.webp" },
  { id: "corona-libre-metal", name: "Coronas libre de metal", desc: "Cerámica pura para mayor estética (disilicato, etc.).", img: "/img/servicios/coronas-libre-metal.webp" },
  { id: "corona-zirconio", name: "Coronas de zirconio", desc: "Alta resistencia y estética de última generación.", img: "/img/servicios/coronas-zirconio.webp" },
  { id: "limpieza", name: "Limpieza dental", desc: "Profilaxis con ultrasonido, pulido y recomendaciones de higiene.", img: "/img/servicios/limpieza.webp" },
];

const TEAM = [
  {
    id: "milton",
    name: "Dr. Milton Valencia",
    role: "Director Clínico • Rehabilitación Oral e Implantología",
    bio: "Cirujano dentista colegiado y habilitado. Enfoque integral en implantes, estética y oclusión.",
    photo: "/img/equipo/milton.jpg",
  },
  {
    id: "jazmin",
    name: "Dra. Jazmín Valencia",
    role: "Co-Directora • Ortodoncia y Odontopediatría",
    bio: "Tratamientos de ortodoncia moderna y atención cálida para niños y adolescentes.",
    photo: "/img/equipo/jazmin.jpg",
  },
];

const FAQS = [
  { q: "¿Atienden con seguro o convenios?", a: "Trabajamos con reembolsos y convenios corporativos. Consúltanos por WhatsApp para validar tu cobertura." },
  { q: "¿Tienen radiografías en sitio?", a: "Contamos con aliados diagnósticos cercanos para radiografías periapicales y panorámicas." },
  { q: "¿Formas de pago?", a: "Aceptamos efectivo, tarjetas y transferencias. Emitimos boletas y facturas electrónicas." },
  { q: "¿Atención en emergencias?", a: "Sí, atención prioritaria en dolor, fracturas y abscesos. Escríbenos por WhatsApp." },
];

function Header({ onClickCTA }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="/img/logo/servident-logo.jpg" alt="Servident MVM Dental Group" className="h-9 w-auto object-contain"/>
          <div className="leading-tight">
            <p className="text-base font-extrabold tracking-tight">Servident MVM Dental Group</p>
            <p className="text-xs text-gray-600">Odontología integral en Cajamarca</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#servicios" className="text-sm text-gray-700 hover:text-gray-900">Servicios</a>
          <a href="#equipo" className="text-sm text-gray-700 hover:text-gray-900">Equipo</a>
          <a href="#reserva" className="text-sm text-gray-700 hover:text-gray-900">Reserva</a>
          <a href="#contacto" className="text-sm text-gray-700 hover:text-gray-900">Contacto</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href={WHATS} target="_blank" rel="noreferrer" className="hidden rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 md:inline-flex">
            <IconWhats className="mr-2"/> WhatsApp
          </a>
          <button onClick={onClickCTA} className="rounded-xl bg-[#37C7C9] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#2aa8aa]">
            Reservar cita
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onClickCTA }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Tu sonrisa, en manos expertas
          </h1>
          <p className="mt-4 max-w-prose text-gray-600">
            Atención odontológica integral con tecnología moderna y un trato cercano. Agenda tu evaluación con nuestro equipo liderado por el <strong>Dr. Milton Valencia</strong> y la <strong>Dra. Jazmín Valencia</strong>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onClickCTA} className="inline-flex items-center justify-center rounded-2xl bg-[#37C7C9] px-5 py-3 text-sm font-semibold text-white shadow hover:bg-[#2aa8aa]">Reservar evaluación</button>
            <a href="#servicios" className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50">Ver servicios</a>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-700 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-3">+10 especialidades</div>
            <div className="rounded-xl border border-gray-200 bg-white p-3">Radiodiagnóstico aliado</div>
            <div className="rounded-xl border border-gray-200 bg-white p-3">Atención niños y adultos</div>
          </div>
        </div>
        <div className="relative">
          <img alt="Paciente sonriendo" className="mx-auto w-full max-w-lg rounded-3xl shadow-2xl" src="img/servicios/banner.jpg" decoding="async" fetchpriority="high" width="1200" height="800"/>
          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white/90 p-4 shadow-xl ring-1 ring-black/5">
            <p className="text-sm font-semibold">Evaluación + Plan de tratamiento</p>
            <p className="text-xs text-gray-600">Consulta inicial con presupuesto y opciones de financiamiento.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Servicios</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">Tratamientos preventivos y restauradores con enfoque en estética y función.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.id} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
              <img src={s.img} alt={s.name} className="h-44 w-full object-cover" loading="lazy" decoding="async"/>
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900">{s.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
                <button className="mt-3 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50">Saber más</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="equipo" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Nuestro equipo</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">Dirección médica a cargo del Dr. Milton Valencia y la Dra. Jazmín Valencia.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TEAM.map((m) => (
            <div key={m.id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:flex-row">
              <img src={m.photo} alt={m.name} className="h-56 w-full object-cover sm:h-auto sm:w-52" loading="lazy" decoding="async"/>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">{m.name}</h3>
                <p className="text-sm text-teal-700">{m.role}</p>
                <p className="mt-2 text-sm text-gray-600">{m.bio}</p>
                <ul className="mt-3 space-y-1 text-xs text-gray-500">
                  <li>Habilitación: vigente</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const [form, setForm] = useState({ nombre: "", telefono: "", servicio: "Evaluación", fecha: "", mensaje: "" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hola Servident, quiero reservar:\nNombre: ${form.nombre}\nTeléfono: ${form.telefono}\nServicio: ${form.servicio}\nFecha preferida: ${form.fecha}\nMensaje: ${form.mensaje}`
    );
    window.open(`https://wa.me/51941904372?text=${text}`, "_blank"); // Reemplazar número
  };

  return (
    <section id="reserva" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Reserva tu cita</h2>
            <p className="mt-2 text-sm text-gray-600">Completa el formulario y te confirmamos por WhatsApp.</p>
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">Nombre y apellido</label>
                <input required name="nombre" value={form.nombre} onChange={onChange} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#37C7C9]"/>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Teléfono</label>
                <input required name="telefono" value={form.telefono} onChange={onChange} pattern="[0-9 +()-]{6,}" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#37C7C9]"/>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Servicio</label>
                <select name="servicio" value={form.servicio} onChange={onChange} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#37C7C9]">
                  {SERVICES.map((s)=> <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Fecha preferida</label>
                  <input type="date" name="fecha" value={form.fecha} onChange={onChange} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#37C7C9]"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Horario</label>
                  <select name="horario" onChange={onChange} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#37C7C9]">
                    <option>Mañana (9:00 - 13:00)</option>
                    <option>Tarde (15:00 - 18:00)</option>
                    <option>Noche (18:00 - 20:00)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Mensaje (opcional)</label>
                <textarea name="mensaje" value={form.mensaje} onChange={onChange} rows={3} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#37C7C9]"/>
              </div>
              <div className="flex gap-2">
                <button className="rounded-2xl bg-[#37C7C9] px-5 py-3 text-sm font-semibold text-white shadow hover:bg-[#2aa8aa]">Enviar a WhatsApp</button>
                <a href={WHATS} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                  <IconWhats/> Chatear ahora
                </a>
              </div>
              <p className="text-[11px] leading-4 text-gray-500">* Al enviar este formulario autorizas el tratamiento de tus datos personales conforme a la Ley N° 29733 y el D.S. 003-2013-JUS (Perú).</p>
            </form>
          </div>
          <div className="rounded-3xl border border-teal-200 bg-teal-50 p-6">
            <div className="flex items-center gap-2 text-teal-700">
              <IconClock/> <p className="font-semibold">Horarios</p>
            </div>
            <ul className="mt-2 text-sm text-gray-800">
              <li>Lunes a Viernes: 9:00 – 20:00</li>
              <li>Sábado: 9:00 – 14:00</li>
              <li>Domingo: Emergencias</li>
            </ul>
            <div className="mt-6 flex items-center gap-2 text-teal-700">
              <IconMap/> <p className="font-semibold">Dirección</p>
            </div>
            <p className="mt-1 text-sm text-gray-800">Av San Martín de Porres 598, Cajamarca, Perú</p>
            <div className="mt-6 flex items-center gap-2 text-teal-700">
              <IconPhone/> <p className="font-semibold">Teléfono</p>
            </div>
            <a href={`tel:${formatPhone(PHONE)}`} className="mt-1 inline-block text-sm font-semibold text-gray-900 hover:underline">{PHONE}</a>
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <img alt="Mapa" src="img/servicios/mapa.jpg" className="h-56 w-full object-cover" loading="lazy" decoding="async"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Carolina", text: "Muy buena atención, claros en el plan de tratamiento y precios." },
    { name: "Luis", text: "Me hicieron una endodoncia sin dolor y el seguimiento fue excelente." },
    { name: "Andrea", text: "Mi hijo salió contento. La Dra. Jazmín es súper paciente." },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Lo que dicen nuestros pacientes</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((t,i)=> (
            <figure key={i} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <blockquote className="text-sm text-gray-700">“{t.text}”</blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-gray-900">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-white" id="faq">
      <div className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Preguntas frecuentes</h2>
        <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {FAQS.map((f, i) => (
            <div key={i}>
              <button onClick={()=>setOpen(open===i?-1:i)} className="flex w-full items-center justify-between px-4 py-4 text-left">
                <span className="font-medium text-gray-900">{f.q}</span>
                <span className="text-xl">{open===i?"−":"+"}</span>
              </button>
              {open===i && <p className="px-4 pb-4 text-sm text-gray-600">{f.a}</p>}
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] leading-4 text-gray-500">* La información es orientativa y no reemplaza diagnóstico odontológico. Cada caso requiere evaluación clínica.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contacto" className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <img src="/img/logo/servident-logo.jpg" alt="Servident MVM Dental Group" className="h-8 w-auto object-contain"/>
              <p className="font-bold">Servident MVM Dental Group</p>
            </div>
            <p className="mt-2 text-sm text-gray-600">Clínica odontológica integral. Boletas y facturas electrónicas. Atención con cita previa.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Contacto</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>WhatsApp: <a className="font-semibold text-gray-900 hover:underline" href={WHATS} target="_blank" rel="noreferrer">+51 941 904 372</a></li>
              <li>Teléfono: <a className="hover:underline" href={`tel:${formatPhone(PHONE)}`}>{PHONE}</a></li>
              <li>Correo: <a className="hover:underline" href="mailto:contacto@servident.pe">contacto@servident.pe</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Legal</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Política de Protección de Datos Personales</a></li>
              <li><a href="#" className="hover:underline">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:underline">Libro de Reclamaciones (enlace)</a></li>
            </ul>
            <p className="mt-3 text-[11px] leading-4 text-gray-500">Conforme a la Ley N° 29733 y su Reglamento, autorizas el tratamiento de tus datos para la gestión de citas, recordatorios y comunicaciones relacionadas a servicios odontológicos. Los procedimientos son realizados por cirujanos dentistas colegiados y habilitados.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Ubicación</p>
            <p className="mt-2 text-sm text-gray-600">Av San Martín de Porres 598, Cajamarca 06003
              <br/>Cajamarca, Perú
            </p>
            <a href="#reserva" className="mt-3 inline-block rounded-xl bg-[#37C7C9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2aa8aa]">Reservar cita</a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} Servident MVM Dental Group. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

function runSmokeTests() {
  try {
    console.assert(Array.isArray(SERVICES) && SERVICES.length >= 6, 'SERVICES debe tener 6+ items');
    console.assert(Array.isArray(TEAM) && TEAM.length >= 2, 'TEAM debe tener al menos 2 miembros');
    console.assert(typeof WHATS === 'string' && WHATS.startsWith('https://wa.me/'), 'WHATS debe ser un enlace wa.me');
  } catch (e) {
    console.error('Smoke tests error', e);
  }
}

export default function ServidentDentaGroup() {
  const [openBooking, setOpenBooking] = useState(false);
  useEffect(() => {
    document.title = "Servident MVM Dental Group — Clínica Odontológica";
    runSmokeTests();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <a href="#main" className="sr-only focus:not-sr-only">Saltar al contenido</a>
      <Header onClickCTA={() => { const el = document.getElementById("reserva"); el?.scrollIntoView({ behavior: "smooth" }); }} />
      <main id="main" className="mx-auto max-w-7xl px-4">
        <Hero onClickCTA={() => { const el = document.getElementById("reserva"); el?.scrollIntoView({ behavior: "smooth" }); }} />
        <Services />
        <Team />
        <Booking />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
