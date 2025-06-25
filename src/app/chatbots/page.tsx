"use client"
import ReactMarkdown from 'react-markdown';


import { useMutation, useQuery } from "@blitzjs/rpc"
import getCurrentUser from "../users/queries/getCurrentUserSkill"
import { FiPlusCircle } from "react-icons/fi"
import { LuBot } from "react-icons/lu"
import { useState } from "react"
import createChatHistory from "../chat-histories/mutations/createChatHistory"
import SideBar from "../dashboards/components/SideBar"
import getChatHistories from "../chat-histories/queries/getChatHistory"


export default function Pages() {
  const [user] = useQuery(getCurrentUser, null)
  const [createChatHistoryMutation] = useMutation(createChatHistory)
  const [sidebarOpen,setSidebarOpen] = useState(true)
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null)
  const [chatResult, setChatResult] = useState("")
  const [loading, setLoading] = useState(false)
  
  const selectedSkill = user?.Skill.find((s) => s.id === selectedSkillId)
  const [chatHistory = []] = useQuery(
  getChatHistories,
  { skillId: selectedSkill?.id ?? 0 },
  {
    enabled: !!selectedSkill?.id,
  }
)

  const handleGenerate = async () => {
    if (!selectedSkill) return

    setLoading(true)

    const prompt = `Buatkan saya roadmap pembelajaran untuk ${selectedSkill.skillName} selama ${selectedSkill.totalDays} hari, dimulai dari dasar hingga tingkat profesional. Sertakan pembagian per level (pemula, menengah, lanjutan), sumber belajar yang kredibel, proyek nyata yang bisa dikerjakan tiap tahap, dan tips belajar efektif untuk memperdalam materi. Saya ingin belajar secara mandiri namun terstruktur dan terarah.`
    const res = await fetch(
      `https://api.siputzx.my.id/api/ai/teachanything?content=${encodeURIComponent(prompt)}`
    )

    const data = await res.json()
    let values = {
      skillId:selectedSkill.id,
      response:data?.data,
      type:'SKILL',
      message:prompt
    }

    setChatResult(data?.data || "No response")
    setLoading(false)
    const createChat = await createChatHistoryMutation(values)
  }

  return (
    <div className="flex overflow-hidden h-screen text-white ">
        {/* {console.log(chatHistory)} */}

       
    <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
    <div className="flex-1 overflow-y-auto p-10">
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 mx-10 my-10">
        {/* Header */}
        <div className="bg-gray-700 px-6 py-5 border-b border-gray-600">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiPlusCircle className="text-green-400" />
            Learn With ChatBots
            <LuBot className="text-green-300" />
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Track your learning journey with precision and AI guidance.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Dropdown */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Pilih skill yang ingin dipelajari:
            </label>
            <select
              onChange={(e) => setSelectedSkillId(Number(e.target.value))}
              value={selectedSkillId ?? ""}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>
                Select a skill
              </option>
              {user?.Skill.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.skillName}
                </option>
              ))}
            </select>
          </div>
        
          {/* Target Date */}
          {selectedSkill && (
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Target selesai belajar:
              </label>
              <input
                type="text"
                value={`${selectedSkill.totalDays} hari`}
                disabled
                className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-lg px-4 py-3"
              />
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!selectedSkill || loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            {loading ? "Generating..." : "Generate Answer"}
          </button>

          {/* Chat Output */}
          {chatResult && (
            <div className="prose prose-invert max-w-none bg-gray-900 text-gray-200 mt-4 p-6 rounded-lg border border-gray-700">
    <ReactMarkdown>{chatResult}</ReactMarkdown>
  </div>
          )}
          {chatHistory?.map((c) => (
  <div key={c.id} className="mb-2">
    <p className="text-green-400 font-semibold">AI:</p>
    <p className='prose prose-invert'>

    <ReactMarkdown>{c.response}</ReactMarkdown>
  

    </p>
  </div>
)) || null}

        </div>
      </div>
    </div>
    </div>
  )
}
