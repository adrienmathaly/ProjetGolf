package http.handlers.supervision;

import http.handlers.CustomizedHandler;
import http.users.Point;
import http.users.SetOfUsers;

import java.io.OutputStream;
import java.util.LinkedList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import json.JSONBuilder;

import com.sun.net.httpserver.HttpExchange;

public class UsersLastKnownLocations extends CustomizedHandler {

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = JSONBuilder.buildJSONBasicMsg("lastKnownLocations", prepareListOfCoordinates(SetOfUsers.listOfCoordinates()));
	      t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
	
	
	private JSONArray prepareListOfCoordinates(LinkedList<Point> list){
		JSONArray listOfCoordinates=new JSONArray();

		for(int i=0; i<list.size();i++){
			Point p=list.pop();
			JSONObject jo = new JSONObject();
			jo.put("lt",p.getLatitude());
			jo.put("lg",p.getLongitude());
			listOfCoordinates.add(jo);
		}

		return listOfCoordinates;
	}
}
