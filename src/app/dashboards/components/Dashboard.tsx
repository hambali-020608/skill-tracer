"use client";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { FiHome, FiTrendingUp, FiTarget, FiBarChart2, FiSettings, FiLogOut, FiMenu, FiX, FiAward, FiCalendar, FiClock } from 'react-icons/fi';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Link from "next/link";
import { useRouter } from "next/navigation";
// import deleteDashboard from "../mutations/deleteDashboard";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// import getDashboard from "../queries/getDashboard";

export const Dashboard = ({Skills}:any) => {
  const calculateProgress = (skill: any) => {
    return Math.floor((skill.Progress.length / skill.totalDays) * 100);
  };

  
  const router = useRouter();
  const skills = [
      { name: 'JavaScript', progress: 75, hours: 42, lastPracticed: '2 days ago' },
      { name: 'React', progress: 68, hours: 36, lastPracticed: '1 day ago' },
      { name: 'UI/UX Design', progress: 52, hours: 28, lastPracticed: '3 days ago' },
      { name: 'Node.js', progress: 45, hours: 22, lastPracticed: '5 days ago' },
    ];
  
    const totalSkills = Skills.length;
    const totalHours = skills.reduce((sum, skill) => sum + skill.hours, 0);
    const averageProgress = skills.reduce((sum, skill) => sum + skill.progress, 0) / totalSkills;
  
    // Chart data
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'];
    const activityData = [8, 5, 7, 6, 4]; // hours per week
    const progressData = [20, 35, 50, 65, 72]; // cumulative progress
  
    const activityChartData = {
      labels: weeks,
      datasets: [
        {
          label: 'Weekly Activity (hours)',
          data: activityData,
          backgroundColor: '#10B981',
          borderColor: '#10B981',
          tension: 0.3,
          fill: true,
        },
      ],
    };
  
    const progressChartData = {
      labels: weeks,
      datasets: [
        {
          label: 'Total Progress (%)',
          data: progressData,
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: '#10B981',
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };
  
  return (
    <>
      <main className="flex-1 overflow-y-auto p-6 bg-gray-900/50">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
                  <p className="text-gray-400">Track your learning progress and activity</p>
                </div>
      
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-400">
                    <h3 className="text-gray-400 mb-2">Skills Learning</h3>
                    <p className="text-3xl font-bold">{totalSkills}</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-400">
                    <h3 className="text-gray-400 mb-2">Total Hours</h3>
                    <p className="text-3xl font-bold">{totalHours}</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-green-400">
                    <h3 className="text-gray-400 mb-2">Avg. Progress</h3>
                    <p className="text-3xl font-bold">{averageProgress.toFixed(1)}%</p>
                  </div>
                </div>
      
                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <FiTrendingUp className="mr-2 text-green-400" /> Weekly Activity
                    </h3>
                    <div className="h-64">
                      <Bar 
                        data={activityChartData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                              labels: {
                                color: '#9CA3AF'
                              }
                            },
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              grid: {
                                color: 'rgba(55, 65, 81, 0.5)'
                              },
                              ticks: {
                                color: '#9CA3AF'
                              }
                            },
                            x: {
                              grid: {
                                color: 'rgba(55, 65, 81, 0.5)'
                              },
                              ticks: {
                                color: '#9CA3AF'
                              }
                            }
                          }
                        }} 
                      />
                    </div>
                  </div>
      
                  <div className="bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <FiBarChart2 className="mr-2 text-green-400" /> Progress Trend
                    </h3>
                    <div className="h-64">
                      <Line 
                        data={progressChartData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                              labels: {
                                color: '#9CA3AF'
                              }
                            },
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 100,
                              grid: {
                                color: 'rgba(55, 65, 81, 0.5)'
                              },
                              ticks: {
                                color: '#9CA3AF'
                              }
                            },
                            x: {
                              grid: {
                                color: 'rgba(55, 65, 81, 0.5)'
                              },
                              ticks: {
                                color: '#9CA3AF'
                              }
                            }
                          }
                        }} 
                      />
                    </div>
                  </div>
                </div>
      
                {/* Skills Progress */}
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-6 flex items-center">
                    <FiAward className="mr-2 text-green-400" /> Your Skills Progress
                  </h3>
                  <div className="space-y-6">
                    {Skills.map((skill, index) => (

                      <div key={index}>

                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.skillName}</span>
                          <span className="text-green-400">{calculateProgress(skill)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-green-500 h-2.5 rounded-full" 
                            style={{ width: `${calculateProgress(skill)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-gray-400">
                          <span className="flex items-center">
                            <FiClock className="mr-1" /> {skill.totalDays} Days
                          </span>
                          {/* <span>Last practiced: {skill.lastPracticed}</span> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </main>
    </>
  );
};
