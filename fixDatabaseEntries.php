<?php

	require_once("sqlconf.php");
	require_once("db_connection_start.php");
	
	// Get all entries from leaderboard, htmlspecialchars() and update all the entries
	$query = $connection->prepare("SELECT id, name FROM leaderboard");
	$query->bind_result($id, $name);
	$query->execute();
	$rows = array();
	while($query->fetch()){
		$row = new StdClass();
		$row->id = $id;
		$row->name = htmlspecialchars($name);
		array_push($rows, $row);
	}
	$query->close();
	
	foreach($rows as $row){
		$query = $connection->prepare("UPDATE leaderboard SET name=? WHERE id=?");
		$query->bind_param("si", $row->name, $row->id);
		$query->execute();
		$query->close();
	}
	
	require_once("db_connection_close.php");

?>