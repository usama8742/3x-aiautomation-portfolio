import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Users } from 'lucide-react';
import { TEAM } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
function Avatar({ member }) {
  const [failed, setFailed] = useState(!member.photo);

  if (failed) {
    return (
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#FE330A] to-[#D62705] text-white flex items-center justify-center font-black text-2xl sm:text-3xl tracking-tight shadow-md shrink-0"
        aria-hidden="true"
      >
        {member.initials}
      </div>
    );
  }

  return (
    <img
      src={member.photo}
      alt={`${member.name} - ${member.role}`}
      width="96"
      height="96"
      loading="lazy"
      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#FE330A] shadow-md shrink-0"
      onError={() => setFailed(true)}
    />
  );
}

export default function Team() {
  return (
    <section id="team" className="py-20 lg:py-28 bg-white border-b border-[#DBD6CF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="pill-badge mb-5">
            <Users className="w-3.5 h-3.5 text-[#FE330A]" />
            The team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#191919] tracking-tight leading-[1.08]">
            Two Engineers. <span className="text-[#FE330A] whitespace-nowrap">No Middlemen.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            The people who scope your system are the people who build and ship it. No account managers, no
            outsourced dev shop, no telephone game.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {TEAM.map((member) => (
            <article
              key={member.id}
              className="premium-card p-6 sm:p-8 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FE330A] to-[#D62705]" aria-hidden="true" />

              <div className="flex items-start gap-4 sm:gap-5">
                <Avatar member={member} />
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-black text-[#191919] tracking-tight">{member.name}</h3>
                  <p className="text-xs sm:text-sm font-bold text-[#FE330A] mt-0.5">{member.role}</p>
                  <p className="text-xs text-slate-600 mt-1.5 inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {member.location}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm sm:text-base text-slate-700 leading-relaxed">{member.bio}</p>

              <ul className="mt-5 mb-6 grid sm:grid-cols-2 gap-2" aria-label={`${member.name} focus areas`}>
                {member.focus.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-[#191919]">
                    <CheckCircle2 className="w-4 h-4 text-[#FE330A] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5 border-t border-[#DBD6CF] flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-slate-600 bg-[#EFEAE3] border border-[#DBD6CF] px-2.5 py-1 rounded-full">
                  {member.stack}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={member.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on GitHub`}
                    className="w-9 h-9 rounded-full bg-white border border-[#DBD6CF] flex items-center justify-center text-[#191919] hover:border-[#FE330A] hover:text-[#FE330A] transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="w-9 h-9 rounded-full bg-white border border-[#DBD6CF] flex items-center justify-center text-[#191919] hover:border-[#FE330A] hover:text-[#FE330A] transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.links.email}`}
                    aria-label={`Email ${member.name}`}
                    className="w-9 h-9 rounded-full bg-white border border-[#DBD6CF] flex items-center justify-center text-[#191919] hover:border-[#FE330A] hover:text-[#FE330A] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
