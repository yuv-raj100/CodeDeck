
import { RedirectToSignIn, SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Header from "./Components/Header";
import MainPage from "./Components/MainPage";
import QuestionPage from "./Components/QuestionsPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<MainPage />} />
      <Route path="/dashboard" element={<>
        <SignedIn>
          <QuestionPage/>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn/>
        </SignedOut>
      </>}
      />
    </>
  )
);

function App() {

  // const navigate = useNavigate();

  
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App
