import React from "react";
import {TodoList} from "./todolist";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div>
			<h1>React Router</h1>
			<h1 className={'text-primary'}> Todo List with Fetch </h1>
			<TodoList />
		</div>
	);
};

export default Home;
