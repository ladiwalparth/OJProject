import React from "react";

const Home = () => {
  return (
    <div className="text-gray-900 px-6 py-10 font-sans rounded-md" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1649836607840-3c74b50db7cc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}>
      <div className="w-[75%] mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-[#323754]">Hi, I'm Parth Ladiwal 👋</h1>
        <p className="text-lg mb-6">
          I'm a software developer with a passion for problem-solving, full stack web development, and competitive programming.
          Currently pursuing B.Tech in ECE at LNMIIT, I've built MERN stack projects and participated in coding platforms like Codeforces, LeetCode and solved more than 600 data structure and algorithm problems on these platforms.
        </p>

        <div className="h-[548px]">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Coding"
            className="rounded-lg shadow-lg mb-6 w-full h-full object-cover"
          />
        </div>

        <h2 className="text-2xl font-semibold text-[#323754] mt-8 mb-2">💻 About the Project</h2>
        <ul className="list-disc pl-5 mb-6">
          <li>Built a full-stack Online Judge platform during externship at AlgoUniversity.</li>
          <li>Users can register, log in, view problems, and submit code for live evaluation.</li>
          <li>Submissions run inside secure Docker containers to ensure safety and isolation.</li>
          <li>Backend: Node.js & Express | Frontend: React & Tailwind CSS</li>
          <li>MongoDB handles storage for problems, test cases, users, and submissions.</li>
          <li>Code execution is asynchronous, allowing thousands of users to submit in parallel.</li>
          <li>Deployed the entire platform on AWS for performance and scalability.</li>
          <li>Integrated AI-powered code reviews using Google Gemini API.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#323754] mt-8 mb-2">🔗 My Profiles</h2>
        <ul className="pl-4 mb-10">
          <li><a href="https://github.com/ladiwalparth/OJ-Project" className="text-blue-600 underline" target="_blank" >GitHub – Online Judge Project</a></li>
          <li><a href="https://leetcode.com/ladiwalparth" className="text-blue-600 underline" target="_blank" >LeetCode Profile</a></li>
          <li><a href="https://codeforces.com/profile/ladiwalparth" className="text-blue-600 underline" target="_blank" >Codeforces Profile</a></li>
        </ul>

      </div>
    </div>
  );
};

export default Home;
