import "./App.css";
import GridCard from "./components/stylingComponents/GridCard.js";
import ButtonAppBar from "./components/stylingComponents/ButtonAppBar";
import Login from "./components/Authenticatio/Login";
import SignUp from "./components/Authenticatio/SignUp";
import { Route, Routes } from "react-router-dom";
import BookShow from "./components/BookShow/BookShow";
import MovieData from "./pages/MovieData";
import OngoingMovieData from "./pages/OngoingMovieData";
import EditPageMovieForm from "./pages/EditPageMovieForm";
import EditPageOngoingMovie from "./pages/EditPageOngoingMovie";
import BookshowForm from "./pages/BookshowForm";

function App() {
  return (
    <div style={{ width: "100%" }}>
      <ButtonAppBar />
      <Routes>
        <Route exact path="/" element={<GridCard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/bookshow/:id" element={<BookShow />} />
        <Route exact path="/admin/moviedata" element={<MovieData />} />
        <Route
          exact
          path="/admin/ongoingmoviedata"
          element={<OngoingMovieData />}
        />
        <Route exact path="/admin/editMovie" element={<EditPageMovieForm />} />
        <Route
          exact
          path="/admin/editOngoingMovie"
          element={<EditPageOngoingMovie />}
        />
        <Route exact path="/user/bookshow/:id" element={<BookshowForm />} />
      </Routes>
    </div>
  );
}
export default App;
