import React from "react";
import { History, Rocket, Clock, CheckCircle } from "lucide-react";
import { PROJECTS } from "../constants";

const ProjectCard = ({ project }) => (
  <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
    <div className="h-48 overflow-hidden bg-slate-200">
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>
    <div className="p-8 space-y-4 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold text-blue-900 tracking-tight">
        {project.title}
      </h3>
      <p className="text-slate-600 leading-relaxed flex-grow">{project.desc}</p>

      {project.meeting && (
        <div className="pt-4 mt-auto border-t border-slate-50">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
            <Clock size={16} />
            <span>Meeting: {project.meeting}</span>
          </div>
        </div>
      )}

      {project.completed && (
        <div className="pt-4 mt-auto border-t border-slate-50">
          <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
            <CheckCircle size={16} />
            <span>Completed: {project.completed}</span>
          </div>
        </div>
      )}
    </div>
  </div>
);

const Projects = () => {
  const activeProjects = PROJECTS.filter((p) => p.status === "active");
  const pastProjects = PROJECTS.filter((p) => p.status === "past");

  return (
    <div className="space-y-24 animate-in fade-in duration-500">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
          Our Projects
        </h2>
        <p className="text-slate-600 text-lg">
          Explore our current research initiatives and past engineering
          milestones.
        </p>
      </div>

      {/* Active Projects Section */}
      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg">
            <Rocket size={24} />
          </div>
          <h3 className="text-3xl font-bold text-slate-800">Active</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {activeProjects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
      </section>

      {/* Past Projects Section */}
      <section className="space-y-10 opacity-90">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-200 rounded-2xl text-slate-600">
            <History size={24} />
          </div>
          <h3 className="text-3xl font-bold text-slate-700">Past </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {pastProjects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
