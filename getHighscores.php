<?php
	if(isSet($_REQUEST["level"])){
		$level = $_REQUEST["level"];
		require_once("sqlconf.php");
		require_once("db_connection_start.php");
		// Get top 10 from database and show it
		$query = $connection->prepare("SELECT leaderboard.name, leaderboard.time FROM leaderboard 
										INNER JOIN levels ON
										levels.id = leaderboard.level_id
										WHERE levels.name = ?
										ORDER BY leaderboard.time ASC LIMIT 10");
		$query->bind_param("s", $level);
		$query->bind_result($name, $time);
		$query->execute();
		$results = array();
		while($query->fetch()){
			$row = new StdClass();
			$row->name = $name;
			$row->time = $time;
			array_push($results, $row);
		}
		$query->close();
		echo json_encode($results);
		
		require_once("db_connection_close.php");
	}
?>