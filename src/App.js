import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getData, updateDBData} from "./services/dbServices";

import Spinner from "react-bootstrap/Spinner";
import TopicCard from "./components/TopicCard/TopicCard";
import Topic from "./components/Topic/Topic";
import Footer from "./components/Footer/Footer";
import ReactGA from "react-ga";
import "./App.css";



function App() {
	// setting state for data received from the DB
	const [questionData, setquestionData] = useState([]);
	// useEffect for fetching data from DB on load and init GA
	useEffect(() => {
		localStorage.removeItem("cid");
		ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
		ReactGA.pageview(window.location.pathname + window.location.search);
		getData((QuestionData) => {
			setquestionData(QuestionData);
		});
	}, []);

	//to update progress in '/' route and also update DB
	function updateData(key, topicData, topicPosition) {
		let reGenerateUpdatedData = questionData.map((topic, index) => {
			if (index === topicPosition) {
				updateDBData(key, topicData);
				return { topicName: topic.topicName, position: topic.position, ...topicData };
			} else {
				return topic;
			}
		});
		setquestionData(reGenerateUpdatedData);
	}
	return (
		<Router>
			<div className="App">
				<h1 className="app-heading text-center mt-5">
				DSA Sheet by FRAZ
				</h1>

				{questionData.length === 0 ? (
					// load spinner until data is fetched from DB
					<div className="d-flex justify-content-center">
						<Spinner animation="grow" variant="success" />
					</div>
				) : (
					<>
							<Route exact path="/" children={<TopicCard questionData={questionData}></TopicCard>} />
							{/* TOPIC ROUTE */}
							<Route path="/array" children={<Topic data={questionData[0]} updateData={updateData} />} />
							<Route path="/string" children={<Topic data={questionData[1]} updateData={updateData} />} />
							<Route path="/binary_search" children={<Topic data={questionData[2]} updateData={updateData} />} />
							<Route path="/sliding_window" children={<Topic data={questionData[3]} updateData={updateData} />} />
							<Route path="/two_pointer" children={<Topic data={questionData[4]} updateData={updateData} />} />
							<Route path="/linked_list" children={<Topic data={questionData[5]} updateData={updateData} />} />
							<Route path="/trees" children={<Topic data={questionData[6]} updateData={updateData} />} />
							<Route path="/greedy" children={<Topic data={questionData[7]} updateData={updateData} />} />
							<Route path="/backtracking" children={<Topic data={questionData[8]} updateData={updateData} />} />
							<Route path="/stack" children={<Topic data={questionData[9]} updateData={updateData} />} />
							<Route path="/heap" children={<Topic data={questionData[10]} updateData={updateData} />} />
							<Route path="/graph" children={<Topic data={questionData[11]} updateData={updateData} />} />
							<Route path="/dynamic_programming" children={<Topic data={questionData[12]} updateData={updateData} />} />
							<Route path="/dfs" children={<Topic data={questionData[13]} updateData={updateData} />} />
							<Route path="/bfs" children={<Topic data={questionData[14]} updateData={updateData} />} />
							<Route path="/design" children={<Topic data={questionData[15]} updateData={updateData} />} />
							<Route path="/maths" children={<Topic data={questionData[16]} updateData={updateData} />} />
							<Route path="/hashtable" children={<Topic data={questionData[17]} updateData={updateData} />} />
							<Route path="/miscellaneous" children={<Topic data={questionData[18]} updateData={updateData} />} />
						
					</>
				)}
				<Footer></Footer>
			</div>
		</Router>
	);
}

export default App;
