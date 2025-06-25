"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { FiPlusCircle, FiCalendar, FiFlag, FiCheckCircle, FiArrowRight } from "react-icons/fi"
import { FORM_ERROR, SkillForm } from "./SkillForm"
import { CreateSkillSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createSkill from "../mutations/createSkill"
import LabeledTextField from "../../components/LabeledTextField"

dayjs.extend(customParseFormat)

export function New__ModelName() {
  const [createSkillMutation] = useMutation(createSkill)
  const router = useRouter()

  const [amount, setAmount] = useState<number>(0)
  const [unit, setUnit] = useState<string>("days")
  const [startDate, setStartDate] = useState(() => dayjs().format("YYYY-MM-DD"))
  const [targetDate, setTargetDate] = useState(() => dayjs().format("YYYY-MM-DD"))

  const convertToDays = (amount: number, unit: string) => {
    switch (unit) {
      case "days":
        return amount
      case "weeks":
        return amount * 7
      case "months":
        return amount * 30
      case "years":
        return amount * 365
      default:
        return amount
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
      <div className="bg-gray-800 rounded-xl border-l-4 border-green-500 shadow-2xl overflow-hidden">
        <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
          <h2 className="text-2xl font-bold flex items-center">
            <FiPlusCircle className="mr-2 text-green-400" />
            Add New Skill
          </h2>
          <p className="text-gray-400 mt-1">Track your learning journey with precision</p>
        </div>

        <SkillForm
          schema={CreateSkillSchema}
          initialValues={{
            skillName: "",
            startDate: dayjs().format("YYYY-MM-DD"),
            targetDate: dayjs().add(7, "day").format("YYYY-MM-DD"),
            totalDays: 0,
            isDone: false,
          }}
          onSubmit={async (values) => {
            try {
              const parsedStart = dayjs(values.startDate, "YYYY-MM-DD")
              if (!parsedStart.isValid()) throw new Error("Invalid start date")

              const totalDays = convertToDays(amount, unit)
              const calculatedTarget = parsedStart.add(totalDays, "day").format("YYYY-MM-DD")

              // values.startDate = startDate
              values.totalDays = totalDays
              values.targetDate = calculatedTarget

              const skill = await createSkillMutation(values)
              router.push(`/skills/${skill.id}`)
            } catch (error: any) {
              console.error(error)
              return { [FORM_ERROR]: error.toString() }
            }
          }}
        >
          <div className="space-y-6 p-6">
            <LabeledTextField
              name="skillName"
              label="Skill Name"
              type="text"
              labelClass="block text-sm font-medium text-gray-300 mb-2"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-gray-100"
              placeholder="e.g. Web dev, AI Engineer, UX Design"
              leftIcon={<FiPlusCircle className="text-gray-400" />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LabeledTextField
                name="startDate"
                label="Start Date"
                type="date"
                labelClass="block text-sm font-medium text-gray-300 mb-2"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-gray-100"
                leftIcon={<FiCalendar className="text-gray-400" />}
                // value={startDate}
                // onChange={(e) => setStartDate(e.target.value)}
              />

              <LabeledTextField
                name="targetDate"
                label="Target Date"
                type="date"
                readOnly
                value={targetDate}
                labelClass="block text-sm font-medium text-gray-300 mb-2"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-gray-100"
                leftIcon={<FiFlag className="text-gray-400" />}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <LabeledTextField
                name="totalDays"
                label="Duration Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100"
                labelClass="block text-sm font-medium text-gray-300 mb-2"
                placeholder="e.g. 1, 2, 30"
              />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100"
                >
                  <option value="days">Hari</option>
                  <option value="weeks">Minggu</option>
                  <option value="months">Bulan</option>
                  <option value="years">Tahun</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <input
                id="isDone"
                name="isDone"
                type="checkbox"
                className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-green-500"
              />
              <label htmlFor="isDone" className="text-sm font-medium text-gray-300 flex items-center">
                <FiCheckCircle className="mr-2" /> Mark as already mastered
              </label>
            </div>
          </div>

          <div className="bg-gray-700 px-6 py-4 border-t border-gray-600 flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2"
            >
              Create Skill <FiArrowRight />
            </button>
          </div>
        </SkillForm>
      </div>
    </div>
  )
}
