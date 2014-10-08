/**   \author Adrien ORTOLA */
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

/**
 * \class UsersLastKnownLocations
 * \brief  extends CustomizedHandler
 *	The purpose of this class is to get and return a collection of all the last known locations of the users (even disconnected ones).
 * */
public class UsersLastKnownLocations extends CustomizedHandler {

	/** 
	 * \param HttpExchange t
	 * \return void
	 * \brief gets and returns a collection of all the last known locations of the users (even disconnected ones)
	 * */
	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = JSONBuilder.buildJSONBasicMsg("lastKnownLocations", prepareListOfCoordinates(SetOfUsers.listOfCoordinates()));
	      t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
	
	/** 
	 * \param LinkedList<Point> list
	 * \return JSONArray
	 * \brief Prepare a list of coordinates by inserting them into a JSONArray
	 * */
	private JSONArray prepareListOfCoordinates(LinkedList<Point> list){
		JSONArray listOfCoordinates=new JSONArray();
		while(!list.isEmpty()){
			Point p=list.pop();
			JSONObject jo = new JSONObject();
			jo.put("lt",p.getLatitude());
			jo.put("lg",p.getLongitude());
			listOfCoordinates.add(jo);
		}
		return listOfCoordinates;
	}
}
