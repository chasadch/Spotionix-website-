import React from 'react'
import { people01, people02, people03 } from '../assets'

const members = [
  {
    name: 'Muhammad Asad',
    role: 'Embedded Systems & IoT Expert',
    img: people01,
  },
  {
    name: 'Sajid',
    role: 'AI Expert',
    img: people02,
  },
  {
    name: 'Ahsan Habib',
    role: 'Web Developer',
    img: people03,
  },
]

const Card = ({ name, role, img }) => (
  <div
    className="group relative rounded-2xl border border-cyan-400/20 bg-white/5 dark:bg-white/5 p-6 backdrop-blur-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)]"
    role="listitem"
  >
    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-1 ring-cyan-400/30">
      <img src={img} alt={`${name} portrait`} className="h-full w-full object-cover" draggable="false"/>
    </div>
    <div className="mt-4 text-center">
      <h3 className="text-white text-lg font-semibold tracking-tight">{name}</h3>
      <p className="mt-1 text-sm text-cyan-200/80">{role}</p>
    </div>
    {/* decorative gradient */}
    <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(400px_120px_at_50%_-40%,rgba(56,189,248,0.15),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  </div>
)

const Team = () => {
  return (
    <section id="team" aria-labelledby="team-title" className="py-16 sm:py-24">
      <div className="mb-8 text-center">
        <h2 id="team-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Our Team
        </h2>
        <p className="mt-3 text-cyan-100/70 max-w-2xl mx-auto">
          The people behind Spotionix — crafting embedded systems, AI, and modern web experiences.
        </p>
      </div>
      <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m) => (
          <Card key={m.name} {...m} />
        ))}
      </div>
    </section>
  )
}

export default Team
