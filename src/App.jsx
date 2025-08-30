import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};
const cardFadeIn = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4 } },
};
const glassStyle = "bg-white/30 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 shadow-xl";

// Main App Component
export default function App() {
  const [view, setView] = useState('home');
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Courses Data — Replace with your own
  const courses = useMemo(() => [
    { id: 'html', title: 'HTML: Structure & Semantics', instructor: 'Basha Ram', level: 'Beginner', hours: 6, enrolled: 8200, cover: 'https://pixelmechanics.com.sg/wp-content/uploads/2019/06/html5-logo-for-web-development.png', progress: 12 },
    { id: 'css', title: 'CSS: Modern Layouts & Animations', instructor: 'JAY', level: 'Beginner', hours: 8, enrolled: 7600, cover: 'https://colorlib.com/wp/wp-content/uploads/sites/2/creative-css3-tutorials.jpg', progress: 46 },
    { id: 'js-basic', title: 'JavaScript Basics', instructor: 'RK', level: 'Beginner', hours: 10, enrolled: 12000, cover: 'https://totalwebcs.com/wp-content/uploads/2017/02/js_logo.jpg', progress: 33 },
    { id: 'js-intermediate', title: 'JavaScript Intermediate', instructor: 'SAILESH', level: 'Intermediate', hours: 14, enrolled: 7200, cover: 'https://ktnest-prod-asset.s3.ap-south-1.amazonaws.com/uploads/course-thumbnail/1750844954-5uxk7UgIaVhAKPQsqnmHLWldOBo8Mw.png', progress: 7 },
    { id: 'python', title: 'Python Programming', instructor: 'Basha Ram', level: 'Beginner', hours: 20, enrolled: 15000, cover: 'https://quantumzeitgeist.com/wp-content/uploads/python.jpg', progress: 50 },
    { id: 'c', title: 'C Programming: From Basics to Pointers', instructor: 'RK', level: 'Beginner', hours: 12, enrolled: 4300, cover: 'https://guruzwebservices.com/wp-content/uploads/2025/06/c-language.png', progress: 5 },
    { id: 'java', title: 'Java: Object Oriented Mastery', instructor: 'ASD', level: 'Intermediate', hours: 22, enrolled: 9800, cover: 'https://www.oracle.com/img/tech/cb88-java-logo-001.jpg', progress: 19 },
    { id: 'ai', title: 'AI Foundations', instructor: 'ASD', level: 'Advanced', hours: 16, enrolled: 5400, cover: 'https://s44783.pcdn.co/in/wp-content/uploads/sites/3/2022/10/What-is-M.Tech-in-Artificial-Intelligence_AI.jpg.optimal.jpg', progress: 2 },
    { id: 'ml', title: 'Machine Learning Practical', instructor: 'Basha Ram', level: 'Advanced', hours: 24, enrolled: 8200, cover: 'https://www.digimanthan.com/wp-content/uploads/2020/12/machine-1.jpg', progress: 3 },
    { id: 'dl', title: 'Deep Learning Hands-on', instructor: 'Basha Ram', level: 'Advanced', hours: 28, enrolled: 4200, cover: 'https://miro.medium.com/v2/resize:fit:1400/1*tH8rkJwSokOgxIcsxUtgrA.png', progress: 0 },
    { id: 'devops', title: 'Capstone: Build & Deploy (Bonus)', instructor: 'Ops Team', level: 'Intermediate', hours: 10, enrolled: 2100, cover: 'https://media.licdn.com/dms/image/v2/D5612AQFJD28RkNtqTw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1726063580825?e=2147483647&v=beta&t=tYRHUd-OA2mPkx0KvhLBxpMF1kTlGEwjmTVN5WrmzoU', progress: 0 }
  ], []);

  const filtered = courses.filter(c => (c.title + c.instructor + c.level).toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  function openCourse(c) {
    setSelectedCourse(c);
    setView('course');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={`min-h-screen font-sans relative transition-colors duration-300 ${dark ? 'bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-800 text-slate-100' : 'bg-gradient-to-br from-indigo-100 via-pink-100 to-white text-slate-800'}`}>
      {/* Animated Gradient Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="pointer-events-none fixed top-0 left-0 w-full h-60 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,#dbbaff77_30%,transparent_100%)]" 
      />

      <Navbar dark={dark} setDark={setDark} query={query} setQuery={setQuery} onNavigate={setView} glass={glassStyle} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial="hidden" animate="show" exit="hidden" variants={staggerContainer}>
              <Hero onExplore={() => setView('courses')} glass={glassStyle} />

              {/* Staggered Animate Course Cards */}
              <section className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Popular courses</h2>
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" animate="show">
                  {courses.slice(0, 3).map(course => (
                    <motion.div key={course.id} variants={cardFadeIn}>
                      <CourseCard course={course} onOpen={() => openCourse(course)} dark={dark} glass={glassStyle} />
                    </motion.div>
                  ))}
                </motion.div>
              </section>

              {/* Glass Hero Section */}
              <section className={`mt-12 ${glassStyle} rounded-2xl p-8`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold">Want a curated learning path?</h3>
                    <p className="mt-2 text-slate-700 dark:text-slate-100/90">We’ll help you choose the right courses based on your goals — web dev, AI, ML or Deep Learning.</p>
                    <div className="mt-4 flex gap-3">
                      <motion.button whileHover={{ scale: 1.05 }} className="py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg">Get Roadmap</motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} className="py-2 px-4 rounded-lg border border-white/30">Contact Mentor</motion.button>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <img src="https://cdn.dataworks-ed.com/wordpress-content/uploads/20191218113341/Blog-Header.png" alt="mentor" className="rounded-xl shadow-xl" />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'courses' && (
            <motion.div key="courses" initial="hidden" animate="show" exit="hidden" variants={staggerContainer}>
              <div className={`flex items-center justify-between ${glassStyle} rounded-xl p-6 mb-8`}>
                <h2 className="text-2xl font-bold">All Courses</h2>
                <div className="flex items-center gap-3">
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses..." className="px-3 py-2 rounded-lg border w-72 bg-white/60 dark:bg-slate-800/60" />
                </div>
              </div>
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" animate="show">
                {filtered.map(c => (
                  <motion.div key={c.id} variants={cardFadeIn}>
                    <CourseCard course={c} onOpen={() => openCourse(c)} dark={dark} glass={glassStyle} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {view === 'course' && selectedCourse && (
            <motion.div key={selectedCourse.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <CourseDetail course={selectedCourse} onBack={() => setView('courses')} dark={dark} glass={glassStyle} />
            </motion.div>
          )}

          {view === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <Profile onBack={() => setView('home')} glass={glassStyle} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer glass={glassStyle} />
    </div>
  );
}

function Navbar({ dark, setDark, query, setQuery, onNavigate, glass }) {
  return (
    <header className={`py-4 px-6 sticky top-0 z-40 shadow-sm ${glass}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} whileHover={{ scale: 1.08 }}
            className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-400 flex items-center justify-center text-white font-bold text-lg shadow">Ti
          </motion.div>
          <div>
            <div className="font-bold">Tech In My Style</div>
            <div className="text-xs text-slate-400">Premium LMS</div>
          </div>
        </div>
        <div className="flex-1 px-6 hidden md:block">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses, topics, instructors..."
            className="w-full rounded-lg px-4 py-2 border bg-white/60 dark:bg-slate-800/60" />
        </div>
        <div className="flex items-center gap-3">
          <motion.button onClick={() => onNavigate('courses')} whileHover={{ scale: 1.05 }} className="hidden md:inline-flex px-3 py-2 rounded-lg hover:bg-slate-100/80">Courses</motion.button>
          <motion.button onClick={() => onNavigate('profile')} whileHover={{ scale: 1.05 }} className="hidden md:inline-flex px-3 py-2 rounded-lg hover:bg-slate-100/80">Profile</motion.button>
          <motion.button onClick={() => setDark(d => !d)} className="p-2 rounded-lg border" whileTap={{ rotate: 14 }}>{dark ? '🌙' : '☀️'}</motion.button>
          <motion.button whileHover={{ scale: 1.06 }} className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow" onClick={() => alert('Enroll flow coming soon')}>Get Certified</motion.button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onExplore, glass }) {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <motion.h1 initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 }}
          className="text-5xl font-extrabold leading-tight">Master Tech Skills — 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">Your Way</span>
        </motion.h1>
        <motion.p initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.12 }}
          className="mt-4 text-xl text-slate-500">11 curated courses, hands-on projects, and mentorship to accelerate your career in web development, programming, AI & ML.
        </motion.p>
        <div className="mt-6 flex gap-3">
          <motion.button whileHover={{ scale: 1.06 }} className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg" onClick={onExplore}>Explore Courses</motion.button>
          <motion.button whileHover={{ scale: 1.03 }} className="px-5 py-3 rounded-xl border" onClick={() => alert('Book a free counselling call')}>Book Free Call</motion.button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
          <motion.div className="px-3 py-2 bg-white/60 rounded-lg">📚 11 Courses</motion.div>
          <motion.div className="px-3 py-2 bg-white/60 rounded-lg">🎓 Certificates</motion.div>
          <motion.div className="px-3 py-2 bg-white/60 rounded-lg">🧑‍🏫 Mentorship</motion.div>
        </div>
      </div>
      <div className="relative">
        <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.06 }} className="rounded-2xl overflow-hidden shadow-2xl">
          <img src="https://www.shutterstock.com/image-photo/cute-little-girl-wearing-wireless-600nw-2273823635.jpg" className="w-full h-full object-cover" alt="hero" />
        </motion.div>
        {/* Glass info panel */}
        <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
          className={`${glass} absolute -bottom-8 left-6 right-6 rounded-2xl p-4 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Featured Path</div>
              <div className="font-semibold">Frontend Developer — 90 days</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-slate-400">12 Modules</div>
              <motion.button whileHover={{ scale: 1.06 }} className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm">Start Path</motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CourseCard({ course, onOpen, dark, glass }) {
  return (
    <motion.article whileHover={{ y: -6, scale: 1.04, boxShadow: '0 8px 36px #a78bfa44' }} className={`rounded-2xl overflow-hidden shadow-md border ${glass} cursor-pointer`} onClick={onOpen}>
      <div className="h-44 overflow-hidden relative">
        <motion.img src={course.cover} alt={course.title} className="w-full h-full object-cover transition-transform duration-300" initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} />
        <motion.div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-md text-xs shadow" whileHover={{ y: -2 }}>{course.level}</motion.div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-slate-400">{course.level} • {course.hours} hrs</div>
            <h3 className="mt-1 font-semibold text-lg">{course.title}</h3>
            <div className="text-sm text-slate-500 mt-1">By {course.instructor}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">{course.enrolled} learners</div>
            <motion.div whileHover={{ scale: 1.15 }} className="mt-3 text-sm font-semibold text-indigo-600">Enroll</motion.div>
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gradient-to-r from-indigo-200 via-white to-emerald-200 rounded-full h-2 overflow-hidden">
            <motion.div style={{ width: `${course.progress}%` }} className="h-2 bg-gradient-to-r from-indigo-500 to-emerald-400" />
          </div>
          <div className="mt-1 text-xs text-slate-400">Progress: {course.progress}%</div>
        </div>
      </div>
    </motion.article>
  );
}

function CourseDetail({ course, onBack, dark, glass }) {
  const lessons = [
    { id: 1, title: 'Introduction', length: '8:12' },
    { id: 2, title: 'Core Concepts', length: '22:04' },
    { id: 3, title: 'Hands-on Project', length: '36:10' },
  ];
  return (
    <div className={`${glass} rounded-2xl p-6 shadow-lg`}>
      <button className="text-sm text-indigo-600 mb-4" onClick={onBack}>← Back to courses</button>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="rounded-xl overflow-hidden shadow-md h-64 mb-4">
            <img src={course.cover} alt={course.title} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <div className="text-sm text-slate-500 mt-2">By {course.instructor} • {course.level} • {course.hours} hours</div>
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Curriculum</h3>
            <ul className="mt-3 space-y-3">
              {lessons.map(l => (
                <motion.li key={l.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700" whileHover={{ scale: 1.03 }}>
                  <div>
                    <div className="font-medium">{l.title}</div>
                    <div className="text-xs text-slate-400">Lesson {l.id}</div>
                  </div>
                  <div className="text-sm text-slate-500">{l.length}</div>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex gap-3">
            <motion.button whileHover={{ scale: 1.08 }} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Resume Course</motion.button>
            <motion.button whileHover={{ scale: 1.08 }} className="px-4 py-2 rounded-lg border">Download Resources</motion.button>
          </div>
        </div>
        <aside className="md:col-span-1">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 shadow-inner">
            <div className="text-sm text-slate-400">Your Progress</div>
            <div className="mt-2 text-xl font-semibold">{course.progress}%</div>
            <div className="mt-3">
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <motion.div style={{ width: `${course.progress}%` }} className="h-2 bg-gradient-to-r from-indigo-500 to-emerald-400" />
              </div>
            </div>
            <div className="mt-6">
              <div className="text-sm text-slate-400">Instructor</div>
              <div className="mt-2 font-medium">{course.instructor}</div>
              <div className="text-xs text-slate-400 mt-1">Hands-on mentor & practical projects.</div>
            </div>
            <div className="mt-6">
              <div className="text-sm text-slate-400">Certificate</div>
              <div className="mt-2 text-sm">Earn a verified certificate on completion.</div>
              <motion.button whileHover={{ scale: 1.07 }} className="mt-3 w-full px-3 py-2 rounded-lg bg-indigo-600 text-white">View Certificate</motion.button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Profile({ onBack, glass }) {
  return (
    <div className={`max-w-3xl mx-auto ${glass} rounded-2xl p-6 shadow-lg`}>
      <button className="text-sm text-indigo-600 mb-4" onClick={onBack}>← Back</button>
      <div className="flex items-center gap-6">
        <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center text-white font-bold text-2xl">BR</div>
        <div>
          <div className="font-bold text-lg">Basha Ram</div>
          <div className="text-sm text-slate-500">Student • Frontend & AI Enthusiast</div>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 rounded-lg border">Edit Profile</button>
            <button className="px-3 py-1 rounded-lg">Settings</button>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
          <h3 className="font-semibold">Enrolled Courses</h3>
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800">
              <div>
                <div className="font-medium">Modern Frontend with React</div>
                <div className="text-xs text-slate-400">Progress: 72%</div>
              </div>
              <div className="text-sm text-slate-500">Resume</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4">
          <h3 className="font-semibold">Achievements</h3>
          <div className="mt-3 text-sm text-slate-500">No certificates yet — complete a course to earn your first one!</div>
        </div>
      </div>
    </div>
  );
}

function Footer({ glass }) {
  return (
    <footer className={`mt-16 py-10 ${glass}`}>
      <div className="max-w-7xl mx-auto text-center text-sm text-slate-500">© {new Date().getFullYear()} Tech In My Style — Crafted with ❤️</div>
    </footer>
  );
}
