"use client"

import { Poppins } from "next/font/google";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Select from 'react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import "leaflet/dist/leaflet.css";
import ReactDOMServer from 'react-dom/server';
import { HiLocationMarker } from "react-icons/hi";


const poppins = Poppins({
  display: 'swap',
  fallback: ['Arial', 'open-sans'],
  preload: true,
  style: ['normal', 'italic'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ['latin', 'latin-ext'],
});

const skillDemandOverTime = [
  { month: 'Jan', Python: 90, JavaScript: 80, Figma: 50, React: 95 },
  { month: 'Feb', Python: 105, JavaScript: 95, Figma: 60, React: 110 },
  { month: 'Mar', Python: 120, JavaScript: 100, Figma: 70, React: 120 },
  { month: 'Apr', Python: 135, JavaScript: 115, Figma: 80, React: 135 },
  { month: 'May', Python: 140, JavaScript: 125, Figma: 85, React: 145 },
  { month: 'Jun', Python: 155, JavaScript: 140, Figma: 90, React: 160 },
  { month: 'Jul', Python: 170, JavaScript: 150, Figma: 110, React: 170 },
  { month: 'Aug', Python: 175, JavaScript: 160, Figma: 115, React: 180 },
  { month: 'Sep', Python: 165, JavaScript: 145, Figma: 120, React: 190 },
  { month: 'Oct', Python: 180, JavaScript: 160, Figma: 130, React: 200 },
  { month: 'Nov', Python: 195, JavaScript: 170, Figma: 135, React: 210 },
  { month: 'Dec', Python: 210, JavaScript: 185, Figma: 145, React: 220 },
  { month: 'Jan', Python: 220, JavaScript: 190, Figma: 150, React: 230 },
  { month: 'Feb', Python: 235, JavaScript: 210, Figma: 160, React: 240 },
  { month: 'Mar', Python: 260, JavaScript: 230, Figma: 170, React: 260 },
  { month: 'Apr', Python: 275, JavaScript: 250, Figma: 190, React: 270 },
  { month: 'May', Python: 280, JavaScript: 260, Figma: 200, React: 280 },
  { month: 'Jun', Python: 295, JavaScript: 270, Figma: 210, React: 300 },
  { month: 'Jul', Python: 310, JavaScript: 290, Figma: 220, React: 310 },
  { month: 'Aug', Python: 320, JavaScript: 300, Figma: 230, React: 320 },
  { month: 'Sep', Python: 330, JavaScript: 320, Figma: 240, React: 330 },
  { month: 'Oct', Python: 340, JavaScript: 330, Figma: 250, React: 340 },
  { month: 'Nov', Python: 355, JavaScript: 350, Figma: 260, React: 350 },
  { month: 'Dec', Python: 370, JavaScript: 360, Figma: 275, React: 370 }
];

const skillDemandByLocation: SkillLocationData[] = [
  {
    skill: 'Python',
    demandByLocation: [
      { location: 'USA', demand: 500, coords: [37.0902, -95.7129] },
      { location: 'India', demand: 400, coords: [20.5937, 78.9629] },
      { location: 'Germany', demand: 300, coords: [51.1657, 10.4515] },
      { location: 'UK', demand: 250, coords: [55.3781, -3.4360] },
      { location: 'Australia', demand: 150, coords: [-25.2744, 133.7751] },
    ],
  },
  {
    skill: 'JavaScript',
    demandByLocation: [
      { location: 'USA', demand: 600, coords: [37.0902, -95.7129] },
      { location: 'India', demand: 500, coords: [20.5937, 78.9629] },
      { location: 'Germany', demand: 400, coords: [51.1657, 10.4515] },
      { location: 'UK', demand: 350, coords: [55.3781, -3.4360] },
      { location: 'Australia', demand: 200, coords: [-25.2744, 133.7751] },
    ],
  },
  {
    skill: 'Figma',
    demandByLocation: [
      { location: 'USA', demand: 250, coords: [37.0902, -95.7129] },
      { location: 'India', demand: 180, coords: [20.5937, 78.9629] },
      { location: 'Germany', demand: 130, coords: [51.1657, 10.4515] },
      { location: 'UK', demand: 150, coords: [55.3781, -3.4360] },
      { location: 'Australia', demand: 80, coords: [-25.2744, 133.7751] },
    ],
  },
  {
    skill: 'React',
    demandByLocation: [
      { location: 'USA', demand: 700, coords: [37.0902, -95.7129] },
      { location: 'India', demand: 600, coords: [20.5937, 78.9629] },
      { location: 'Germany', demand: 450, coords: [51.1657, 10.4515] },
      { location: 'UK', demand: 400, coords: [55.3781, -3.4360] },
      { location: 'Australia', demand: 250, coords: [-25.2744, 133.7751] },
    ],
  },
];


const relatedSkillsWithDemand = [
  {
    skill: 'Python',
    relatedSkills: [
      { skill: 'Data Science', demand: 450 },
      { skill: 'Machine Learning', demand: 500 },
      { skill: 'Web Development', demand: 400 },
      { skill: 'DevOps', demand: 350 },
      { skill: 'Automation', demand: 300 }
    ]
  },
  {
    skill: 'JavaScript',
    relatedSkills: [
      { skill: 'Front-End Development', demand: 600 },
      { skill: 'React', demand: 650 },
      { skill: 'Node.js', demand: 550 },
      { skill: 'Vue.js', demand: 400 },
      { skill: 'Angular', demand: 450 }
    ]
  },
  {
    skill: 'Figma',
    relatedSkills: [
      { skill: 'UI/UX Design', demand: 300 },
      { skill: 'Web Design', demand: 250 },
      { skill: 'Illustration', demand: 180 },
      { skill: 'Prototyping', demand: 200 },
      { skill: 'Interaction Design', demand: 150 }
    ]
  },
  {
    skill: 'React',
    relatedSkills: [
      { skill: 'Front-End Development', demand: 650 },
      { skill: 'JavaScript', demand: 700 },
      { skill: 'Node.js', demand: 450 },
      { skill: 'TypeScript', demand: 400 },
      { skill: 'Redux', demand: 300 }
    ]
  }
];


const SkillDemandOverTimeChart: React.FC<{ data?: any }> = ({ data = skillDemandOverTime }) => {

  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const skillKeys = Object.keys(data[0]).filter((key) => key !== 'month');
  const handleLegendClick = (e: any) => {
  setActiveSkill((prev) => (prev === e.dataKey ? null : e.dataKey));
  };

  return (
    <div className="h-full">
      <h2 className="text-[#C8DE67] text-2xl md:text-3xl font-bold mb-6 tracking-tight">
        📈 Emerging Skills Over Time
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid stroke="#2F2F40" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#CCCCCC" />
          <YAxis stroke="#CCCCCC" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#2B2B3D',
              border: 'none',
              borderRadius: 8,
              color: '#fff'
            }}
            labelStyle={{ color: '#C8DE67' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{
              color: '#ccc',
              paddingTop: 10
            }}
            onClick={handleLegendClick}
          />
          {(activeSkill ? [activeSkill] : skillKeys).map((skill) => (
            <Line
              key={skill}
              type="monotone"
              dataKey={skill}
              stroke={getColorForSkill(skill)}
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const getColorForSkill = (skill: string) => {
  switch (skill) {
    case 'Python':
      return '#FF6F61';
    case 'JavaScript':
      return '#4A90E2';
    case 'React':
      return '#00C9A7';
    case 'Figma':
      return '#C8DE67';
    default:
      return '#888888';
  }
};


type SkillLocationData = {
  skill: string;
  demandByLocation: {
    location: string;
    demand: number;
    coords: [number, number]; // [latitude, longitude]
  }[];
};

type Props = {
  data: SkillLocationData[];
};


const SkillDemandMap: React.FC<Props> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);
  const [L, setLeaflet] = useState<any>(null);
  const [icon, setIcon] = useState<any>(null);

  // Dynamically import the React-Leaflet components
  const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
  const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
  const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
  const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });  
  useEffect(() => {     
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    setIsClient(true);

    // Dynamically import Leaflet to prevent SSR window error
    import('leaflet').then((leaflet) => {
      setLeaflet(leaflet);

      const customIcon = leaflet.divIcon({
        html: ReactDOMServer.renderToString(
          <div className="text-[#bd0909] text-3xl drop-shadow-lg relative">
            <div className="absolute w-4 h-4 right-4 top-3 bg-white -z-1">
            </div>
            <HiLocationMarker size={50}/>
          </div>
        ),
        className: '',
        iconSize: [50, 50],
        iconAnchor: [25, 35],
        popupAnchor: [0, -30],
      });

      setIcon(customIcon);
    });
  }, []);
  
  if (!isClient) return null;
  return (
    <div>
      <style>
        {`
          .leaflet-popup-tip{
            background:#2f2f48f0;
          }
          .leaflet-popup-content-wrapper{
            background-color:#2f2f48f0;
          }
          .leaflet-popup-content{
            margin: 0;
          }
          .leaflet-container a.leaflet-popup-close-button{
            color:#fff;
          }
          .leaflet-container a.leaflet-popup-close-button:hover{
            color:#fff;
          }
        `}
      </style>
      <h2 className="text-[#C8DE67] text-2xl md:text-3xl font-bold mb-6 tracking-tight">
        🌍 Skill Demand by Location
      </h2>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {data.map(({ skill, demandByLocation }) =>
          demandByLocation.map(({ location, demand, coords }) => (
            <Marker key={`${skill}-${location}`} position={coords} icon={icon}>
              <Popup>
                <div className="text-white p-3 rounded-xl shadow-md text-sm leading-relaxed">
                  <div className="font-semibold text-[#C8DE67] mb-1">{skill}</div>
                  <div className="text-gray-300">
                    <span className="font-medium text-white">Location:</span> {location}
                  </div>
                  <div className="text-gray-300">
                    <span className="font-medium text-white">Demand:</span> {demand}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
};

interface DropdownProps {
  role?: string
  setRole: (role: string) => void;
}

const roles = [
  { value: "Frontend Developer", label: "Frontend Developer" },
  { value: "Backend Developer", label: "Backend Developer" },
  { value: "Full Stack Developer", label: "Full Stack Developer" },
  { value: "UI/UX Designer", label: "UI/UX Designer" },
  { value: "Data Scientist", label: "Data Scientist" },
];

const Dropdown: React.FC<DropdownProps> = ({ role, setRole }) => {
  return (
    <div className="w-full md:w-64">
      <Select
        inputId="role-select"
        options={roles}
        onChange={(selectedOption) => setRole(selectedOption?.value || "")}
        placeholder="Choose a role"
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#1E1E2F",
            borderColor: "#4B5563",
            color: "#fff",
            borderRadius: 8,
            padding: 2,
            cursor:"pointer",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#fff",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#2F2F48",
            color: "#fff",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#4F46E5" : "#2F2F48",
            color: "#fff",
            cursor: "pointer",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9CA3AF",
          }),
        }}
      />
    </div>
  );
};

interface ExperienceLevelToggleProps {
  level: string;
  setLevel: (value: string) => void;
}

const ExperienceLevelToggle: React.FC<ExperienceLevelToggleProps> = ({ level, setLevel }) => {
  return (
    <div className="w-full md:w-auto">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Experience Level
      </label>
      <ToggleGroup.Root
        type="single"
        value={level}
        onValueChange={(val) => val && setLevel(val)}
        className="inline-flex bg-[#1E1E2F] rounded-lg border border-gray-600 overflow-hidden"
      >
        {['Junior', 'Mid', 'Senior'].map((option) => (
          <ToggleGroup.Item
            key={option}
            value={option}
            className="px-4 py-2 text-sm text-white cursor-pointer font-medium data-[state=on]:bg-[#6366F1] data-[state=on]:text-white hover:bg-[#3b3b52] focus:outline-none transition"
          >
            {option}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};

const COLORS = [
  '#FF6F61',
  '#4A90E2',
  '#C8DE67',
  '#00C9A7',
  '#FFB6C1',
  '#FF7F50',
  '#6A5ACD',
];

interface Skill {
  skill: string;
  percentage: number;
}

interface RoleSkillsData {
  [role: string]: Skill[];
}

const roleSkillsData: RoleSkillsData = {
  "Frontend Developer": [
    { skill: "JavaScript", percentage: 25 },
    { skill: "React", percentage: 20 },
    { skill: "CSS", percentage: 15 },
    { skill: "HTML", percentage: 10 },
    { skill: "TypeScript", percentage: 5 },
  ],
  "Backend Developer": [
    { skill: "Node.js", percentage: 30 },
    { skill: "Java", percentage: 20 },
    { skill: "SQL", percentage: 15 },
    { skill: "RESTful APIs", percentage: 10 },
    { skill: "Docker", percentage: 5 },
  ],
  "Full Stack Developer": [
    { skill: "JavaScript", percentage: 20 },
    { skill: "React", percentage: 15 },
    { skill: "Node.js", percentage: 15 },
    { skill: "CSS", percentage: 10 },
    { skill: "MongoDB", percentage: 10 },
  ],
  "UI/UX Designer": [
    { skill: "Figma", percentage: 30 },
    { skill: "Sketch", percentage: 25 },
    { skill: "Wireframing", percentage: 15 },
    { skill: "User Research", percentage: 10 },
    { skill: "Prototyping", percentage: 10 },
  ],
  "Data Scientist": [
    { skill: "Python", percentage: 30 },
    { skill: "Machine Learning", percentage: 20 },
    { skill: "SQL", percentage: 15 },
    { skill: "Data Visualization", percentage: 10 },
    { skill: "Deep Learning", percentage: 10 },
  ],
};

interface PieChartComponentProps {
  role: string;
  setRole: (role: string) => void;
}
const PieChartComponent: React.FC<PieChartComponentProps> = ({role, setRole}) => {

  // Handler for role selection change
  const handleRoleChange = (selectedOption: any) => {
    setRole(selectedOption.value);
  };

  // Get skills data based on the selected role
  const skillsData = roleSkillsData[role];

  return (
    <div className="w-full p-6 bg-[#2f2f48] rounded-2xl shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-8 text-center">Commonly Required Skills</h2>      

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={skillsData}
            dataKey="percentage"
            nameKey="skill"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            label={({ percent, name }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {skillsData.map((entry, idx) => (
              <Cell key={entry.skill} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

interface SalaryData {
  range: string;
  count: number;
}

interface SalaryHistogramProps {
  experienceLevel: string;
}

const salaryDataByLevel: Record<SalaryHistogramProps["experienceLevel"], SalaryData[]> = {
  Junior: [
    { range: "$20k-$25k", count: 5 },
    { range: "$25k-$30k", count: 8 },
    { range: "$30k-$35k", count: 10 },
    { range: "$35k-$40k", count: 6 },
    { range: "$40k-$45k", count: 4 },
  ],
  Mid: [
    { range: "$45k-$55k", count: 4 },
    { range: "$55k-$65k", count: 8 },
    { range: "$65k-$75k", count: 9 },
    { range: "$75k-$85k", count: 6 },
    { range: "$85k-$95k", count: 3 },
  ],
  Senior: [
    { range: "$95k-$110k", count: 3 },
    { range: "$110k-$125k", count: 6 },
    { range: "$125k-$140k", count: 5 },
    { range: "$140k-$160k", count: 4 },
    { range: "$160k-$180k", count: 2 },
  ],
};


const SalaryHistogram:React.FC<SalaryHistogramProps> = ({ experienceLevel }) => {
  const data = salaryDataByLevel[experienceLevel];

  return (
    <div className="bg-[#1E1E2F] p-4 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold text-white mb-4">Salary Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid stroke="#2F2F40" strokeDasharray="3 3" />
          <XAxis dataKey="range" stroke="#CCCCCC" />
          <YAxis stroke="#CCCCCC" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#2B2B3D",
              border: "none",
              borderRadius: 8,
              color: "#fff",
            }}
            labelStyle={{ color: "#C8DE67" }}
            itemStyle={{ color: "#fff" }}
            cursor={{fill: '#2A2A3B'}}
          />
          <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Home() {
  const [role, setRole] = useState<string>('Frontend Developer');
  const [level, setLevel] = useState<string>('Mid');  
  return (
    <div id="root">
      <style>
        {`
          button{
            cursor:pointer;
          }
        `}
      </style>
      <div className={`min-h-dvh flex flex-col grow bg-[#1E1E2F] text-white ${poppins.className} [font-family:var(--font-poppins)]`}>
        <div className={`transition-all duration-300 ml-0`}
        >
          <header className="sticky top-0 z-50 bg-[#1E1E2F] shadow-md">
            <nav className="px-[40px]">
              <div className="relative flex w-full py-6">
                <div className="flex w-full items-center justify-between">
                  <h1 className="text-4xl font-extrabold tracking-tight cursor-pointer text-[#C2E812] ">JobMarket</h1>
                  <div className="hidden md:flex items-center space-x-6"></div>
                </div>
              </div>
            </nav>
          </header>


          <div id="main" className="flex flex-auto flex-col z-1 pb-20 transition-all duration-300 ease-in-out ltr:peer-[]:md:pl-[6.225em] rtl:peer-[]:md:pr-[6.225em]">
            <main className="flex shrink-0 grow flex-col px-[40px] pt-12 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-10 rounded-2xl shadow-2xl backdrop-blur-lg  p-10">
                {/* Text Content */}
                <div className="flex-1">
                  <h2 className="text-4xl md:text-3xl font-extrabold mb-6 text-[#c8de67]">Explore Job Market Trends</h2>
                  <p className="text-lg md:text-xl max-w-xl text-gray-200">
                    JobMarket provides real-time insights into hiring patterns, job availability, and industry demand.
                    Stay informed with dynamic data visualizations and understand where the opportunities lie.
                  </p>
                </div>
                <div className="flex-1">
                  <img
                    className="rounded-xl shadow-lg w-full max-h-[300px] object-cover"
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1080"
                    alt="Job Market Insight"
                  />
                </div>
              </div>

              <div className="flex w-full gap-6 justify-between my-16">
                <div className="w-1/2 bg-[#2f2f48] p-6 rounded-2xl shadow-md">
                  <SkillDemandOverTimeChart />
                </div>
                <div className="w-1/2 bg-[#2f2f48] p-6 rounded-2xl shadow-md">
                  <SkillDemandMap data={skillDemandByLocation} />
                </div>
              </div>
              <div className="mb-10 px-6 py-10 bg-[#2f2f48] rounded-2xl shadow-md text-white flex flex-col-reverse md:flex-row items-center gap-8">
                <div className="flex-1 text-center pl-12 md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">CV Analyser</h2>
                  <p className="text-gray-300 mb-5 max-w-md mx-auto md:mx-0">
                    Use AI to evaluate your CV for top roles across industries. Improve your visibility with personalized recommendations.
                  </p>
                  <button className="bg-[#C8DE67] hover:bg-[#B2CC5B] text-[#1E1E2F] font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                    onClick={()=>{alert('Upload your CV')}}
                  >
                    Analyse Now
                  </button>
                </div>
                <div className="flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?q=80&w=512"
                    alt="CV Analysis"
                    className="w-full max-w-sm mx-auto rounded-xl"
                  />
                </div>
              </div>
              <div className="rounded-2xl mb-10 bg-[#2f2f48] p-6 text-white">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-2">Job Role Breakdown</h2>
                  <p className="text-gray-300 text-sm">
                    Explore the skill requirements and salary trends for different job roles and experience levels.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-4 items-center my-4">
                  <Dropdown role={role} setRole={setRole} />
                  <ExperienceLevelToggle level={level} setLevel={setLevel} />
                </div>

                <div className="flex gap-6">
                  <div className="w-1/2">                    
                    <PieChartComponent role={role} setRole={setRole} />
                  </div>
                  <div className="w-1/2">
                    <SalaryHistogram experienceLevel={level} />
                  </div>
                </div>
              </div>

              {/* <div className="my-10">
                Job Role Breakdown
              </div>
              <div className="my-10">
                Reports & Comparisons
              </div> */}
            </main>
          </div>

        </div>
        {/* <footer className="flex justify-center">
          Footer
        </footer> */}
      </div>
    </div>
  );
}
