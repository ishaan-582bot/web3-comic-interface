import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, User, Plus } from 'lucide-react';
import { ComicPanel } from '../components/ComicEffects';
import { cn } from '../lib/utils';

const TEAM_MEMBERS = [
  {
    name: 'Satoshi Nakamoto',
    role: 'Founder & Visionary',
    avatar: '👤',
    description: 'The mysterious creator who started it all. Believes in financial freedom for everyone.',
    twitter: '#',
    github: '#',
    color: 'from-bitcoin-orange to-orange-600',
  },
  {
    name: 'Vitalik Buterin',
    role: 'Chief Architect',
    avatar: '🧠',
    description: 'Smart contract wizard and blockchain philosopher. Building the future of decentralized applications.',
    twitter: '#',
    github: '#',
    color: 'from-cyber-cyan to-blue-600',
  },
  {
    name: 'Gavin Wood',
    role: 'Lead Developer',
    avatar: '💻',
    description: 'Core protocol engineer. Turning complex ideas into elegant code.',
    twitter: '#',
    github: '#',
    color: 'from-neon-purple to-purple-600',
  },
  {
    name: 'You?',
    role: 'Community Member',
    avatar: '⭐',
    description: 'We are always looking for talented individuals to join our mission.',
    twitter: null,
    github: null,
    color: 'from-neon-green to-green-600',
    isJoinCard: true,
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded-full text-sm font-mono mb-4">
            Chapter 06
          </span>
          <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
            The Team
          </h1>
          <p className="text-gray-400">Meet the builders of the future</p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group"
            >
              <ComicPanel 
                className={cn(
                  "h-full p-6 transition-all duration-300",
                  member.isJoinCard 
                    ? "border-dashed border-2 border-neon-green hover:border-solid" 
                    : "hover:-translate-y-2 hover:shadow-xl"
                )}
              >
                {/* Avatar */}
                <div className={cn(
                  "w-24 h-24 mx-auto mb-4 rounded-xl bg-gradient-to-br flex items-center justify-center text-4xl transition-transform group-hover:scale-110",
                  member.color
                )}>
                  {member.isJoinCard ? (
                    <Plus className="w-10 h-10 text-white" />
                  ) : (
                    <span>{member.avatar}</span>
                  )}
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="font-comic text-xl text-white mb-1">{member.name}</h3>
                  <p className={cn(
                    "text-sm font-medium mb-3",
                    member.isJoinCard ? "text-neon-green" : "text-cyber-cyan"
                  )}>
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  {!member.isJoinCard ? (
                    <div className="flex justify-center gap-3">
                      {member.twitter && (
                        <a 
                          href={member.twitter}
                          className="p-2 bg-dark-bg rounded-lg hover:bg-cyber-cyan/20 hover:text-cyber-cyan transition-colors"
                          aria-label={`${member.name}'s Twitter`}
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {member.github && (
                        <a 
                          href={member.github}
                          className="p-2 bg-dark-bg rounded-lg hover:bg-cyber-cyan/20 hover:text-cyber-cyan transition-colors"
                          aria-label={`${member.name}'s GitHub`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ) : (
                    <button className="w-full py-2 bg-neon-green/20 text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors font-medium">
                      Apply to Join
                    </button>
                  )}
                </div>
              </ComicPanel>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <ComicPanel className="p-6 sm:p-8">
            <h2 className="font-comic text-2xl text-white text-center mb-6">
              Our Core Values
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: 'Decentralization', desc: 'Power to the people, not corporations' },
                { title: 'Transparency', desc: 'Open source, open books, open minds' },
                { title: 'Community First', desc: 'Built by the community, for the community' },
              ].map((value, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-cyber-cyan/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">{['🌐', '🔍', '❤️'][i]}</span>
                  </div>
                  <h3 className="font-bold text-white mb-1">{value.title}</h3>
                  <p className="text-sm text-gray-400">{value.desc}</p>
                </div>
              ))}
            </div>
          </ComicPanel>
        </motion.div>
      </div>
    </div>
  );
}
