<?php
	// If level exists, returns a JSON representation of level data as follows:
	/*
		{
			"frame": {
				"image": "img/levels/1/frame.png",
				"width": 231,
				"height": 231
			},
			"pieces": [
				{
					"image": "img/levels/1/1.png",
					"width": 200,
					"height": 200,
					"correct_x": 38,
					"correct_y": -22
				},
				{
					... all the parts ...
				}
			]
		}
	*/
	if(isSet($_REQUEST["level"])){
		$level = $_REQUEST["level"];		
		require_once("sqlconf.php");
		require_once("db_connection_start.php");
		
		// Get level directory from the database
		$directory = null;
		$query = $connection->prepare("SELECT directory FROM levels WHERE name=?");
		$query->bind_param("s", $level);
		$query->bind_result($directory);
		$query->execute();
		$query->fetch();
		$query->close();
		
		// If the level name was correct and directory name was fetched
		if($directory != null){
			$response = new StdClass();
			$level_resources_path = "img/levels/" . $directory;
		
			// Every level must have frame.png
			$frame = new StdClass();
			$frame->image = $level_resources_path . "/frame.png";
			$frame_info = getimagesize($level_resources_path . "/frame.png");
			$frame->width = $frame_info[0];
			$frame->height = $frame_info[1];
			$response->frame = $frame;
			
			// Get all the correct coordinates from the database
			$query = $connection->prepare("SELECT file_name, x_coord, y_coord FROM parts
											INNER JOIN levels ON
											parts.level_id=levels.id
											WHERE levels.name=?");
			$query->bind_param("s", $level);
			$query->bind_result($file_name, $x_coord, $y_coord);
			$query->execute();
			$coordinates = array();
			while($query->fetch()){
				$coordinates[$file_name] = array($x_coord, $y_coord);
			}
			$query->close();
			
			// Info for all the graphical pieces
			$pieces = array();
			foreach(scandir($level_resources_path) as $piece){
				if(strpos($piece, ".png") != false && $piece != "frame.png" && $piece != "thumb.png"){
					$piece_info = new StdClass();
					$piece_info->image = $level_resources_path . "/" . $piece;
					$dimensions = getimagesize($level_resources_path . "/" . $piece);
					$piece_info->width = $dimensions[0];
					$piece_info->height = $dimensions[1];
					$piece_info->correct_x = $coordinates[$piece][0];
					$piece_info->correct_y = $coordinates[$piece][1];
					array_push($pieces, $piece_info);
				}
			}
			$response->pieces = $pieces;	
			echo json_encode($response);	
		}
		require_once("db_connection_close.php");
	}
?>