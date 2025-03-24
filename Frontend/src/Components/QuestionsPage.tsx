import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

interface Question {
  id: string;
  title: string;
  company: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  acceptance: number;
  frequency: number;
  url:string,
}

interface UserData {
  userName: String | null | undefined,
  email: String | null | undefined,
}

interface SolvedQuestion {
  id: string;
  difficulty: string;
}

const Skeleton = ({ className }: { className: string }) => (
  <div className={`bg-gray-700 animate-pulse ${className}`} />
);


const QuestionPage: React.FC = () => {
  const [totalSolved, setTotalSolved] = useState(0);
  const [easySolved, setEasySolved] = useState(0);
  const [mediumSolved, setMediumSolved] = useState(0);
  const [hardSolved, setHardSolved] = useState(0);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string | "All">(
    "All"
  );
  const [topicFilter, setTopicFilter] = useState<string | "All">("All");
  const [solvedQuestions, setSolvedQuestions] = useState<Map<string, string>>(
    new Map()
  );
  const [questionsData,setQuestionsData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>();
  const [itemPerPage, setItemPerPage] = useState<number> (10);
  const [currPage, setCurrPage] = useState<number> (1);
  const [totalPage, setTotalPage] = useState<number> (0);
  const [pageNumber, setPageNumber] = useState<number> (1);

  const startIndex = (currPage-1)*itemPerPage;

  // console.log(questionsData);
  
  const filteredQuestions = questionsData.filter(
    (q) =>
      (q?.title.toLowerCase().includes(search.toLowerCase()) ||
      q?.company.toLowerCase().includes(search.toLowerCase())) &&
      (difficultyFilter === "All" || q.difficulty === difficultyFilter) &&
      (topicFilter === "All" || q.topics.includes(topicFilter))
  );

  const visibleItems = filteredQuestions.slice(startIndex, startIndex+itemPerPage);

  const goToPage = (p : number) =>{
    if(p>=1 && p<=totalPage)
      setCurrPage(p);
  }
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setUserData({
        userName: user?.fullName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
      });
    }
  }, [user]);



  const totalQuestions = questionsData.length;

  const handleToggleSolve = async (id: string, difficulty: string) => {
    const newSolvedQuestions = new Map(solvedQuestions);
    if (newSolvedQuestions.has(id)) {
      newSolvedQuestions.delete(id);
      setTotalSolved(totalSolved - 1);
      if (difficulty === "Easy") setEasySolved(easySolved - 1);
      if (difficulty === "Medium") setMediumSolved(mediumSolved - 1);
      if (difficulty === "Hard") setHardSolved(hardSolved - 1);
    } else {
      newSolvedQuestions.set(id,difficulty);
      setTotalSolved(totalSolved + 1);
      if (difficulty === "Easy") setEasySolved(easySolved + 1);
      if (difficulty === "Medium") setMediumSolved(mediumSolved + 1);
      if (difficulty === "Hard") setHardSolved(hardSolved + 1);
    }
    setSolvedQuestions(newSolvedQuestions);
    await putData(newSolvedQuestions);
  };

  const totalEasy = questionsData.filter((q)=>(q.difficulty==='Easy')).length;
  const totalMedium = questionsData.filter((q)=>(q.difficulty==='Medium')).length;
  const totalHard = questionsData.filter((q)=>(q.difficulty==='Hard')).length;

  const url = "http://localhost:8080/allquestions";
  const url2 = "http://localhost:8080/userdetails";


  console.log(solvedQuestions)

  
  const fetchData = async () => {

    if(!userData){
      return;
    }
    try {
      const [response1, response2] = await Promise.all([
        axios.get(url),
        axios.get(url2, { params: { email: userData?.email } }) // Properly passing email as a query param
      ]);

      const mappedData = response1.data.map((q: any) => ({
        title: q.Title,
        company: q.Company,
        difficulty: q.Difficulty,
        topics: q.Topics.split(", "),
        acceptance: q["Acceptance %"],
        frequency: q["Frequency %"],
        url: q.URL,
        id: q.ID,
      }));

      setQuestionsData(mappedData);
      const {solved} = response2.data
      let easy=0;
      let med=0;
      let hard=0;

      setTotalPage(Math.ceil(mappedData.length/itemPerPage));

      solved.forEach((q: any) => { 
        if(q.difficulty=='Hard') hard++;
        else if(q.difficulty=='Medium') med++;
        else easy++;
      })

      setEasySolved(easySolved+easy);
      setHardSolved(hardSolved+hard);
      setMediumSolved(mediumSolved+med);
      setTotalSolved(totalSolved+easy+hard+med);
      

      console.log(solvedQuestions);
      setSolvedQuestions(new Map(solved.map((q:SolvedQuestion) => [q.id, q.difficulty])));
      // You can process response2.data if needed

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    setTotalPage(Math.ceil(filteredQuestions.length/itemPerPage));
    setCurrPage(1);
  }, [itemPerPage])

  const putData = async (newSolvedQuestions: any)=>{
    const objArr = Array.from(newSolvedQuestions, ([id, difficulty])=>({id, difficulty}));
    try{ 
      const response = await axios.post(
        url2,
        {
          userName: userData?.userName,
          email: userData?.email,
          solved: objArr,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    catch{
      console.log("Error");
    }
  }

  useEffect(()=>{
    fetchData();
  },[userData])

  const topicsArr = ["All","Array", "Hash Table", "Linked List", "Math", "Recursion", "String", "Sliding Window", "Trie", "Defth-First Search", "Breadth-First Search", "Matrix", "Union Find", "Graph", "Binary Search", "Divide and Conquer", "Two Pointers", "Dynamic Programming", "Greedy", "Sorting", "Backtracking", "Stack", "Heap", "Merge Sort", "Bit Manipulation", "Tree", "Binary Search Tree", "Queue", "Doubly-Linked List"];

  const getProgressBarColor = (label: string) => {
    if (label === "Easy") return "bg-green-500";
    if (label === "Medium") return "bg-yellow-600";
    if (label === "Hard") return "bg-red-500";
    return "bg-blue-500";
  };

  const stats = [
          { label: "Total Solved", value: totalSolved, total: totalQuestions },
          { label: "Easy", value: easySolved, total: totalEasy },
          { label: "Medium", value: mediumSolved, total: totalMedium },
          { label: "Hard", value: hardSolved, total: totalHard },
        ]
    
  return (
    <div className="bg-gray-900 min-h-screen px-8 py-10">
      <div className=" px-6 py-8  text-white border-1 border-gray-600 rounded-lg">
        <h1 className="text-3xl font-bold">Practice Questions</h1>
        <p className="text-gray-400">
          Browse through 8,487 LeetCode questions asked in technical interviews
        </p>

        <div className="grid grid-cols-4 gap-4 mt-6 mb-8">
          {stats.map((stat) => (
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              {loading ? (
                <Skeleton className="h-6 w-12 mx-auto mb-2" />
              ) : (
                <h2 className="text-2xl font-bold">{stat.value}</h2>
              )}

              {loading ? (
                <Skeleton className="h-4 w-24 mx-auto" />
              ) : (
                <p className="text-gray-400">
                  {stat.label} ({stat.total})
                </p>
              )}
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div
                  className={`${getProgressBarColor(
                    stat.label
                  )} h-2.5 rounded-full`}
                  style={{ width: `${(stat.value / stat.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {loading ? (
          <Skeleton className="h-96 w-full mt-6 rounded-lg" />
        ) : (
          <div>
            <div className="flex gap-4 mt-6">
              <input
                type="text"
                placeholder="Search questions..."
                className="px-4 py-2 w-1/3 bg-gray-700 text-white rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="px-2 py-2 bg-gray-700 text-white rounded-lg "
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <select
                className="px-2 py-2 bg-gray-700 text-white rounded-lg"
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
              >
                {topicsArr.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-1 border-gray-600 rounded-lg mt-6 ">
              <div>
                <table className="w-full text-left bg-gray-800 overflow-hidden rounded-t-lg">
                  <thead className="bg-gray-700 text-gray-300 ">
                    <tr>
                      <th className="p-3">Status</th>
                      <th className="p-3">Title</th>
                      <th className="p-3">Company</th>
                      <th className="p-3">Difficulty</th>
                      <th className="p-3">Topics</th>
                      <th className="p-3">Acceptance</th>
                      <th className="p-3">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleItems.map((q, index) => (
                      <tr key={index} className="border-b border-gray-600">
                        <td className="py-3 px-2">
                          <input
                            className="w-12 border-1 h-4 border-r-4"
                            type="checkbox"
                            checked={solvedQuestions.has(q.id)}
                            onChange={() =>
                              handleToggleSolve(q.id, q.difficulty)
                            }
                          />
                        </td>
                        <td className="p-3">{q.title}</td>
                        <td className="p-3">{q.company}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              q.difficulty === "Easy"
                                ? "bg-green-600"
                                : q.difficulty === "Medium"
                                ? "bg-yellow-600"
                                : "bg-red-600"
                            }`}
                          >
                            {q.difficulty}
                          </span>
                        </td>
                        <td className="p-3">{q.topics.join(", ")}</td>
                        <td className="p-3">{q.acceptance}</td>
                        <td className="p-3">{q.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="m-2 flex justify-around items-center">
                <div>
                  <label className="mx-3 font-semibold text-xl">
                    Items per page
                  </label>
                  <select
                    className="px-2 py-2 bg-gray-700 text-white rounded-lg "
                    value={itemPerPage}
                    onChange={(e) => setItemPerPage(Number(e.target.value))}
                  >
                    <option value={10}>10</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className=" flex justify-around items-center space-x-4">
                  <div>
                    <label className="mx-3 font-semibold text-xl">
                      Go to page
                    </label>
                    <input
                      type="number"
                      placeholder="1"
                      className="px-2 py-2 w-16 bg-gray-700 text-white rounded-lg"
                      onChange={(e) => setPageNumber(Number(e.target.value))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          goToPage(pageNumber);
                        }
                      }}
                    />
                  </div>

                  <div className="flex justify-between items-center space-x-3 ">
                    <button
                      className="p-2 m-2 border-1 rounded-lg w-24 hover:bg-gray-700"
                      onClick={() => goToPage(1)}
                    >
                      <h1>First</h1>
                    </button>

                    <button
                      className="p-2 m-2 border-1 rounded-lg w-24 hover:bg-gray-700"
                      onClick={() => goToPage(currPage - 1)}
                      disabled={currPage === 1}
                    >
                      <h1>Previous</h1>
                    </button>

                    <h1 className="font-semibold text-xl mx-2">
                      {" "}
                      {currPage}/{totalPage}
                    </h1>
                    <button
                      className="p-2 m-2 border-1 rounded-lg w-24 hover:bg-gray-700"
                      onClick={() => goToPage(currPage + 1)}
                      disabled={currPage === totalPage}
                    >
                      <h1>Next</h1>
                    </button>

                    <button
                      className="p-2 m-2 border-1 rounded-lg w-24 hover:bg-gray-700"
                      onClick={() => goToPage(totalPage)}
                    >
                      <h1>Last</h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
