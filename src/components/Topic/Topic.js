import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./Topic.css";

export default function Topic({ data, updateData }) {
	/*
	  This component takes data releted to a paticular topic 
	  and updateData() from App component
	*/
	/*
	  Setting state for fields that comes from `data` prop 
	  so that `data` prop is not undefined on reload
	*/
	const [select, setSelected] = useState([]);
	const [questionsTableData, setQuestionsTableData] = useState([]);
	const [topicName, setTopicName] = useState("");


	// updating states using useEffect with dependency  on `data` prop
	useEffect(() => {
		if (data !== undefined) {
			let doneQuestion = [];

			let tableData = data.questions.map((question, index) => {
				if (question.Done) {
					doneQuestion.push(index);
				}
				/*
				|	Hidden properties `_is_selected` and `_search_text` are used to sort the table
				|	and search the table respectively. react-bootstrap-table does not allow sorting
				|	by selectRow by default, and requires plain text to perform searches.
				*/
				return {
					id: index,
					question: (
						<>
							{/* Question link */}
							<a
								href={question.URL}
								target="_blank"
								rel="noopener noreferrer"
								style={{ fontWeight: "600",fontSize: "20px" ,color:"black"}}
								className="question-link"
							>
								{question.Problem}
							</a>
							
						</>
					),

					_is_selected: question.Done,
					_search_text: question.Problem,
				};
			});
			setQuestionsTableData(tableData);
			setTopicName(data.topicName);
			setSelected(doneQuestion);
		}
	}, [data]);
	// seacrh bar config
	const Status = (props) => {
		return (
			<div className="topic-input-container">
				<div className="container">
							<Badge
								variant="success"
								style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", background: "rgb(200, 230, 201)" }}
							>
								<p className="completed-questions" style={{ color: "black", padding: "8px" }}>
									<span style={{ fontWeight: "bold" }}>
										{data.doneQuestions}/{data.questions.length}
									</span>{" "}
									Done{" "}
									<span className="emojiFix" role="img" aria-label="checker">
										&#9989;
									</span>
								</p>
							</Badge>
						
					
				</div>
			</div>
		);
	};
	// table config
	const columns = [
		{
			dataField: "id",
			text: "Q-Id",
			headerStyle: { width: "80px", fontSize: "20px", textAlign: "center" },
			style: { fontSize: "20px", cursor: "pointer", textAlign: "center" },
			events: {
				onClick: (row) => {
					handleSelect(row, !row._is_selected);
				},
			},
		},
		{
			dataField: "question",
			text: "Questions",
			headerStyle: { fontSize: "20px", textAlign: "center" },
		},
		{
			dataField: "_is_selected",
			text: "Is Selected",
			headerStyle: { fontSize: "20px" },
			hidden: true,
			sort: true,
		},
		{
			dataField: "_search_text",
			text: "Search Text",
			headerStyle: { fontSize: "20px" },
			hidden: true,
		},
	];
	const rowStyle = { fontSize: "20px" };
	const selectRow = {
		mode: "checkbox",
		style: { background: "#c8e6c9", fontSize: "24px" },
		selected: select,
		onSelect: handleSelect,
		hideSelectAll: true,
	};
	const sortMode = {
		dataField: "_is_selected",
		order: "asc",
	};

	// func() triggered when a question is marked done
	function handleSelect(row, isSelect) {
		let key = topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
		let newDoneQuestion = [...select];
		let updatedQuestionsStatus = data.questions.map((question, index) => {
			if (row.id === index) {
				question.Done = isSelect;
				if (isSelect) {
					newDoneQuestion.push(row.id);
				} else {
					var pos = newDoneQuestion.indexOf(row.id);
					newDoneQuestion.splice(pos, 1);
				}
				return question;
			} else {
				return question;
			}
		});
		updateData(
			key,
			{
				started: newDoneQuestion.length > 0 ? true : false,
				doneQuestions: newDoneQuestion.length,
				questions: updatedQuestionsStatus,
			},
			data.position
		);
		displayToast(isSelect, row.id);
	}

	// trigger an information message for user on select change
	function displayToast(isSelect) {
		const { type, icon } = {
			type: isSelect ? "Done" : "Incomplete",
			icon: isSelect ? "🎉" : "🙇🏻‍♂️"
		};

		const title = `${isSelect ? select.length + 1 : select.length - 1}/${data.questions.length} Done`;
		const Card = (
			<>
				<p>
					{title} <span className="emojiFix">{icon}</span>
				</p>
			</>
		);

		toast(Card, {
			className: `toast-${type}`,
			autoClose: 2000,
			closeButton: true,
		});
	}
	return (
		<>
			<h3 className="text-center mb-4">
				<Link to="/">Topics</Link>/{topicName}
			</h3>

			{data === undefined ? (
				<div className="d-flex justify-content-center">
					<Spinner animation="grow" variant="success" />
				</div>
			) : (
				<ToolkitProvider
					className="float-right"
					keyField="id"
					data={questionsTableData}
					columns={columns}
					rowStyle={rowStyle}
					search
				>
					{(props) => (
						<div>
							<div className="header-rand">{Status({ ...props.searchProps })}</div>
							<div className="container container-custom" style={{ overflowAnchor: "none" }}>
								<Fade duration={600}>
									<BootstrapTable {...props.baseProps} selectRow={selectRow} sort={sortMode} />
								</Fade>
							</div>
						</div>
					)}
				</ToolkitProvider>
			)}
			<ToastContainer />
			
		</>
	);
}

