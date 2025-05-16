"use client"
import { useQuery } from "@blitzjs/rpc";
import { useState } from "react";
import { FiCheck, FiCalendar, FiTarget, FiClock, FiEdit2, FiTrash2, FiChevronUp } from "react-icons/fi";
import getCurrentUserSkill from "../users/queries/getCurrentUserSkill";


type Skill = {
  id: string;
  name: string;
  startDate: Date;
  targetDate: Date;
  totalDays: number;
  progressDays: number;
  checkpoints: {
    date: Date;
    checked: boolean;
    checkedDate?: Date;
  }[];
};

const Page = () => {
  const [user] = useQuery(getCurrentUserSkill,null)
  console.log(user)

  
  // Sample data - replace with your actual data fetching logic
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "1",
      name: "React Mastery",
      startDate: new Date("2023-06-01"),
      targetDate: new Date("2023-07-15"),
      totalDays: 45,
      progressDays: 12,
      checkpoints: generateCheckpoints(new Date("2023-06-01"), new Date("2023-07-15"), 12),
    },
    // Add more skills as needed
    {
      id: "2",
      name: "React Mastery",
      startDate: new Date("2023-06-01"),
      targetDate: new Date("2023-07-15"),
      totalDays: 45,
      progressDays: 12,
      checkpoints: generateCheckpoints(new Date("2023-06-01"), new Date("2023-07-16"), 12),
    },
    // Add more skills as needed
  ]);

  // Generate checkpoints between start and end date
  function generateCheckpoints(startDate: Date, endDate: Date, progressDays: number) {
    const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      return {
        date,
        checked: i < progressDays,
        checkedDate: i < progressDays ? new Date(date) : undefined,
      };
    });
  }

   const [expandedSkillIds, setExpandedSkillIds] = useState<string[]>([]);

  const isExpanded = (id: string) => expandedSkillIds.includes(id);

  const toggleExpand = (skillId: string) => {
    setExpandedSkillIds((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const toggleCheckpoint = (skillId: string, checkpointIndex: number) => {
    setSkills(skills.map(skill => {
      if (skill.id === skillId) {
        const updatedCheckpoints = [...skill.checkpoints];
        updatedCheckpoints[checkpointIndex] = {
          ...updatedCheckpoints[checkpointIndex],
          checked: !updatedCheckpoints[checkpointIndex].checked,
          checkedDate: updatedCheckpoints[checkpointIndex].checked ? undefined : new Date(),
        };

        const newProgressDays = updatedCheckpoints.filter(c => c.checked).length;
        
        return {
          ...skill,
          checkpoints: updatedCheckpoints,
          progressDays: newProgressDays,
        };
      }
      return skill;
    }));
  };

  // Calculate progress percentage
  const calculateProgress = (skill: Skill) => {
    return Math.floor((skill.progressDays / skill.totalDays) * 100);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Learning Goals</h1>
          <p className="text-gray-400">Track your skill development progress</p>
        </header>

        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">Skill</th>
                  <th className="px-6 py-4 text-left">Start Date</th>
                  <th className="px-6 py-4 text-left">Target Date</th>
                  <th className="px-6 py-4 text-left">Progress</th>
                  <th className="px-6 py-4 text-left">Daily Checkpoints</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {skills.map((skill) => (
                  <tr key={skill.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-3"></div>
                        {skill.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-300">
                        <FiCalendar className="mr-2 text-green-400" />
                        {skill.startDate.toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-300">
                        <FiTarget className="mr-2 text-green-400" />
                        {skill.targetDate.toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-700 rounded-full h-2.5 mr-3">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${calculateProgress(skill)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-300">
                          {calculateProgress(skill)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2 max-w-xs">
                        {(isExpanded(skill.id) ? skill.checkpoints : skill.checkpoints.slice(0, 7)).map((checkpoint, idx) => (
  <button
    key={idx}
    onClick={() => toggleCheckpoint(skill.id, idx)}
    className={`w-8 h-8 rounded-md flex items-center justify-center border transition-colors ${
      checkpoint.checked
        ? "bg-green-500/20 border-green-500 text-green-400"
        : "bg-gray-700 border-gray-600 hover:bg-gray-600"
    }`}
    title={checkpoint.date.toLocaleDateString()}
  >
    {checkpoint.checked ? (
      <FiCheck className="text-green-400" />
    ) : (
      <span className="text-xs">
        {checkpoint.date.getDate()}
      </span>
    )}
  </button>
))}
                     {skill.checkpoints.length > 7 && (
                      <button
                        onClick={() => toggleExpand(skill.id)}
                        className="w-8 h-8 rounded-md flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition-colors"
                        title={isExpanded(skill.id) ? "Show less" : "Show all days"}
                      >
                        {isExpanded(skill.id) ? (
                          <FiChevronUp className="text-green-400" />
                        ) : (
                          <span className="text-xs text-gray-300">
                            +{skill.checkpoints.length - 7}
                          </span>
                        )}
                      </button>
                    )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-green-400 transition-colors">
                          <FiEdit2 />
                        </button>
                        <button className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-red-400 transition-colors">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-500">
            <h3 className="text-gray-400 mb-2 flex items-center">
              <FiClock className="mr-2" /> Total Skills
            </h3>
            <p className="text-3xl font-bold">{skills.length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-500">
            <h3 className="text-gray-400 mb-2 flex items-center">
              <FiCheck className="mr-2" /> Completed Days
            </h3>
            <p className="text-3xl font-bold">
              {skills.reduce((sum, skill) => sum + skill.progressDays, 0)}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-500">
            <h3 className="text-gray-400 mb-2 flex items-center">
              <FiTarget className="mr-2" /> Avg. Progress
            </h3>
            <p className="text-3xl font-bold">
              {Math.round(
                skills.reduce((sum, skill) => sum + calculateProgress(skill), 0) /
                  skills.length
              )}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;