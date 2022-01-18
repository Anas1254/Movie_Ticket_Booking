import { Route, Routes } from "react-router-dom";
import { PrivateRouter } from "./components/PrivateRouter";
import GridCard from "./components/stylingComponents/GridCard.js";
import ButtonAppBar from "./components/stylingComponents/ButtonAppBar";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import BookShow from "./components/BookShow/BookShow";
import MovieData from "./pages/MovieData";
import OngoingMovieData from "./pages/OngoingMovieData";
import EditPageMovieForm from "./pages/EditPageMovieForm";
import AddMovieForm from "./pages/AddMovieForm";
import EditPageOngoingMovie from "./pages/EditPageOngoingMovie";
import BookshowForm from "./pages/BookshowForm";
import { MyBookings } from "./pages/MyBookings";
import { AddOnGoingForm } from "./pages/AddOnGoingForm";
import "./App.css";

function App() {
	return (
		<div style={{ width: "100%" }}>
			<ButtonAppBar />

			<Routes>
				<Route exact path="/" element={<GridCard />} />
				<Route exact path="/search/:keyword" element={<GridCard />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<SignUp />} />
				<Route exact path="/bookshow/:id" element={<BookShow />} />

				{/* Below are all protected routes */}
				<Route exact path="/user/bookshow/:id" element={<PrivateRouter />}>
					<Route exact path="/user/bookshow/:id" element={<BookshowForm />} />
				</Route>

				<Route exact path="/user/my-bookings" element={<PrivateRouter />}>
					<Route exact path="/user/my-bookings" element={<MyBookings />} />
				</Route>

				<Route exact path="/admin/addMovieForm" element={<PrivateRouter />}>
					<Route exact path="/admin/addMovieForm" element={<AddMovieForm />} />
				</Route>

				<Route exact path="/admin/addOngoingMovie" element={<PrivateRouter />}>
					<Route
						exact
						path="/admin/addOngoingMovie"
						element={<AddOnGoingForm />}
					/>
				</Route>

				<Route exact path="/admin/moviedata" element={<PrivateRouter />}>
					<Route exact path="/admin/moviedata" element={<MovieData />} />
				</Route>

				<Route exact path="/admin/ongoingmoviedata" element={<PrivateRouter />}>
					<Route
						exact
						path="/admin/ongoingmoviedata"
						element={<OngoingMovieData />}
					/>
				</Route>

				<Route
					exact
					path="/admin/editOngoingMovie/:id"
					element={<PrivateRouter />}
				>
					<Route
						exact
						path="/admin/editOngoingMovie/:id"
						element={<EditPageOngoingMovie />}
					/>
				</Route>

				<Route exact path="/admin/editMovie/:id" element={<PrivateRouter />}>
					<Route
						exact
						path="/admin/editMovie/:id"
						element={<EditPageMovieForm />}
					/>
				</Route>
			</Routes>
		</div>
	);
}
export default App;
