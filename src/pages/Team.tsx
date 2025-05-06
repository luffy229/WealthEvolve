
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Users, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Chief Executive Officer",
    bio: "With over 15 years in wealth management, Sarah leads our vision to revolutionize personal finance through technology and human expertise.",
    skills: ["Strategic Leadership", "Financial Markets", "Client Relations"],
    icon: User,
    color: "bg-wealth-teal",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?fit=crop&w=800&h=800"
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    bio: "Michael brings 12+ years of experience in fintech development, focusing on AI solutions that make financial data meaningful and accessible.",
    skills: ["AI Development", "System Architecture", "Data Security"],
    icon: User,
    color: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?fit=crop&w=800&h=800"
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Investment Research",
    bio: "Elena's background in quantitative finance drives our research team to discover unique investment opportunities and portfolio strategies.",
    skills: ["Market Analysis", "Risk Assessment", "Portfolio Construction"],
    icon: UserCheck,
    color: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?fit=crop&w=800&h=800"
  },
  {
    name: "David Okafor",
    role: "Client Success Director",
    bio: "David ensures every client achieves their wealth goals through personalized guidance and exceptional service standards.",
    skills: ["Client Education", "Financial Planning", "Relationship Management"],
    icon: Users,
    color: "bg-wealth-gold",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?fit=crop&w=800&h=800"
  }
];

// Simple 3D User Icon
function UserIcon() {
  return (
    <group>
      {/* Head */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#2CA6A4" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.25, 0.5, 32]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
    </group>
  );
}

function Team3DScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <UserIcon />
      <OrbitControls 
        enableZoom={false}
        autoRotate
        autoRotateSpeed={4}
      />
    </>
  );
}

const Team: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-wealth py-24">
          <div className="wealth-container relative z-10">
            <div className="flex flex-col items-center text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Meet Our Expert Team
              </motion.h1>
              <motion.p 
                className="text-lg text-white/90 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                The passionate professionals behind WealthEvolve who are dedicated to transforming your financial future
              </motion.p>
            </div>

            {/* 3D Model */}
            <motion.div 
              className="w-full h-[300px] mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            >
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white">Loading 3D Model...</div>}>
                <Canvas camera={{ position: [0, 0, 2] }} className="w-full h-full">
                  <Team3DScene />
                </Canvas>
              </Suspense>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-wealth-teal opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-wealth-gold opacity-20 rounded-full blur-3xl translate-x-1/3"></div>
        </section>
        
        {/* Team Members Section */}
        <section className="py-20 bg-white">
          <div className="wealth-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-wealth-navy mb-4">The People Behind Our Success</h2>
              <p className="text-wealth-gray max-w-2xl mx-auto">
                Our talented team combines expertise in finance, technology, and client service to deliver exceptional wealth management solutions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.name}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute top-4 right-4 ${member.color} rounded-full p-2 shadow-lg`}>
                        <member.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-serif text-xl font-bold text-wealth-navy">{member.name}</h3>
                      <p className={`text-sm font-medium mb-3 ${member.color === 'bg-wealth-teal' ? 'text-wealth-teal' : 
                                     member.color === 'bg-blue-500' ? 'text-blue-500' : 
                                     member.color === 'bg-orange-500' ? 'text-orange-500' : 'text-wealth-gold'}`}>
                        {member.role}
                      </p>
                      <p className="text-wealth-gray text-sm mb-4">{member.bio}</p>
                      
                      {/* Skills */}
                      <div className="mt-auto">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-wealth-gray mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map(skill => (
                            <span 
                              key={skill} 
                              className={`text-xs px-3 py-1 rounded-full ${
                                member.color === 'bg-wealth-teal' ? 'bg-wealth-teal/10 text-wealth-teal' : 
                                member.color === 'bg-blue-500' ? 'bg-blue-500/10 text-blue-500' : 
                                member.color === 'bg-orange-500' ? 'bg-orange-500/10 text-orange-500' : 
                                'bg-wealth-gold/10 text-wealth-gold'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20 bg-wealth-light">
          <div className="wealth-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-wealth-navy mb-4">Our Core Values</h2>
              <p className="text-wealth-gray max-w-2xl mx-auto">
                These principles guide everything we do as we work to transform the wealth management experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Client First",
                  description: "We always prioritize our clients' best interests in every decision we make.",
                  icon: "🤝",
                  color: "bg-wealth-teal"
                },
                {
                  title: "Innovation",
                  description: "We continuously explore new technologies to enhance our wealth management solutions.",
                  icon: "💡",
                  color: "bg-blue-500"
                },
                {
                  title: "Integrity",
                  description: "We maintain the highest ethical standards with complete transparency and honesty.",
                  icon: "🛡️",
                  color: "bg-orange-500"
                },
                {
                  title: "Excellence",
                  description: "We strive for excellence in everything we do, from research to client service.",
                  icon: "⭐",
                  color: "bg-wealth-gold"
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-white p-8 rounded-xl shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className={`w-12 h-12 ${value.color} rounded-lg flex items-center justify-center mb-4 text-2xl`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-wealth-navy mb-3">{value.title}</h3>
                  <p className="text-wealth-gray text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Our Team CTA */}
        <section className="py-16 bg-gradient-to-r from-wealth-navy to-wealth-charcoal text-white">
          <div className="wealth-container">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0">
                <h2 className="text-3xl font-serif font-bold mb-4">Join Our Growing Team</h2>
                <p className="text-white/80 max-w-lg">
                  We're always looking for talented individuals who are passionate about revolutionizing wealth management.
                </p>
              </div>
              <motion.a 
                href="#" 
                className="px-8 py-3 bg-white text-wealth-navy font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Careers
              </motion.a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
