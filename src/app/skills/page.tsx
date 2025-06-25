"use client"
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useState } from "react";
import { FiCheck, FiCalendar, FiTarget, FiClock, FiEdit2, FiTrash2, FiChevronUp, FiPlusCircle, FiArrowRight } from "react-icons/fi";
import getCurrentUserSkill from "../users/queries/getCurrentUserSkill";
import { New__ModelName } from "./components/NewSkill";
import deleteSkill from "./mutations/deleteSkill";
import { useRouter } from "next/navigation";
import progress from "../mutations/progress";
import { SkillForm } from "./components/SkillForm";
import deleteProgress from "../mutations/deleteProgress";
import LabeledTextField from "../components/LabeledTextField";
import SideBar from "../dashboards/components/SideBar";



const Page = () => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDayClick = (day: Date, skillId: number) => {
  setSelectedDay(day);
  setSelectedSkillId(skillId);
  setIsModalOpen(true);
};

  const [user] = useQuery(getCurrentUserSkill,null)
  const [sidebarOpen,setSidebarOpen] = useState(true)
  const [createProgressMutation] = useMutation(progress)
  const router = useRouter();
  const [deleteProgressMutation] = useMutation(deleteProgress)
  const [deleteSkillMutation] = useMutation(deleteSkill);
  // Generate checkpoints between start and end date
   const [expandedSkillIds, setExpandedSkillIds] = useState<string[]>([]);
  const isExpanded = (id: number) => expandedSkillIds.includes(id);

  const toggleExpand = (skillId: string) => {
    setExpandedSkillIds((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };


 const getDays = (startDate:any,targetDays:any)=>{
  return Array.from({length:targetDays},(_,i)=>{
const date = new Date(startDate)
  date.setDate(date.getDate() + i)
  return date
  })

 }

  const checkPointSubmit = async (values:any) => {
    try{
      const progress = await createProgressMutation(values)
      
      
    }catch{

    }
    
  };

  // Calculate progress percentage
  const calculateProgress = (skill: any) => {
    return Math.floor((skill.Progress.length / skill.totalDays) * 100);
  };

  return (
    <div className="flex gap-5 h-screen bg-gray-900 text-gray-100 overflow-hidden ">
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

      <div  className="flex-1 overflow-y-auto">
      {isModalOpen && selectedDay && selectedSkillId && (
  <dialog open className="modal">
    <div className="max-w-2xl mx-auto p-6 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
      <div className="bg-gray-800 rounded-xl border-l-4 border-green-500 shadow-2xl overflow-hidden">
        <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
          <SkillForm
            initialValues={{
              log_date: selectedDay,
              skillId: selectedSkillId,
              note: '',
            }}
            onSubmit={(values) => {
              checkPointSubmit(values)
              setIsModalOpen(false)
            }}
          >
            <LabeledTextField
              name="note"
              label="Catatan"
              type="text"
              labelClass="block text-sm font-medium text-gray-300 mb-2"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-gray-100"
              placeholder="e.g. Web dev, AI Engineer, UX Design"
              leftIcon={<FiPlusCircle className="text-gray-400" />}
            />

            <div className="bg-gray-700 px-6 py-4 border-t border-gray-600 flex justify-end">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2"
              >
                Submit Progress <FiArrowRight />
              </button>
            </div>
          </SkillForm>
          <div className="modal-action">
            <button className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  </dialog>
)}

      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Learning Goals</h1>
          <p className="text-gray-400">Track your skill development progress</p>
          <label htmlFor="my_modal_6" className="btn btn-success text-black mt-5">Add New Skill</label>

{/* <!-- Put this part before </body> tag --> */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
    <New__ModelName/>
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn btn-error">Close!</label>
  
  </div>
</div>
  
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
                {user?.Skill.map((skill) => (
                  <tr key={skill.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-3"></div>
                        {skill.skillName}
                        
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

                    {/* {console.log(skill)} */}
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
    {getDays(skill.startDate, skill.totalDays)
      .slice(0, isExpanded(skill.id) ? undefined : 7)
      .map((day, idx) => {
        const isChecked = skill.Progress.some(
          (cp) => new Date(cp.log_date).toDateString() === day.toDateString()
        );

        const matchedProgress = skill.Progress.find(
      (cp) => new Date(cp.log_date).toDateString() === day.toDateString()
    );


        return (
          <div
            key={idx}
            className={`w-8 h-8 rounded-md flex items-center justify-center border transition-colors ${
              isChecked
                ? "bg-green-500/20 border-green-500 text-green-400"
                : "bg-gray-700 border-gray-600 hover:bg-gray-600"
            }`}
            title={day.toLocaleDateString()}
          >
            {isChecked ? (
              <FiCheck    onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteProgressMutation({ id: matchedProgress.id });
                router.refresh(); // Lebih baik reload daripada push ke halaman sama
              }
            }} />
            ) : (
              <>
              <span className="text-xs" onClick={() => handleDayClick(day, skill.id)}>{day.getDate()}</span>
         
</>
            )}
          </div>
        );
      })}

    {/* Expand/Collapse button */}
    {skill.totalDays > 7 && (
      <button
        onClick={() => toggleExpand(skill.id)}
        className="w-8 h-8 rounded-md flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition-colors"
        title={isExpanded(skill.id) ? "Sembunyikan" : "Tampilkan semua"}
      >
        {isExpanded(skill.id) ? (
          <FiChevronUp className="text-green-400" />
        ) : (
          <span className="text-xs text-gray-300">+{skill.totalDays - 7}</span>
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
                        <button className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-red-400 transition-colors" onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteSkillMutation({ id: skill.id });
              router.push("/skills");
            }
          }}>
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
            <p className="text-3xl font-bold">{user?.Skill.length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-500">
            <h3 className="text-gray-400 mb-2 flex items-center">
              <FiCheck className="mr-2" /> Completed Days
            </h3>
            <p className="text-3xl font-bold">
              {user?.Skill.reduce((sum, skill) => sum + skill.Progress.length, 0)}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-500">
            <h3 className="text-gray-400 mb-2 flex items-center">
              <FiTarget className="mr-2" /> Avg. Progress
            </h3>
            {/* <p className="text-3xl font-bold">
              {Math.round(
                user?.Skill.reduce((sum, skill) => sum + calculateProgress(skill), 0) /
                  user?.Skill.length
              )}
              %
            </p> */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Page;