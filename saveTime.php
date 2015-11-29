<?php
	
	if(isSet($_REQUEST["levelName"]) && isSet($_REQUEST["playerName"]) && isSet($_REQUEST["time"])){
		$levelName = $_REQUEST["levelName"];
		$playerName = $_REQUEST["playerName"];
		$time = $_REQUEST["time"];
		
		require_once("sqlconf.php");
		require_once("db_connection_start.php");
		
		// Get level id from database
		$query = $connection->prepare("SELECT id FROM levels WHERE name=?");
		$query->bind_param("s", $levelName);
		$query->bind_result($id);
		$query->execute();
		$query->fetch();
		$query->close();
		
		if(!empty($id)){
			echo $time;
			// If level exists, save new time to database
			$query = $connection->prepare("INSERT INTO leaderboard(level_id, name, time) 
											VALUES(?, ?, ?)");
			$query->bind_param("iss", $id, $playerName, $time);
			$query->execute();
			$query->close();
		}
		
		require_once("db_connection_close.php");
	}
	
?>