import React from "react";
import {TodoList} from "./todolist";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";



//create your first component
const Home = () => {
	return (
		<div className="flex flex-col gap-8 xl:flex-row">
			<h1 className={'text-primary mt-20 mb-8'}> Todo List with Fetch </h1>
			<TodoList />
		</div>
	);
};

export default Home;
