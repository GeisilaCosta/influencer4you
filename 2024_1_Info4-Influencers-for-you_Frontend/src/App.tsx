import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewCampaign from "./pages/NewCampaign";
import NewCompany from "./pages/NewCompany";
import NewInfluencer from "./pages/NewInfluencer";
import { ThemeProvider } from "./context/ThemeContext";
import VLibras from "vlibras-nextjs";
import Feed from "./pages/Feed";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import FontSizeControl from "./components/FontSizeControl";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import PostInfluencer from "./pages/PostInfluencer";

function App() {
  return (
    <ThemeProvider>
      <VLibras forceOnload />
      <BrowserRouter>
        <NavBar />
        <FontSizeControl />
        {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campanha" element={<NewCampaign />} />
          <Route path="/sign-up-company" element={<NewCompany />} />
          <Route path="/sign-up-influencer" element={<NewInfluencer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admmaster" element={<AdminDashboard />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/influencer" element={<InfluencerDashboard />} />
          <Route path="/feed-company" element={<CompanyDashboard />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/post" element={<PostInfluencer />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        {/* </Layout> */}
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
