"use client";
import { FORM_ERROR, SkillForm } from "./SkillForm";
import { CreateSkillSchema } from "../schemas";
import { useMutation } from "@blitzjs/rpc";
import createSkill from "../mutations/createSkill";
import LabeledTextField from "../../components/LabeledTextField";
import { useRouter } from "next/navigation";
import { FiPlusCircle, FiCalendar, FiFlag, FiCheckCircle, FiArrowRight } from "react-icons/fi";

export function New__ModelName() {
  const [createSkillMutation] = useMutation(createSkill);
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gray-800 rounded-xl border-l-4 border-green-500 shadow-2xl overflow-hidden">
        {/* Form Header */}
        <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
          <h2 className="text-2xl font-bold flex items-center">
            <FiPlusCircle className="mr-2 text-green-400" />
            Add New Skill
          </h2>
          <p className="text-gray-400 mt-1">Track your learning journey with precision</p>
        </div>

        {/* Form Content */}
        <SkillForm
          submitText={
            <div className="flex items-center justify-center gap-2">
              Create Skill <FiArrowRight />
            </div>
          }
          schema={CreateSkillSchema}
          initialValues={{
            skillName: '',
            startDate: '',
            targetDate: '',
            totalDays: '',
            isDone: false
          }}
          onSubmit={async (values) => {
            try {
              const skill = await createSkillMutation(values);
              router.push(`/skills/${skill.id}`);
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        >
          <div className="space-y-6 p-6">
            {/* Skill Name Field */}
            <LabeledTextField
              name="skillName"
              label="Skill Name"
              type="text"
              labelClass="block text-sm font-medium text-gray-300 mb-2"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g. Web dev, AI Engineer, UX Design"
              leftIcon={<FiPlusCircle className="text-gray-400" />}
            />

            {/* Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <LabeledTextField
                name="startDate"
                label="Start Date"
                type="date"
                labelClass="block text-sm font-medium text-gray-300 mb-2"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                leftIcon={<FiCalendar className="text-gray-400" />}
              />

              {/* Target Date */}
              <LabeledTextField
                name="targetDate"
                label="Target Date"
                type="date"
                labelClass="block text-sm font-medium text-gray-300 mb-2"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                leftIcon={<FiFlag className="text-gray-400" />}
              />
            </div>

            {/* Total Days */}
            <LabeledTextField
              name="totalDays"
              label="Estimated Days to Master"
              type="number"
              labelClass="block text-sm font-medium text-gray-300 mb-2"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g. 30, 60, 90"
            />

            {/* Completion Status */}
            <div className="flex items-center space-x-3 pt-2">
              <input
                id="isDone"
                name="isDone"
                type="checkbox"
                className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500"
              />
              <label htmlFor="isDone" className="text-sm font-medium text-gray-300 flex items-center">
                <FiCheckCircle className="mr-2" /> Mark as already mastered
              </label>
            </div>
          </div>

          {/* Form Footer */}
          <div className="bg-gray-700 px-6 py-4 border-t border-gray-600 flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Create Skill <FiArrowRight />
            </button>
          </div>
        </SkillForm>
      </div>
    </div>
  );
}